<template>
  <div class="comment-container">
    <!-- Header -->
    <div class="comment-header">
      <div class="header-content">
        <h3 class="title">Bình luận</h3>
        <span class="badge">{{ pagination.total }}</span>
      </div>
    </div>

    <!-- New Comment Form -->
    <div class="new-comment-form">
      <div class="avatar-wrapper">
        <div class="avatar">
          <img
            v-if="currentUser?.avatar || currentUser?.b64"
            :src="
              currentUser.avatar || `data:image/png;base64,${currentUser.b64}`
            "
            alt="Your avatar"
          />
          <div v-else class="avatar-placeholder">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="input-wrapper">
        <textarea
          v-model="newComment"
          rows="1"
          class="comment-input"
          placeholder="Viết bình luận..."
        />
        <button
          @click="handleAddComment"
          class="submit-btn"
          :disabled="!newComment.trim()"
        >
          <SendHorizontal class="icon" />
        </button>
      </div>
    </div>

    <!-- Comments List -->
    <div class="comments-section">
      <!-- Empty State -->
      <div v-if="!comments.length" class="empty-state">
        <div class="empty-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
            />
          </svg>
        </div>
        <p class="empty-text">Chưa có bình luận nào</p>
      </div>

      <!-- Comments -->
      <div v-else class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <!-- Comment Header -->
          <div class="comment-meta">
            <div class="user-info">
              <div class="avatar small">
                <img
                  v-if="comment.userDTO?.avatar || comment.userDTO?.b64"
                  :src="
                    comment.userDTO.avatar ||
                    `data:image/png;base64,${comment.userDTO.b64}`
                  "
                  alt="User avatar"
                />
                <div v-else class="avatar-placeholder">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                </div>
              </div>
              <div class="user-details">
                <span class="username">{{ comment.userDTO.fullName }}</span>
                <span class="timestamp">{{
                  formatDate(comment.lastUpdate)
                }}</span>
              </div>
            </div>

            <!-- Actions Menu -->
            <a-dropdown
              v-if="
                currentUser &&
                comment.userDTO &&
                currentUser.id === comment.userDTO.id
              "
              trigger="click"
              placement="bottomRight"
            >
              <template #overlay>
                <a-menu class="actions-menu">
                  <a-menu-item @click="startEditing(comment)">
                    <span>Chỉnh sửa</span>
                  </a-menu-item>
                  <a-menu-item
                    @click="confirmDelete(comment.id)"
                    class="delete-action"
                  >
                    <span>Xóa</span>
                  </a-menu-item>
                </a-menu>
              </template>
              <button class="menu-trigger">
                <MoreHorizontalIcon class="icon" />
              </button>
            </a-dropdown>
          </div>

          <!-- Comment Content -->
          <div class="comment-content">
            <!-- Edit Mode -->
            <div
              v-if="editingComment && editingComment.id === comment.id"
              class="edit-mode"
            >
              <div class="edit-wrapper">
                <textarea
                  v-model="editingComment.content"
                  rows="2"
                  class="edit-input"
                />
                <div class="edit-actions">
                  <button @click="cancelEditing" class="cancel-btn">
                    <CircleX class="icon" />
                  </button>
                  <button @click="submitEditing(comment.id)" class="save-btn">
                    <SendHorizontal class="icon" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Display Mode -->
            <div v-else class="content-text">
              {{ comment.content }}
            </div>
          </div>

          <!-- Comment Actions -->
          <div class="comment-actions">
            <button
              @click="handleLike(comment)"
              class="like-button"
              :class="{ active: comment.liked }"
            >
              <ThumbsUpIcon class="icon" />
              <span class="count">{{ comment.rate || 0 }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="comments.length > 0" class="pagination-section">
        <a-pagination
          simple
          :current="pagination.current"
          :pageSize="pagination.pageSize"
          :total="pagination.total"
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { message, Modal } from "ant-design-vue";
import {
  ThumbsUpIcon,
  MoreHorizontalIcon,
  SendHorizontal,
  CircleX,
} from "lucide-vue-next";
import {
  getListComment,
  createComment,
  updateComment,
  deleteComment,
} from "@/apis/commentService.js";
import { getProfile } from "@/apis/authService.js";
import { useAuthStore } from "@/stores/store";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

// Props từ component cha
const props = defineProps({
  postId: { type: Number, required: true },
});

// Các biến reactive
const comments = ref([]);
const newComment = ref("");
const editingComment = ref(null);
const currentUser = ref(null);
const likedComments = ref([]);

// Cấu hình phân trang
const pagination = ref({ current: 1, pageSize: 5, total: 0 });

// Cấu hình dayjs để hiển thị thời gian tương đối
dayjs.extend(relativeTime);
dayjs.locale("vi");

// Lấy thông tin người dùng hiện tại
async function fetchProfile() {
  try {
    currentUser.value = (await getProfile()).data;
  } catch (error) {
    console.error("Lỗi khi tải profile:", error);
  }
}

// Lấy danh sách bình luận với phân trang
async function fetchComments() {
  const params = {
    postId: props.postId,
    start: pagination.value.current - 1,
    limit: pagination.value.pageSize,
  };

  try {
    const { data } = await getListComment(params);
    // Lọc bình luận theo bài viết
    const filtered = data.items || [];

    // Gán trạng thái đã like
    comments.value = filtered.map((c) => ({
      ...c,
      liked: likedComments.value.includes(c.id),
    }));

    pagination.value.total = data.total ?? filtered.length;
  } catch (error) {
    message.error("Lỗi tải bình luận");
    console.error("Lỗi fetchComments:", error);
  }
}

// Xử lý chuyển trang
function handlePageChange(page) {
  pagination.value.current = page;
  fetchComments();
}

// Thêm bình luận mới
async function handleAddComment() {
  const authStore = useAuthStore();

  // Kiểm tra đăng nhập
  if (!authStore.isAuthenticated || !authStore.token?.trim()) {
    return message.warning("Bạn cần đăng nhập để bình luận.");
  }

  // Kiểm tra nội dung
  if (!newComment.value.trim()) {
    return message.warning("Vui lòng nhập nội dung bình luận.");
  }

  try {
    await createComment(
      { content: newComment.value, idPost: props.postId, rate: 0 },
      authStore.token
    );
    message.success("Bình luận đã được đăng");
    newComment.value = "";
    fetchComments();
  } catch (error) {
    message.error(
      `Lỗi khi đăng bình luận${
        error?.response?.data?.message ? ": " + error.response.data.message : ""
      }`
    );
  }
}

// Các hàm xử lý chỉnh sửa bình luận
function startEditing(comment) {
  editingComment.value = { ...comment };
}

function cancelEditing() {
  editingComment.value = null;
}

// Cập nhật bình luận
async function submitEditing(id) {
  if (!editingComment.value.content.trim()) {
    return message.warning("Nội dung bình luận không được để trống");
  }
  try {
    await updateComment(
      {
        id,
        content: editingComment.value.content,
        rate: editingComment.value.rate ?? 0,
      },
      localStorage.getItem("token")
    );
    message.success("Cập nhật bình luận thành công");
    editingComment.value = null;
    fetchComments();
  } catch {
    message.error("Lỗi khi cập nhật bình luận");
  }
}

// Xóa bình luận
async function handleDeleteComment(id) {
  try {
    await deleteComment(id);
    message.success("Xóa bình luận thành công");
    likedComments.value = likedComments.value.filter((cid) => cid !== id);
    fetchComments();
  } catch {
    message.error("Lỗi khi xóa bình luận");
  }
}

// Hiển thị xác nhận xóa
function confirmDelete(id) {
  Modal.confirm({
    title: "Xác nhận xóa bình luận?",
    content: "Bạn có chắc muốn xóa bình luận này không?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk: () => handleDeleteComment(id),
  });
}

// Xử lý thích/bỏ thích bình luận
async function handleLike(comment) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated || !authStore.token?.trim()) {
    return message.warning("Bạn cần đăng nhập để thích bình luận.");
  }

  try {
    const newRate = comment.liked ? comment.rate - 1 : comment.rate + 1;

    // Cập nhật trạng thái like trong danh sách
    comment.liked
      ? (likedComments.value = likedComments.value.filter(
          (id) => id !== comment.id
        ))
      : likedComments.value.push(comment.id);
    comment.liked = !comment.liked;

    // Cập nhật API
    await updateComment(
      { id: comment.id, content: comment.content, rate: newRate },
      authStore.token
    );

    comment.liked
      ? message.success("Đã like bình luận")
      : message.error("Bỏ like bình luận");

    comment.rate = newRate;
  } catch {
    message.error("Lỗi khi xử lý like bình luận");
  }
}

