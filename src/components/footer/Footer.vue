<template>
  <footer class="bg-sky-50 border-t border-sky-50 font-medium">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="lg:col-span-2">
            <div class="flex items-center mb-4">
              <img src="@/assets/logo.png" width="50" alt="Logo" class="mr-3" />
              <div>
                <h3 class="text-xl font-bold text-gray-900">VNUA Documents</h3>
                <p class="text-base text-gray-600">Quản lý tài liệu</p>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed mb-6 max-w-md">
              Hệ thống quản lý tài liệu dành cho sinh viên và giảng viên Học
              viện Nông nghiệp Việt Nam. Chia sẻ và tìm kiếm tài liệu học tập
              hiệu quả.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Liên kết nhanh
            </h4>
            <ul class="space-y-3">
              <li>
                <a
                  href="/profile"
                  class="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Thông tin tài khoản
                </a>
              </li>
              <li>
                <a
                  href="/create-post"
                  class="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Đăng tài liệu
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  class="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  class="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Liên hệ</h4>
            <div class="space-y-3">
              <div class="flex items-center">
                <Phone class="w-4 h-4 mr-3 text-gray-500" />
                <span class="text-gray-600">+849 3636 3636</span>
              </div>
              <div class="flex items-center">
                <Mail class="w-4 h-4 mr-3 text-gray-500" />
                <span class="text-gray-600">nkduong@gmail.com</span>
              </div>
              <div class="flex items-start">
                <MapPin class="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                <span class="text-gray-600">36 Đan Phượng, Hà Nội</span>
              </div>
            </div>

            <!-- Social Links -->
            <div class="flex space-x-3 mt-6">
              <a
                href="https://www.facebook.com/ngao.hieu.16100?locale=vi_VN"
                class="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook class="w-4 h-4 text-white" />
              </a>
              <a
                href="mailto:nkduong@gmail.com"
                class="w-8 h-8 bg-gray-600 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
              >
                <Mail class="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-200 py-6">
        <div class="text-center">
          <p class="text-gray-500 text-sm">
            © 2025 Nguyễn Khắc Dương. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Import các biểu tượng từ thư viện lucide-vue-next
import { Facebook, Mail, Phone, MapPin } from "lucide-vue-next";
</script>
