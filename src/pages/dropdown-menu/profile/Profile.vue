<template>
  <ProfileLayout>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header Section -->
        <div
          class="bg-white rounded-2xl shadow-xl p-8 mb-8"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          <div class="text-center">
            <!-- Avatar placeholder -->
            <div
              class="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold">{{
                getInitials(profileData.fullName)
              }}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              Thông tin tài khoản
            </h1>
            <p class="text-gray-600">Quản lý thông tin cá nhân của bạn</p>
          </div>
        </div>

        <!-- Main Form Card -->
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <h2 class="text-xl font-semibold text-white">Chi tiết thông tin</h2>
          </div>

          <form @submit.prevent="onSubmit" class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Email Field -->
              <div class="space-y-2">
                <label
                  class="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                  Email
                </label>
                <div class="relative">
                  <input
                    type="email"
                    v-model="profileData.email"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 focus:outline-none cursor-not-allowed"
                    disabled
                  />
                  <div class="absolute right-3 top-3">
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Full Name Field -->
              <div class="space-y-2">
                <label
                  class="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Họ và tên
                </label>
                <input
                  type="text"
                  v-model="profileData.fullName"
                  placeholder="Nhập họ và tên của bạn"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
              </div>

              <!-- Address Field -->
              <div class="space-y-2">
                <label
                  class="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Địa chỉ
                </label>
                <input
                  type="text"
                  v-model="profileData.address"
                  placeholder="Nhập địa chỉ của bạn"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
              </div>

              <!-- Phone Field -->
              <div class="space-y-2">
                <label
                  class="flex items-center text-sm font-medium text-gray-700 mb-2"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  v-model="profileData.phone"
                  placeholder="Nhập số điện thoại của bạn"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex justify-end space-x-4 mt-10 pt-6 border-t border-gray-200"
            >
              <button
                type="button"
                @click="onCancel"
                class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center space-x-2"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span>Hủy bỏ</span>
              </button>

              <button
                type="submit"
                class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
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
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Additional Info Card -->
        <div
          class="bg-white rounded-2xl shadow-xl p-6 mt-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div class="flex items-center space-x-4">
            <div
              class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Bảo mật thông tin</h3>
              <p class="text-sm text-gray-600">
                Thông tin của bạn được bảo vệ và mã hóa an toàn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProfileLayout from "../../../layouts/ProfileLayout.vue";
import { getProfile, updateProfile } from "@/apis/authService.js";
import { message } from "ant-design-vue";

// Khởi tạo dữ liệu form
const profileData = ref({
  email: "",
  fullName: "",
  address: "",
  phone: "",
});

// Lưu trữ bản sao ban đầu của dữ liệu profile để khôi phục khi hủy
let initialProfileData = {};

// Hàm lấy chữ cái đầu của tên để hiển thị avatar
const getInitials = (name) => {
  if (!name) return "U";
  const names = name.split(" ");
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

// Lấy thông tin profile khi component được tạo
onMounted(async () => {
  try {
    const response = await getProfile();
    const { email, fullName, address, phone } = response.data;
    profileData.value = { email, fullName, address, phone };
    // Lưu lại bản sao ban đầu cho chức năng hủy
    initialProfileData = { ...profileData.value };
  } catch (error) {
    message.error("Lỗi khi lấy thông tin tài khoản!");
    console.error("Lỗi khi lấy thông tin profile:", error);
  }
});

// Xử lý cập nhật thông tin profile
const onSubmit = async () => {
  try {
    await updateProfile(profileData.value);
    message.success("Cập nhật thông tin thành công!");
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Cập nhật thất bại!";
    message.error(errorMsg);
    console.error("Lỗi khi cập nhật profile:", error);
  }
};

// Khôi phục dữ liệu về trạng thái ban đầu
const onCancel = () => {
  profileData.value = { ...initialProfileData };
};
</script>

<style scoped>
/* CSS sẽ được thêm khi cần */
</style>
