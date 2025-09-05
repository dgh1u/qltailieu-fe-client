<template>
  <div class="dropdown-wrapper" @mouseenter="showMenu" @mouseleave="hideMenu">
    <!-- Desktop Trigger -->
    <div class="dropdown-trigger">
      <div class="avatar-container">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="User Avatar"
          class="avatar-image"
        />
        <div v-else class="avatar-placeholder">
          <User class="avatar-icon" />
        </div>
      </div>
      <ChevronDown class="chevron-icon" />
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobile" class="mobile-menu">
      <!-- Mobile User Section -->
      <div class="mobile-user-section">
        <div class="mobile-avatar">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="User Avatar"
            class="mobile-avatar-image"
          />
          <div v-else class="mobile-avatar-placeholder">
            <User class="mobile-avatar-icon" />
          </div>
        </div>
        <div class="mobile-user-info">
          <div class="mobile-username">{{ profile.fullName }}</div>
          <div class="mobile-email">{{ profile.email }}</div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="mobile-nav">
        <a
          href="/profile"
          class="mobile-nav-item"
          @click="closeMobileMenuIfNeeded"
        >
          <User class="nav-icon" />
          <span>Thông tin tài khoản</span>
        </a>
        <a
          href="/create-post"
          class="mobile-nav-item"
          @click="closeMobileMenuIfNeeded"
        >
          <Edit class="nav-icon" />
          <span>Đăng tải tài liệu</span>
        </a>
        <a
          href="/my-posts"
          class="mobile-nav-item"
          @click="closeMobileMenuIfNeeded"
        >
          <Folder class="nav-icon" />
          <span>Tài liệu của tôi</span>
        </a>
        <div class="mobile-divider"></div>
        <a
          href="#"
          @click.prevent="handleLogout"
          class="mobile-nav-item logout"
        >
          <LogOut class="nav-icon" />
          <span>Đăng xuất</span>
        </a>
      </div>
    </div>

    <!-- Desktop Dropdown -->
    <div
      v-show="showDropdown && !isMobile"
      class="desktop-dropdown"
      @mouseenter="showMenu"
      @mouseleave="hideMenu"
    >
      <!-- User Info Section -->
      <div class="user-section">
        <div class="user-avatar">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="User Avatar"
            class="user-avatar-image"
          />
          <div v-else class="user-avatar-placeholder">
            <User class="user-avatar-icon" />
          </div>
        </div>
        <div class="user-details">
          <div class="user-name">{{ profile.fullName }}</div>
          <div class="user-email">{{ profile.email }}</div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="nav-menu">
        <a href="/profile" class="nav-item">
          <User class="nav-icon" />
          <span>Thông tin tài khoản</span>
        </a>
        <a href="/create-post" class="nav-item">
          <Edit class="nav-icon" />
          <span>Đăng tải tài liệu</span>
        </a>
        <a href="/my-posts" class="nav-item">
          <Folder class="nav-icon" />
          <span>Tài liệu của tôi</span>
        </a>
      </div>

      <!-- Logout Section -->
      <div class="logout-section">
        <a href="#" @click.prevent="handleLogout" class="logout-item">
          <LogOut class="nav-icon" />
          <span>Đăng xuất</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from "vue";
import { useAuthStore } from "@/stores/store";
import { useRouter } from "vue-router";
import {
  Clock,
  User,
  LogOut,
  CreditCard,
  Folder,
  Edit,
  ChevronDown,
} from "lucide-vue-next";
import { getProfile } from "@/apis/authService";

// Nhận props từ component cha
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
  closeMobileMenuFn: {
    type: Function,
    default: null,
  },
});

const authStore = useAuthStore();
const router = useRouter();

// Biến quản lý trạng thái hiển thị dropdown
const showDropdown = ref(false);
let hideTimeout = null;

// Lấy URL avatar từ store
const avatarUrl = computed(() => authStore.avatar);

// Thông tin người dùng
const profile = ref({
  fullName: "",
  email: "",
});

// Số dư tài khoản
const balance = ref(0);