// Định dạng thời gian tương đối
function formatDate(dateStr) {
  return dateStr ? dayjs(dateStr).fromNow() : "";
}

// Khởi tạo component
onMounted(async () => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated && authStore.token?.trim() !== "") {
    await fetchProfile();
  }
  fetchComments();
});

// Theo dõi thay đổi postId để reset phân trang
watch(
  () => props.postId,
  () => {
    pagination.value.current = 1;
    fetchComments();
  }
);
</script>

<style scoped>
/* Container */
.comment-container {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-top: 24px;
  overflow: hidden;
}

/* Header */
.comment-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  background: #fafafa;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.badge {
  background: #e2e8f0;
  color: #64748b;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

/* New Comment Form */
.new-comment-form {
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  background: #fafafa;
  border-bottom: 1px solid #f1f5f9;
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
}

.avatar.small {
  width: 32px;
  height: 32px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  background: #f8fafc;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.comment-input {
  width: 100%;
  min-height: 44px;
  padding: 12px 50px 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.comment-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.comment-input::placeholder {
  color: #9ca3af;
}

.submit-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background: #f8fafc;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #3b82f6;
  color: #ffffff;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Comments Section */
.comments-section {
  padding: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 24px;
  color: #94a3b8;
}

.empty-icon {
  margin: 0 auto 16px;
  opacity: 0.5;
}

.empty-text {
  margin: 0;
  font-size: 15px;
  color: #64748b;
}

/* Comments List */
.comments-list {
  padding: 0;
}

.comment-item {
  padding: 20px 24px;
  border-bottom: 1px solid #f8fafc;
}

.comment-item:last-child {
  border-bottom: none;
}

/* Comment Meta */
.comment-meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.timestamp {
  font-size: 12px;
  color: #64748b;
}

.menu-trigger {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: #f8fafc;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.menu-trigger:hover {
  background: #f1f5f9;
  color: #64748b;
}

/* Comment Content */
.comment-content {
  margin: 8px 0 16px 44px;
}

.content-text {
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
  word-wrap: break-word;
}

/* Edit Mode */
.edit-mode {
  position: relative;
}

.edit-wrapper {
  position: relative;
}

.edit-input {
  width: 100%;
  min-height: 80px;
  padding: 12px 80px 12px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s;
}

.edit-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.edit-actions {
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: flex;
  gap: 4px;
}

.cancel-btn,
.save-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.cancel-btn {
  background: #fef2f2;
  color: #ef4444;
}

.cancel-btn:hover {
  background: #fee2e2;
}

.save-btn {
  background: #eff6ff;
  color: #3b82f6;
}

.save-btn:hover {
  background: #dbeafe;
}

/* Comment Actions */
.comment-actions {
  margin-left: 44px;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  background: #f8fafc;
  color: #64748b;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.like-button:hover {
  background: #f1f5f9;
  color: #374151;
}

.like-button.active {
  background: #eff6ff;
  color: #3b82f6;
}

.count {
  font-weight: 500;
  min-width: 16px;
  text-align: center;
}

/* Pagination */
.pagination-section {
  padding: 20px 24px;
  border-top: 1px solid #f8fafc;
  display: flex;
  justify-content: center;
  background: #fafafa;
}

/* Icons */
.icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Custom Dropdown Styles */
:deep(.actions-menu) {
  min-width: 120px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

:deep(.actions-menu .ant-dropdown-menu-item) {
  padding: 10px 16px;
  font-size: 14px;
  transition: all 0.2s;
}

:deep(.actions-menu .delete-action) {
  color: #ef4444;
}

:deep(.actions-menu .delete-action:hover) {
  background: #fef2f2;
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .comment-container {
    border-radius: 8px;
    margin-top: 16px;
  }

  .comment-header,
  .new-comment-form,
  .comment-item,
  .pagination-section {
    padding-left: 16px;
    padding-right: 16px;
  }

  .comment-content,
  .comment-actions {
    margin-left: 36px;
  }

  .avatar {
    width: 36px;
    height: 36px;
  }

  .avatar.small {
    width: 28px;
    height: 28px;
  }

  .title {
    font-size: 16px;
  }
}

/* Smooth Transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus States for Accessibility */
.submit-btn:focus,
.menu-trigger:focus,
.like-button:focus,
.cancel-btn:focus,
.save-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
