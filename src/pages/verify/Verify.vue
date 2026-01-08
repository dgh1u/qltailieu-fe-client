<script setup>
// Import các hàm reactive và lifecycle hooks từ Vue
import { ref, reactive, onMounted, onUnmounted } from "vue";
// Import service xử lý xác thực OTP
import * as authService from "@/apis/authService";

// Nhận email từ component cha
const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

// Phát sự kiện về component cha khi xác thực thành công
const emit = defineEmits(["verified"]);

// Mảng chứa 6 ô nhập OTP
const otpInputs = reactive(["", "", "", "", "", ""]);

// Trạng thái UI và xử lý lỗi
const loading = ref(false); // Trạng thái loading
const generalError = ref(""); // Lỗi chung từ server
const otpError = ref(""); // Lỗi OTP không hợp lệ

// Xử lý đếm ngược thời gian
const timer = ref("02:00"); // Hiển thị thời gian còn lại
const countdown = ref(120); // Số giây còn lại (2 phút)
let timerInterval; // Interval để đếm ngược // Interval để đếm ngược

// Khởi động đếm ngược khi component được mount
onMounted(() => {
  startCountdown();
});

// Dọn dẹp interval khi component bị unmount
onUnmounted(() => {
  clearInterval(timerInterval);
});

// Hàm bắt đầu đếm ngược thời gian OTP (2 phút)
const startCountdown = () => {
  timerInterval = setInterval(() => {
    countdown.value--;
    const minutes = String(Math.floor(countdown.value / 60)).padStart(2, "0");
    const seconds = String(countdown.value % 60).padStart(2, "0");
    timer.value = `${minutes}:${seconds}`;
    if (countdown.value <= 0) {
      clearInterval(timerInterval);
      alert("Hết thời gian! Vui lòng thử lại.");
    }
  }, 1000);
};

// Hàm chuyển focus sang ô nhập OTP tiếp theo
const focusNext = (index) => {
  if (index < otpInputs.length - 1) {
    document.getElementById(`otp-${index + 1}`).focus();
  }
};

// Hàm chuyển focus về ô nhập OTP trước đó
const focusPrev = (index) => {
  if (index > 0) {
    document.getElementById(`otp-${index - 1}`).focus();
  }
};

// Hàm ghép 6 ô nhập thành chuỗi OTP hoàn chỉnh
const getOtp = () => otpInputs.join("");

// Hàm xử lý xác thực OTP
const handleVerify = async () => {
  const otp = getOtp();
  if (otp.length !== 6) {
    otpError.value = "OTP phải đủ 6 ký tự.";
    return;
  }
  loading.value = true;
  try {
    await authService.verifyAccount(props.email, otp);
    emit("verified", otp);
    clearInterval(timerInterval);
  } catch (error) {
    generalError.value =
      error?.message || "Xác thực thất bại. Vui lòng thử lại!";
  } finally {
    loading.value = false;
  }
};

// Hàm xử lý gửi lại mã OTP mới
const handleRegenerateOTP = async () => {
  loading.value = true;
  try {
    await authService.regenerateOTP(props.email);
    alert("OTP mới đã được gửi!");
    countdown.value = 120;
    clearInterval(timerInterval);
    startCountdown();
  } catch (error) {
    generalError.value =
      error?.message || "Không thể gửi lại OTP. Vui lòng thử lại!";
  } finally {
    loading.value = false;
  }
};

// Hàm xóa thông báo lỗi
const clearError = () => {
  otpError.value = "";
  generalError.value = "";
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Xác thực tài khoản</h2>
          <p class="text-gray-600 text-sm">
            Nhập mã OTP đã được gửi đến<br />
            <span class="font-semibold text-gray-900">{{ email }}</span>
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleVerify">
          <!-- OTP Input -->
          <div class="mb-6">
            <div class="flex justify-center gap-2">
              <input
                v-for="(digit, index) in otpInputs"
                :key="index"
                :id="'otp-' + index"
                v-model="otpInputs[index]"
                maxlength="1"
                type="text"
                class="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                :class="{
                  'border-red-400': otpError
                }"
                @input="
                  (e) => {
                    clearError();
                    if (e.target.value) focusNext(index);
                  }
                "
                @keydown.backspace="
                  (e) => {
                    if (!otpInputs[index]) focusPrev(index);
                  }
                "
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="otpError || generalError" class="mb-6">
            <p class="text-red-600 text-sm text-center">
              {{ otpError || generalError }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Đang xác thực...' : 'Xác nhận' }}
          </button>
        </form>

        <!-- Timer -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 text-sm">
            Mã có hiệu lực trong: <span class="font-semibold text-gray-900">{{ timer }}</span>
          </p>
        </div>

        <!-- Resend -->
        <div class="mt-4 text-center">
          <button
            @click="handleRegenerateOTP"
            :disabled="loading"
            class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Gửi lại mã OTP
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Remove number input arrows */
input[type="text"]::-webkit-outer-spin-button,
input[type="text"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
