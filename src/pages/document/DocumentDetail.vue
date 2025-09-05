<template>
  <DefaultLayout>
    <!-- Breadcrumb định hướng -->
    <div
      class="pt-4 px-6"
      v-if="post"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <div class="text-sm text-gray-500 flex items-center flex-wrap space-x-1">
        <router-link to="/post/document" class="text-sky-500 hover:underline">
          Tài liệu
        </router-link>
        <span>/</span>
        <span class="font-semibold">
          {{ post.title }}
        </span>
      </div>
    </div>

    <!-- Main container - change to flex column -->
    <div class="flex flex-col min-h-screen">
      <!-- Content columns wrapper -->
      <div class="flex flex-col lg:flex-row flex-1">
        <!-- Left column (Image) -->
        <div class="w-full lg:w-96 mx-auto mr-20 p-4 bg-sky-50">
          <!-- Changed from lg:w-120 to lg:w-96 -->
          <!-- Image Section -->
          <div class="rounded-xl border border-gray-200 my-6">
            <div
              class="relative w-full aspect-[3/4] rounded-xl overflow-hidden"
            >
              <img
                :src="mainImage"
                alt="Document Image"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- Các nút thao tác dành cho chủ bài đăng -->
          <div class="py-4 sm:py-8">
            <div v-if="isOwner" class="p-4 rounded-xl">
              <div class="text-center">
                <span class="font-semibold text-base sm:text-lg">Thao tác</span>
              </div>
              <div class="pt-4">
                <div
                  class="w-full py-2 rounded-xl flex items-center justify-center font-medium bg-sky-100 text-sm sm:text-base"
                >
                  <span class="font-normal">Trạng thái:&nbsp;</span>
                  <span
                    :class="{
                      'text-green-500': displayStatus === 'Đã duyệt',
                      'text-yellow-500': displayStatus === 'Chờ duyệt',
                      'text-red-500': displayStatus === 'Bị khóa',
                    }"
                  >
                    {{ displayStatus }}
                  </span>
                </div>
              </div>
              <div class="py-2">
                <router-link
                  :to="`/update-post/${post.id}`"
                  class="bg-yellow-500 hover:bg-yellow-600 w-full py-2 sm:py-3 rounded-xl flex items-center justify-center text-white text-sm sm:text-base"
                >
                  <span class="font-medium">Cập nhật</span>
                </router-link>
              </div>
              <div class="text-white">
                <button
                  @click="toggleHidePost"
                  :class="
                    post.del === false
                      ? 'bg-red-400 hover:bg-red-500'
                      : 'bg-green-400 hover:bg-green-500'
                  "
                  class="w-full py-2 sm:py-3 rounded-xl mt-2 flex items-center justify-center text-white text-sm sm:text-base"
                >
                  <span class="font-medium">
                    {{ post.del === false ? "Ẩn tin đăng" : "Hiện tin đăng" }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column (Details) -->
        <div class="flex-1 p-4 bg-sky-50 order-1 lg:order-2">
          <!-- Chi tiết bài đăng -->
          <div v-if="post" class="rounded-xl p-4 text-left">
            <div>
              <div>
                <span class="text-xl sm:text-3xl font-bold">{{
                  post.title
                }}</span>

                <!-- Địa chỉ và thông tin khu vực -->
                <div
                  class="flex flex-col sm:flex-row sm:justify-between text-sm my-2 mt-4 gap-2"
                >
                  <div class="flex items-center flex-wrap">
                    <Tag class="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />

                    <span class="text-sm sm:text-base">
                      Loại tài liệu:<span class="ml-2 font-medium text-sky-600">
                        {{ post.criteriaDTO.secondMotel }}</span
                      >
                    </span>
                  </div>
                </div>

                <div
                  class="flex items-center justify-between flex-wrap gap-2 sm:gap-4 mb-4"
                >
                  <div class="flex items-center flex-wrap gap-2 sm:gap-4">
                    <div class="flex items-center">
                      <GraduationCap
                        class="w-5 h-5 mr-1 mt-0.5 flex-shrink-0"
                      />
                      <span class="text-sm sm:text-base">
                        Chuyên ngành:<span
                          class="ml-2 font-medium text-sky-600"
                        >
                          {{ post.criteriaDTO.major }}</span
                        >
                      </span>
                    </div>
                  </div>

                  <!-- Thông tin ngày đăng -->
                  <div
                    class="flex items-center text-sm w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    <span>Ngày đăng: {{ formatDate(post.createAt) }}</span>
                  </div>
                </div>
              </div>

              <hr class="my-3 mx-2 sm:mx-6 border-gray-100" />
              <span class="text-lg font-semibold">Thông tin người đăng</span>
              <!-- Nội dung chi tiết -->
              <div class="py-2">
                <!-- User Info - New Position -->
                <div class="flex items-start gap-4 mb-4">
                  <!-- Avatar -->
                  <div
                    class="w-12 h-12 rounded-full overflow-hidden bg-sky-50 flex-shrink-0"
                  >
                    <img
                      v-if="finalAvatar"
                      :src="finalAvatar"
                      alt="avatar"
                      class="object-cover w-full h-full"
                    />
                  </div>

                  <!-- Contact Info - Two rows -->
                  <div class="flex flex-col font-medium">
                    <!-- Name Row -->
                    <div class="text-base font-semibold text-gray-800">
                      {{ post.userDTO.fullName }}
                    </div>

                    <!-- Contact Details Row -->
                    <div class="flex items-center gap-4">
                      <!-- Email -->
                      <div class="flex items-center gap-1">
                        <Mail class="w-4 h-4 text-gray-500" />
                        <span class="text-sm text-gray-600">{{
                          post.userDTO.email
                        }}</span>
                      </div>

                      <!-- Phone -->
                      <div class="flex items-center gap-1">
                        <Phone class="w-4 h-4 text-gray-500" />
                        <span class="text-sm text-gray-600">{{
                          post.userDTO.phone
                        }}</span>
                      </div>

                      <!-- Zalo -->
                      <a
                        :href="`https://zalo.me/${post.userDTO.phone}`"
                        target="_blank"
                        class="inline-flex items-center justify-center p-1 rounded-full bg-sky-400 hover:bg-blue-600 transition-colors"
                      >
                        <img
                          src="@/assets/zalo-icon.svg"
                          alt="Zalo"
                          class="w-5 h-5"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <div class="py-2">
                  <!-- Description heading with bolder underline -->
                  <div class="border-b-2 border-blue-500 inline-block">
                    <span class="text-lg font-semibold">Mô tả</span>
                  </div>
                  <span class="block py-2 break-words text-sm sm:text-base">
                    {{ post.content }}
                  </span>
                </div>
              </div>

              <!-- Các đặc điểm của quán -->
            </div>
          </div>

          <!-- PHẦN TÀI LIỆU -->
          <div v-if="documents && documents.length > 0" class="pt-4">
            <div class="rounded-xl p-4 text-left">
              <div class="pb-4">
                <span class="text-xl font-bold">Tài liệu đính kèm</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="doc in documents"
                  :key="doc.id"
                  class="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group"
                  @click="handleDocumentClick(doc)"
                >
                  <!-- File Icon -->
                  <div
                    class="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3"
                  >
                    <!-- PDF Icon -->
                    <img
                      v-if="doc.fileType && doc.fileType.includes('pdf')"
                      src="@/assets/fileLogo/pdf.svg"
                      alt="PDF"
                      class="w-6 h-6"
                    />
                    <!-- Word Icon -->
                    <img
                      v-else-if="
                        doc.fileType &&
                        (doc.fileType.includes('word') ||
                          doc.fileName.includes('.docx') ||
                          doc.fileName.includes('.doc'))
                      "
                      src="@/assets/fileLogo/word.svg"
                      alt="Word Document"
                      class="w-6 h-6"
                    />
                    <!-- PowerPoint Icon -->
                    <img
                      v-else-if="
                        doc.fileType &&
                        (doc.fileType.includes('presentation') ||
                          doc.fileName.includes('.ppt') ||
                          doc.fileName.includes('.pptx'))
                      "
                      src="@/assets/fileLogo/pp.svg"
                      alt="PowerPoint Presentation"
                      class="w-6 h-6"
                    />
                    <!-- Excel Icon -->
                    <img
                      v-else-if="
                        doc.fileType &&
                        (doc.fileType.includes('excel') ||
                          doc.fileType.includes('spreadsheet') ||
                          doc.fileName.includes('.xlsx') ||
                          doc.fileName.includes('.xls'))
                      "
                      src="@/assets/fileLogo/excel.svg"
                      alt="Excel Spreadsheet"
                      class="w-6 h-6"
                    />

                    <!-- Zip Icon -->
                    <img
                      v-else-if="
                        doc.fileType &&
                        doc.fileType.includes('x-zip-compressed')
                      "
                      src="@/assets/fileLogo/zip.png"
                      alt="Zip"
                      class="w-6 h-6"
                    />

                    <!-- Default File Icon -->
                    <svg
                      v-else
                      class="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 18h12V6l-4-4H4v16zm8-14v4h4l-4-4z" />
                    </svg>
                  </div>

                  <!-- File Info -->
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-semibold text-gray-900 truncate mb-1"
                    >
                      {{ doc.fileName }}
                    </p>
                    <span
                      class="text-xs text-gray-500 mb-1 flex justify-between items-center"
                    >
                      <span>{{
                        getFileTypeText(doc.fileType || doc.fileName)
                      }}</span>
                      <!-- Download hint hiện sát phải khi hover -->
                      <span
                        class="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                      >
                        Click để tải về
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments section - moved outside the columns -->
      <div class="w-full bg-sky-50 px-4 pb-4">
        <Comment v-if="post && post.id" :postId="post.id" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Comment from "../../components/comment/Comment.vue";
import { getDetailPost, hidePost } from "@/apis/postService.js";
import { getImageByPost } from "@/apis/imageService.js";
import { useAuthStore } from "@/stores/store";

import { getProfile } from "@/apis/authService.js";
import { message } from "ant-design-vue";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  CircleParking,
  Truck,
  UtensilsCrossed,
  ShoppingBag,
  Expand,
  Tag,
  GraduationCap,
} from "lucide-vue-next";
import {
  MapPin as MapPinIcon,
  Snowflake as SnowflakeIcon,
  Wifi as WifiIcon,
} from "lucide-vue-next";
import { getDocumentsByPost, downloadDoc } from "@/apis/documentService.js";

