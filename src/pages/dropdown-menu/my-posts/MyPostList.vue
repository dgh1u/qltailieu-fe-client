<template>
  <ProfileLayout>
    <div
      class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-10"
    >
      <!-- Header Section -->
      <div class="mb-8">
        <div class="text-center mb-6">
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Quản lý bài đăng của tôi
          </h1>
          <p class="text-gray-600 mt-2">
            Theo dõi và quản lý tất cả bài đăng của bạn
          </p>
        </div>

        <!-- Modern Filter Section -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Status Filter -->
            <div class="flex-1">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <span class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Trạng thái bài đăng
                </span>
              </label>
              <div class="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  @click="
                    (selectedStatus = 'APPROVED'), resetPage(), fetchPosts()
                  "
                  :class="
                    selectedStatus === 'APPROVED'
                      ? 'px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm shadow-lg transform scale-105 transition-all duration-200'
                      : 'px-4 py-3 rounded-lg text-gray-600 font-medium text-sm hover:bg-white hover:text-green-600 transition-all duration-200'
                  "
                >
                  <span class="flex items-center justify-center gap-2">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Đã duyệt
                  </span>
                </button>
                <button
                  @click="
                    (selectedStatus = 'BLOCKED'), resetPage(), fetchPosts()
                  "
                  :class="
                    selectedStatus === 'BLOCKED'
                      ? 'px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold text-sm shadow-lg transform scale-105 transition-all duration-200'
                      : 'px-4 py-3 rounded-lg text-gray-600 font-medium text-sm hover:bg-white hover:text-red-600 transition-all duration-200'
                  "
                >
                  <span class="flex items-center justify-center gap-2">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                      ></path>
                    </svg>
                    Đã khóa
                  </span>
                </button>
                <button
                  @click="
                    (selectedStatus = 'PENDING'), resetPage(), fetchPosts()
                  "
                  :class="
                    selectedStatus === 'PENDING'
                      ? 'px-4 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold text-sm shadow-lg transform scale-105 transition-all duration-200'
                      : 'px-4 py-3 rounded-lg text-gray-600 font-medium text-sm hover:bg-white hover:text-yellow-600 transition-all duration-200'
                  "
                >
                  <span class="flex items-center justify-center gap-2">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Chờ duyệt
                  </span>
                </button>
              </div>
            </div>

            <!-- Visibility Filter -->
            <div class="flex-1">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                <span class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  Trạng thái hiển thị
                </span>
              </label>
              <div class="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  @click="(selectedDel = false), resetPage(), fetchPosts()"
                  :class="
                    selectedDel === false
                      ? 'px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-sm shadow-lg transform scale-105 transition-all duration-200'
                      : 'px-4 py-3 rounded-lg text-gray-600 font-medium text-sm hover:bg-white hover:text-blue-600 transition-all duration-200'
                  "
                >
                  <span class="flex items-center justify-center gap-2">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    Hiển thị
                  </span>
                </button>
                <button
                  @click="(selectedDel = true), resetPage(), fetchPosts()"
                  :class="
                    selectedDel === true
                      ? 'px-4 py-3 rounded-lg bg-gradient-to-r from-gray-500 to-slate-500 text-white font-semibold text-sm shadow-lg transform scale-105 transition-all duration-200'
                      : 'px-4 py-3 rounded-lg text-gray-600 font-medium text-sm hover:bg-white hover:text-gray-600 transition-all duration-200'
                  "
                >
                  <span class="flex items-center justify-center gap-2">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      ></path>
                    </svg>
                    Bị ẩn
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts Grid Section -->
      <div v-if="posts.length" class="space-y-6">
        <!-- Stats Summary -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              
              <div>
                <p class="text-sm text-gray-500">Tổng số bài đăng</p>
                <p class="text-xl font-bold text-gray-900">
                  {{ pagination.total }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">
                Trang {{ pagination.current }} /
                {{ Math.ceil(pagination.total / pagination.pageSize) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Posts Grid -->
        <div class="grid gap-6">
          <router-link
            v-for="(post, index) in posts"
            :key="post.id"
            :to="{
              name:
                selectedMotelType === 'O_GHEP'
                  ? 'RoommateFindDetail'
                  : selectedMotelType === 'QUAN_AN'
                  ? 'RestaurantDetail'
                  : selectedMotelType === 'QUAN_NUOC'
                  ? 'BeverageDetail'
                  : selectedMotelType === 'CUA_HANG'
                  ? 'StoreDetail'
                  : selectedMotelType === 'TIEN_ICH'
                  ? 'UtilityDetail'
                  : selectedMotelType === 'TAI_LIEU'
                  ? 'DocumentDetail'
                  : 'DocumentDetail',
              params: { id: post.id },
            }"
            class="group block transform transition-all duration-300 hover:scale-[1.02]"
            :style="{ animationDelay: index * 100 + 'ms' }"
          >
            <div
              class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
            >
              <DocumentCard
                v-if="['TAI_LIEU'].includes(selectedMotelType)"
                :post="post"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
                data-aos-duration="600"
              />
            </div>
          </router-link>
        </div>

        <!-- Modern Pagination -->
        <div class="flex justify-center mt-12">
          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4"
          >
            <a-pagination
              :current="pagination.current"
              :pageSize="pagination.pageSize"
              :total="pagination.total"
              show-quick-jumper
              @change="handlePageChange"
              :show-size-changer="false"
              class="custom-pagination"
            />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto"
        >
          <div
            class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">
            Chưa có bài đăng nào
          </h3>
          <p class="text-gray-500 mb-6">
            Bạn chưa có bài đăng nào với bộ lọc đã chọn
          </p>
          <button
            class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            Tạo bài đăng mới
          </button>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProfileLayout from "../../../layouts/ProfileLayout.vue";

import { getProfile } from "@/apis/authService";
import { getPostsByUserId } from "@/apis/postService";
import { Empty } from "ant-design-vue";
import DocumentCard from "../../../components/card/DocumentCard.vue";

// State cho bài đăng và bộ lọc
const posts = ref([]);
const userId = ref(null);
const selectedStatus = ref("APPROVED");
const selectedMotelType = ref("TAI_LIEU");
const selectedDel = ref(false);

// State phân trang
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 0,
});