// Lấy thông tin người dùng khi component được khởi tạo
onMounted(async () => {
  try {
    const response = await getProfile();
    profile.value = {
      fullName: response.data.fullName,
      email: response.data.email,
    };
    balance.value = response.data.balance;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin profile:", error);
  }
});

// Định dạng số dư theo định dạng tiền tệ Việt Nam
const formattedBalance = computed(() => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(balance.value);
});

// Hiển thị menu dropdown
const showMenu = () => {
  if (props.isMobile) return; // Không sử dụng hiệu ứng hover trên mobile
  clearTimeout(hideTimeout);
  showDropdown.value = true;
};

// Ẩn menu dropdown với độ trễ
const hideMenu = () => {
  if (props.isMobile) return; // Không sử dụng hiệu ứng hover trên mobile
  hideTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 100);
};

// Đóng mobile menu nếu được gọi từ component cha
const closeMobileMenuIfNeeded = () => {
  if (
    props.closeMobileMenuFn &&
    typeof props.closeMobileMenuFn === "function"
  ) {
    props.closeMobileMenuFn();
  }
};

// Xử lý sự kiện nạp tiền
const handleDeposit = () => {
  closeMobileMenuIfNeeded();
  router.push("/payment");
};

// Xử lý sự kiện đăng xuất
const handleLogout = () => {
  authStore.logout();
  showDropdown.value = false;
  closeMobileMenuIfNeeded();
  router.push("/login");
};
</script>

<style scoped>
/* Dropdown Wrapper */
.dropdown-wrapper {
  position: relative;
}

/* Desktop Trigger */
.dropdown-trigger {
  display: none;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.dropdown-trigger:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

@media (min-width: 768px) {
  .dropdown-trigger {
    display: flex;
  }
}

/* Avatar Components */
.avatar-container {
  position: relative;
}

.avatar-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}

.avatar-placeholder {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 18px;
  height: 18px;
  color: #64748b;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  color: #64748b;
  transition: transform 0.2s ease;
}

.dropdown-wrapper:hover .chevron-icon {
  transform: rotate(180deg);
}

/* Mobile Menu */
.mobile-menu {
  padding: 16px;
}

.mobile-user-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.mobile-avatar {
  margin-right: 12px;
}

.mobile-avatar-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}

.mobile-avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-avatar-icon {
  width: 24px;
  height: 24px;
  color: #64748b;
}

.mobile-user-info {
  flex: 1;
}

.mobile-username {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
}

.mobile-email {
  font-size: 14px;
  color: #64748b;
}

/* Mobile Navigation */
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 15px;
}

.mobile-nav-item:hover {
  background: #f8fafc;
  color: #1e293b;
}

.mobile-nav-item.logout:hover {
  background: #fef2f2;
  color: #dc2626;
}

.mobile-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

/* Desktop Dropdown */
.desktop-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 280px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 9999;
  overflow: hidden;
}

/* User Section */
.user-section {
  padding: 20px;
  border-bottom: 1px solid #f1f5f9;
  background: #fafafa;
}

.user-avatar {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.user-avatar-image {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
  margin-right: 12px;
}

.user-avatar-placeholder {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.user-avatar-icon {
  width: 20px;
  height: 20px;
  color: #64748b;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
}

.user-email {
  font-size: 13px;
  color: #64748b;
}

/* Navigation Menu */
.nav-menu {
  padding: 8px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
}

.nav-item:hover {
  background: #f8fafc;
  color: #1e293b;
}

/* Logout Section */
.logout-section {
  border-top: 1px solid #f1f5f9;
  padding: 8px 0;
}

.logout-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
}

.logout-item:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* Navigation Icons */
.nav-icon {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  flex-shrink: 0;
}

/* Responsive Design */
@media (max-width: 767px) {
  .dropdown-trigger {
    display: none !important;
  }

  .desktop-dropdown {
    display: none !important;
  }
}

/* Focus States for Accessibility */
.dropdown-trigger:focus,
.nav-item:focus,
.mobile-nav-item:focus,
.logout-item:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth Transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation for dropdown */
.desktop-dropdown {
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