const documents = ref([]);

const route = useRoute();
const router = useRouter();

const post = ref(null);
const errorMsg = ref("");
const currentUser = ref(null);

// Định dạng ngày tháng
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

// Tạo URL Google Maps
const mapUrl = computed(() => {
  if (!post.value?.criteriaDTO?.address) return "";
  const encodedAddress = encodeURIComponent(post.value.criteriaDTO.address);
  return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
});

const displayStatus = computed(() => {
  if (!post.value) return "";

  if (post.value.approved === true && post.value.notApproved === false) {
    return "Đã duyệt";
  } else if (post.value.approved === true && post.value.notApproved === true) {
    return "Chờ duyệt";
  } else if (post.value.approved === false) {
    return "Bị khóa";
  }
  return "";
});

// Xử lý hiển thị avatar
const finalAvatar = computed(() => {
  const avatar = post.value?.userDTO?.b64;
  if (avatar) {
    return avatar.startsWith("data:image")
      ? avatar
      : "data:image/png;base64," + avatar;
  }
  return null;
});

// Quản lý thư viện ảnh
const mainImage = ref(""); // Will store the primary image URL

// Lấy thông tin chi tiết bài đăng
async function fetchPost() {
  const id = route.params.id;
  try {
    const { data: result } = await getDetailPost(id);
    post.value = result;
    await loadMainImage(result.id); // Replace loadGalleryImages with loadMainImage
    documents.value = result.documents || [];
  } catch (error) {
    errorMsg.value = "Có lỗi khi tải bài đăng";
  }
}