// Hàm reset lại trang hiện tại về 1 khi thay đổi bộ lọc
function resetPage() {
  pagination.value.current = 1;
}

/**
 * Lấy danh sách bài đăng theo userId và các bộ lọc đã chọn
 */
async function fetchPosts() {
  if (!userId.value) return;

  // Tạo params dựa vào bộ lọc trạng thái
  let params = {};
  switch (selectedStatus.value) {
    case "APPROVED":
      params.approved = true;
      params.notApproved = false;
      break;
    case "BLOCKED":
      params.approved = false;
      break;
    case "PENDING":
      params.approved = true;
      params.notApproved = true;
      break;
  }
  // Thêm param cho hình thức
  params.motel = selectedMotelType.value;
  // Thêm param cho trạng thái hiển thị
  params.del = selectedDel.value;

  // Thêm tham số phân trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  try {
    const postResponse = await getPostsByUserId(userId.value, params);
    const responseData =
      postResponse && postResponse.data ? postResponse.data : {};

    // Xử lý dữ liệu trả về
    if (typeof responseData.success !== "undefined") {
      if (responseData.success) {
        if (responseData.data && responseData.data.items) {
          posts.value = responseData.data.items;
          pagination.value.total = responseData.data.total || 0;
        } else if (responseData.items) {
          posts.value = responseData.items;
          pagination.value.total =
            responseData.total || responseData.items.length;
        } else {
          posts.value = [];
          pagination.value.total = 0;
        }
      } else {
        posts.value = [];
        pagination.value.total = 0;
      }
    } else {
      if (responseData.items) {
        posts.value = responseData.items;
        pagination.value.total =
          responseData.total || responseData.items.length;
      } else {
        posts.value = [];
        pagination.value.total = 0;
      }
    }
  } catch (error) {
    posts.value = [];
    pagination.value.total = 0;
  }
}

/**
 * Xử lý sự kiện chuyển trang và cuộn lên đầu trang
 */
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Khởi tạo component: lấy thông tin người dùng và danh sách bài đăng
 */
onMounted(async () => {
  try {
    const profileResponse = await getProfile();
    const profileData = profileResponse.data;
    userId.value = profileData.data ? profileData.data.id : profileData.id;
    await fetchPosts();
  } catch (error) {
    // Xử lý lỗi khi không lấy được thông tin người dùng
  }
});
</script>

<style scoped>
/* Custom animations for cards */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: slideInUp 0.6s ease-out forwards;
}

/* Custom pagination styles */
:deep(.custom-pagination .ant-pagination-item) {
  border: none;
  border-radius: 8px;
  margin: 0 4px;
  background: #f8fafc;
  transition: all 0.3s ease;
}

:deep(.custom-pagination .ant-pagination-item:hover) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

:deep(.custom-pagination .ant-pagination-item:hover a) {
  color: white;
}

:deep(.custom-pagination .ant-pagination-item-active) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

:deep(.custom-pagination .ant-pagination-item-active a) {
  color: white;
  font-weight: 600;
}

:deep(.custom-pagination .ant-pagination-prev),
:deep(.custom-pagination .ant-pagination-next) {
  border: none;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.3s ease;
}

:deep(.custom-pagination .ant-pagination-prev:hover),
:deep(.custom-pagination .ant-pagination-next:hover) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

:deep(.custom-pagination .ant-pagination-jump-prev),
:deep(.custom-pagination .ant-pagination-jump-next) {
  border-radius: 8px;
}

/* Gradient text animation */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-clip-text {
  background-size: 200% 200%;
  animation: gradientAnimation 3s ease infinite;
}

/* Button hover effects */
.group:hover .transform {
  transform: translateY(-2px);
}

/* Card shadow animation */
.bg-white {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-white:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive grid improvements */
@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.5rem;
  }
}

/* Loading animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Icon hover effects */
svg {
  transition: all 0.3s ease;
}

.group:hover svg {
  transform: scale(1.1);
}

/* Custom scrollbar for smooth scrolling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}
</style>
