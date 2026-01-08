<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-300 p-4">
    <!-- Login Form Container -->
    <div
      class="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div class="flex flex-col items-center w-full">
        <!-- Tiêu đề và link đăng ký -->
        <div class="mb-12 w-full text-center">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">Đăng nhập</h1>
          <p class="text-gray-600 text-base md:text-base">
            Chưa có tài khoản?
            <router-link to="/register" class="text-blue-500 hover:font-bold">
              Đăng ký tại đây.
            </router-link>
          </p>
        </div>

        <!-- Form đăng nhập -->
        <form @submit.prevent="handleLogin" class="space-y-7 w-full">
          <!-- Trường nhập email -->
          <div>
            <label
              for="email"
              class="block text-gray-700 font-medium mb-2 text-sm md:text-base"
            >
              Email
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              @input="clearError('email')"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
            />
            <p v-if="errors.email" class="text-red-500 text-base mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Trường nhập mật khẩu -->
          <div>
            <label
              for="password"
              class="block text-gray-700 font-medium mb-2 text-sm md:text-base"
            >
              Mật khẩu
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                required
                @input="clearError('password')"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 focus:shadow-md focus:shadow-blue-200 outline-none transition duration-300 text-base"
              />
              <!-- Nút ẩn/hiện mật khẩu -->
              <button
                type="button"
                class="absolute inset-y-0 right-4 flex items-center"
                @click="togglePasswordVisibility"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
            <p v-if="errors.password" class="text-red-500 text-base mt-1">
              {{ errors.password }}
            </p>
          </div>

          <!-- Hiển thị lỗi chung -->
          <p
            v-if="generalError"
            class="text-red-500 text-center md:text-center text-base mb-4"
          >
            {{ generalError }}
          </p>

          <!-- Nút đăng nhập -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed text-base"
            >
              <span v-if="loading" class="loader mr-2"></span>
              Đăng nhập
            </button>
          </div>

          <!-- Link quên mật khẩu -->
          <div>
            <router-link
              to="/forgot-password"
              class="text-blue-500 text-base flex items-center justify-center hover:font-bold"
            >
              Quên mật khẩu?
            </router-link>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-sm text-gray-500 text-center mt-6">
        &copy; Toàn bộ bản quyền thuộc
        <router-link to="/home" class="text-blue-500 text-sm hover:font-bold">
          Nguyen Khac Duong
        </router-link>
      </div>
    </div>

    <!-- Nút liên hệ Zalo -->
    <a
      href="https://zalo.me/0981266403"
      target="_blank"
      class="fixed bottom-4 right-4 z-50"
    >
      <img src="@/assets/zalo-icon.svg" alt="Zalo contact" class="w-15 h-15" />
    </a>
  </div>
</template>

<script setup>
// Import các thư viện Vue cần thiết
import { ref } from "vue";
import { useRouter } from "vue-router";

// Import store quản lý authentication
import { useAuthStore } from "../../stores/store";

// Import icons hiển thị/ẩn mật khẩu
import { Eye, EyeOff } from "lucide-vue-next";

// Email người dùng nhập vào
const email = ref("");

// Mật khẩu người dùng nhập vào
const password = ref("");

// Trạng thái hiển thị/ẩn mật khẩu
const showPassword = ref(false);

// Trạng thái loading khi đang xử lý đăng nhập
const loading = ref(false);

// Object chứa các lỗi validation cho từng trường
const errors = ref({});

// Thông báo lỗi chung (từ server hoặc lỗi đăng nhập)
const generalError = ref("");

// Router để điều hướng trang
const router = useRouter();

// Store quản lý trạng thái đăng nhập
const authStore = useAuthStore();

// Hàm kiểm tra tính hợp lệ của email và mật khẩu trước khi đăng nhập
const validateInput = () => {
  errors.value = {};

  if (!email.value) {
    errors.value.email = "Email không được để trống.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Email không đúng định dạng.";
  }

  if (!password.value) {
    errors.value.password = "Mật khẩu không được để trống.";
  } else if (password.value.length < 6 || password.value.length > 15) {
    errors.value.password = "Mật khẩu phải từ 6-15 kí tự.";
  }

  return Object.keys(errors.value).length === 0;
};

// Hàm xóa thông báo lỗi khi người dùng bắt đầu nhập lại
const clearError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = "";
  }
  generalError.value = "";
};

// Hàm chuyển đổi giữa hiển thị và ẩn mật khẩu
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Hàm xử lý đăng nhập khi người dùng submit form
const handleLogin = async () => {
  loading.value = true;
  generalError.value = "";

  // Kiểm tra validation trước khi gọi API
  if (!validateInput()) {
    loading.value = false;
    return;
  }

  try {
    // Gọi API đăng nhập thông qua store
    await authStore.login(email.value, password.value);

    // Lấy URL chuyển hướng từ localStorage (dùng khi user truy cập trang yêu cầu đăng nhập)
    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/home";

    // Xóa dữ liệu chuyển hướng sau khi đã lấy
    localStorage.removeItem("redirectAfterLogin");

    // Chuyển hướng đến trang đã lưu hoặc trang home
    router.push(redirectPath);
  } catch (err) {
    // Hiển thị thông báo lỗi nếu đăng nhập thất bại
    generalError.value = err?.message || "Đăng nhập thất bại!";
  } finally {
    // Tắt trạng thái loading
    loading.value = false;
  }
};
</script>

<style scoped>
@import "@/style.css";
</style>