// Tải các hình ảnh của bài đăng
async function loadMainImage(postId) {
  try {
    const urls = await getImageByPost(postId);
    mainImage.value =
      Array.isArray(urls) && urls.length > 0
        ? urls[0]
        : "https://dummyimage.com/800x600/cccccc/000000.png&text=No+Image";
  } catch (err) {
    console.error("Error loading image:", err);
    mainImage.value =
      "https://dummyimage.com/800x600/cccccc/000000.png&text=No+Image";
  }
}

// Add error handler for image
function handleImageError(e) {
  e.target.src =
    "https://dummyimage.com/800x600/cccccc/000000.png&text=No+Image";
}

// Hàm tải tài liệu đã được cập nhật để sử dụng API downloadDoc
async function handleDocumentClick(doc) {
  try {
    console.log("💾 Tải tài liệu:", doc.file_name);
    console.log("🆔 Document ID:", doc.id);

    // Gọi API downloadDoc thay vì fetch trực tiếp
    const response = await downloadDoc(doc.id);

    console.log("📡 Response:", response);
    console.log("📡 Response type:", typeof response);
    console.log("📡 Is Blob:", response instanceof Blob);

    let blob;
    let downloadFileName = doc.fileName; // Fallback filename

    // Kiểm tra nếu response là Blob trực tiếp
    if (response instanceof Blob) {
      blob = response;
      console.log(
        "📦 Direct blob - size:",
        blob.size,
        "bytes, type:",
        blob.type
      );
    } else if (response.data) {
      // Nếu response có structure thông thường
      console.log("📡 Response headers:", response.headers);

      // Lấy filename từ Content-Disposition header nếu có
      if (response.headers && response.headers["content-disposition"]) {
        const contentDisposition = response.headers["content-disposition"];
        const fileNameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (fileNameMatch && fileNameMatch[1]) {
          downloadFileName = fileNameMatch[1].replace(/['"]/g, "");
          console.log("📝 Filename từ header:", downloadFileName);
        }
      }

      // Kiểm tra xem response.data có hợp lệ không
      if (!response.data) {
        throw new Error("API không trả về dữ liệu file");
      }

      // Tạo blob từ response data
      blob = new Blob([response.data]);
    } else {
      throw new Error("Response format không được hỗ trợ");
    }

    console.log("📦 Final blob size:", blob.size, "bytes");
    console.log("📝 Download filename:", downloadFileName);

    if (blob.size === 0) {
      throw new Error("File rỗng");
    }

    // Tạo URL tạm từ blob và tải về
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFileName; // ⭐ Quan trọng: download attribute
    link.style.display = "none"; // Ẩn link

    // Thêm vào DOM, click, rồi xóa ngay
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup URL sau 1 giây
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      console.log("🗑️ Cleaned up blob URL");
    }, 1000);

    message.success(
      `Đã tải về: ${downloadFileName} (${(blob.size / 1024 / 1024).toFixed(
        1
      )}MB)`
    );
  } catch (error) {
    console.error("❌ Lỗi tải file:", error);
    message.error(`Không thể tải file: ${error.message}`);
  }
}

