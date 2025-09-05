<template>
  <div class="sidebar-container">
    <!-- User Profile Section -->
    <div class="profile-section">
      <!-- Avatar Section -->
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="User Avatar"
            class="avatar-image"
          />
          <div v-else class="avatar-placeholder">
            <User class="placeholder-icon" />
          </div>

          <!-- Avatar Actions -->
          <button
            class="avatar-action change-btn"
            @click="onChangeAvatar"
            title="Chọn ảnh mới"
          >
            <RefreshCw class="action-icon" />
          </button>

          <button
            v-if="selectedFile"
            class="avatar-action save-btn"
            @click="onSaveAvatar"
            title="Lưu avatar"
          >
            <Save class="action-icon" />
          </button>

          <input
            ref="avatarInputRef"
            type="file"
            accept="image/*"
            class="hidden-input"
            @change="onFileSelected"
          />
        </div>
      </div>

      <!-- User Information -->
      <div class="user-info">
        <div class="user-details">
          <div class="detail-item">
            <span class="detail-label">Họ tên</span>
            <span class="detail-value">{{ fullName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email</span>
            <span class="detail-value">{{ userEmail }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Mã tài khoản</span>
            <span class="detail-value">#{{ userId }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="navigation-section">
      <nav class="nav-menu">
        <router-link
          to="/profile"
          class="nav-item"
          :class="{ active: $route.path === '/profile' }"
          exact
        >
          <User class="nav-icon" />
          <span class="nav-text">Thông tin tài khoản</span>
        </router-link>

        <router-link
          to="/create-post"
          class="nav-item"
          :class="{ active: $route.path === '/create-post' }"
        >
          <FolderPen class="nav-icon" />
          <span class="nav-text">Đăng tải tài liệu</span>
        </router-link>

        <router-link
          to="/my-posts"
          class="nav-item"
          :class="{ active: $route.path === '/my-posts' }"
        >
          <Folder class="nav-icon" />
          <span class="nav-text">Tài liệu của tôi</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/store";
import {
  RefreshCw,
  Save,
  User,
  Clock,
  CreditCard,
  Folder,
  FolderPen,
} from "lucide-vue-next";
import { message } from "ant-design-vue";
import { postAvatar, getProfile } from "@/apis/authService";

// Khởi tạo store để quản lý trạng thái xác thực
const authStore = useAuthStore();

// Biến lưu thông tin người dùng
const userEmail = ref("");
const balance = ref(0);
const userId = ref("");
const fullName = ref("");

// Lấy thông tin người dùng khi component được tạo
onMounted(async () => {
  try {
    const profileRes = await getProfile();
    fullName.value = profileRes.data.fullName;
    userEmail.value = profileRes.data.email;
    userId.value = profileRes.data.id;
    balance.value = profileRes.data.balance;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
});

// Định dạng số dư theo tiền tệ Việt Nam
const formattedBalance = computed(() => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(balance.value);
});

// Quản lý avatar
const previewAvatar = ref("");
const selectedFile = ref(null);
const avatarInputRef = ref(null);

// Lấy URL avatar để hiển thị
const avatarUrl = computed(() => {
  return selectedFile.value ? previewAvatar.value : authStore.avatar;
});

// Mở hộp thoại chọn file avatar
const onChangeAvatar = () => {
  avatarInputRef.value.click();
};

// Xử lý khi người dùng chọn file ảnh
const onFileSelected = (event) => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewAvatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Lưu avatar mới lên server
const onSaveAvatar = async () => {
  try {
    await postAvatar(null, selectedFile.value);
    message.success("Avatar cập nhật thành công!");
    authStore.setAvatar(previewAvatar.value);
    selectedFile.value = null;
    previewAvatar.value = "";
  } catch (error) {
    console.error("Error uploading avatar:", error);
    message.error("Cập nhật avatar thất bại!");
  }
};
</script>

<style scoped>
/* Sidebar Container */
.sidebar-container {
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

/* Profile Section */
.profile-section {
  padding: 32px 24px;
  border-bottom: 1px solid #f1f5f9;
  background: #fafafa;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e2e8f0;
  transition: border-color 0.2s ease;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f8fafc;
  border: 3px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  width: 32px;
  height: 32px;
  color: #94a3b8;
}

/* Avatar Actions */
.avatar-action {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.change-btn {
  bottom: 8px;
  right: -8px;
  background: #f1f5f9;
  color: #64748b;
}

.change-btn:hover {
  background: #e2e8f0;
  color: #374151;
}

.save-btn {
  bottom: 8px;
  right: 24px;
  background: #eff6ff;
  color: #3b82f6;
}

.save-btn:hover {
  background: #dbeafe;
  color: #2563eb;
}

.action-icon {
  width: 14px;
  height: 14px;
}

.hidden-input {
  display: none;
}

/* User Information */
.user-info {
  text-align: center;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
}

.detail-label {
  color: #64748b;
  font-weight: 500;
}

.detail-value {
  color: #374151;
  font-weight: 600;
}

/* Navigation Section */
.navigation-section {
  flex: 1;
  padding: 24px 0;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
}

/* Navigation Items */
.nav-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 10px;
  color: #64748b;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover {
  background: #f8fafc;
  color: #374151;
}

.nav-item.active {
  background: #eff6ff;
  color: #3b82f6;
  font-weight: 600;
}

.nav-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #3b82f6;
  border-radius: 0 2px 2px 0;
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .profile-section {
    padding: 24px 16px;
  }

  .navigation-section {
    padding: 16px 0;
  }

  .nav-menu {
    padding: 0 12px;
  }

  .nav-item {
    padding: 12px 14px;
    font-size: 14px;
  }

  .avatar-image,
  .avatar-placeholder {
    width: 64px;
    height: 64px;
  }

  .placeholder-icon {
    width: 24px;
    height: 24px;
  }

  .user-name {
    font-size: 16px;
  }

  .detail-item {
    padding: 6px 10px;
    font-size: 12px;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .profile-section {
    padding: 20px 12px;
  }

  .nav-menu {
    padding: 0 8px;
  }

  .nav-item {
    padding: 10px 12px;
  }

  .avatar-image,
  .avatar-placeholder {
    width: 56px;
    height: 56px;
  }

  .user-name {
    font-size: 15px;
  }
}

/* Focus States for Accessibility */
.nav-item:focus,
.avatar-action:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth Transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover Effects */
.avatar-wrapper:hover .avatar-image {
  border-color: #cbd5e1;
}
</style>
