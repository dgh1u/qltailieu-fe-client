<template>
  <aside class="h-full bg-white p-2 md:p-4 lg:p-6 shadow-md">
    <!-- Khối thông tin người dùng -->
    <div class="flex items-center space-x-4 mb-6">
      <!-- Avatar -->
      <div class="relative">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="User Avatar"
          class="w-16 h-16 rounded-full object-cover"
        />
        <button
          type="button"
          class="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow"
          @click="onChangeAvatar"
          title="Chọn ảnh mới"
        >
          <RefreshCw class="w-3 h-3" />
        </button>
        <input
          ref="avatarInputRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileSelected"
        />
        <button
          v-if="selectedFile"
          type="button"
          class="absolute -bottom-1 right-6 bg-white rounded-full p-1 shadow"
          @click="onSaveAvatar"
          title="Lưu avatar"
        >
          <Save class="w-3 h-3" />
        </button>
      </div>

      <!-- Thông tin user -->
      <div class="flex flex-col space-y-1">
          <div class="flex items-center text-xs">
          <span class="font-semibold mr-1">Họ tên:</span>
          <span>{{ fullName}}</span>
        </div>
        <div class="flex items-center text-xs">
          <span class="font-semibold mr-1">Email:</span>
          <span>{{ userEmail }}</span>
        </div>
        <div class="flex items-center text-xs ">
          <span class="font-semibold mr-1">Mã tài khoản:</span>
          <span>{{ userId }}</span>
        </div>
      </div>
    </div>

    <!-- <div
      class="mb-4 md:mb-6 px-2 md:px-3 py-2 md:py-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between whitespace-nowrap"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
   
      <div class="flex flex-col mr-2">
        <span class="text-xs md:text-sm text-gray-600">Số dư tài khoản</span>
        <span class="text-sm md:text-md font-bold"
          >{{ formattedBalance }} ₫</span
        >
      </div>

 
      <router-link
        to="/payment"
        class="flex items-center space-x-1 md:space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-2 md:px-3 py-1 md:py-1.5 rounded-xl transition duration-150"
      >
        <CreditCard class="w-4 h-4" />
        <span class="text-xs md:text-sm font-bold">Nạp tiền</span>
      </router-link>
    </div> -->
    <!-- Menu điều hướng sidebar -->
    <nav class="space-y-2">
      <router-link
        to="/profile"
        class="flex pt-4 py-1.5 items-center text-gray-500 hover:text-black"
        :class="{ 'font-bold !text-sky-600': $route.path === '/profile' }"
        exact
      >
        <User class="w-5 h-4 mr-2" />
        <span class="text-base font-medium">Thông tin tài khoản</span>
      </router-link>
      
      <router-link
        to="/create-post"
        class="flex py-1.5 items-center text-gray-500 hover:text-black"
        :class="{ 'font-bold !text-sky-600': $route.path === '/create-post' }"
      >
        <FolderPen class="w-5 h-4 mr-2" />
        <span class="text-base font-medium">Đăng tải tài liệu</span>
      </router-link>
      
      <router-link
        to="/my-posts"
        class="flex py-1.5 items-center text-gray-500 hover:text-black"
        :class="{ 'font-bold !text-sky-600': $route.path === '/my-posts' }"
      >
        <Folder class="w-5 h-4 mr-2" />
        <span class="text-base font-medium">Tài liệu của tôi</span>
      </router-link>
    </nav>
  </aside>
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