function getFileTypeText(fileTypeOrName) {
  if (typeof fileTypeOrName === "string") {
    const lower = fileTypeOrName.toLowerCase();
    if (lower.includes("pdf")) return "PDF Document";
    if (lower.includes("word")) return "Word Document";
    if (lower.includes("presentation")) return "PowerPoint";
    if (lower.includes("spreadsheet")) return "Excel";
    if (lower.includes("x-zip-compressed")) return "Zip";
  }
  return "Document";
}

// Lấy thông tin người dùng hiện tại
async function fetchProfile() {
  try {
    const response = await getProfile();
    currentUser.value = response.data;
  } catch (error) {
    // Xử lý lỗi khi tải thông tin người dùng
  }
}

// Kiểm tra người xem có phải là chủ bài đăng
const isOwner = computed(() => {
  return (
    currentUser.value &&
    post.value &&
    post.value.userDTO &&
    currentUser.value.id === post.value.userDTO.id
  );
});

// Xử lý ẩn/hiện bài đăng
async function toggleHidePost() {
  try {
    const response = await hidePost(post.value.id);
    message.success(response.data.message);
    post.value.del = post.value.del === false ? true : false;
  } catch (error) {
    message.error("Có lỗi xảy ra khi ẩn/hiện tin đăng");
  }
}

onMounted(() => {
  fetchPost();

  const authStore = useAuthStore();
  if (authStore.isAuthenticated && authStore.token?.trim() !== "") {
    fetchProfile();
  }
});
</script>

<style scoped>
.break-words {
  word-break: break-word;
}

.object-cover {
  object-fit: cover;
}
</style>
