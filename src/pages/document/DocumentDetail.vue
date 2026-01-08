<template>
  <DefaultLayout>
    <!-- Breadcrumb định hướng -->
    <div
      class="pt-6 px-4 md:px-8 lg:px-12"
      v-if="post"
      data-aos="zoom-out"
      data-aos-duration="800"
    >
      <div class="text-sm text-gray-600 flex items-center flex-wrap gap-2">
        <router-link to="/post/document" class="text-blue-600 hover:text-blue-700 font-medium transition-colors">
          Tài liệu
        </router-link>
        <span class="text-gray-400">/</span>
        <span class="text-gray-800 font-medium">
          {{ post.title }}
        </span>
      </div>
    </div>

    <!-- Main container - change to flex column -->
    <div class="flex flex-col min-h-screen bg-gray-50">
      <!-- Content columns wrapper -->
      <div class="flex flex-col lg:flex-row flex-1 gap-6 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <!-- Left column (Image) -->
        <div class="w-full lg:w-96 flex-shrink-0">
          <!-- Image Section -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
            <div class="relative w-full aspect-[3/4] overflow-hidden">
              <img
                :src="mainImage"
                alt="Document Image"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>

            <!-- Các nút thao tác dành cho chủ tài liệu -->
            <div v-if="isOwner" class="p-5">
           
              
              <div class="space-y-3">
                <div
                  class="w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium bg-gray-50 border border-gray-200 text-sm"
                >
                  <span class="text-gray-600">Trạng thái:&nbsp;</span>
                  <span
                    :class="{
                      'text-emerald-600': displayStatus === 'Đã duyệt',
                      'text-amber-600': displayStatus === 'Chờ duyệt',
                      'text-rose-600': displayStatus === 'Bị khóa',
                    }"
                    class="font-semibold"
                  >
                    {{ displayStatus }}
                  </span>
                </div>

                <router-link
                  :to="`/update-post/${post.id}`"
                  class="bg-blue-600 hover:bg-blue-700 w-full py-3 px-4 rounded-lg flex items-center justify-center text-white font-medium text-sm transition-colors shadow-sm"
                >
                  Cập nhật tài liệu
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column (Details) -->
        <div class="flex-1 space-y-6 order-1 lg:order-2">
          <!-- Chi tiết tài liệu -->
          <div v-if="post" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div>
              <!-- Title -->
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {{ post.title }}
              </h1>

              <!-- Info Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <!-- Loại tài liệu -->
                <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Tag class="w-5 h-5 text-blue-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs text-gray-500 mb-0.5">Loại tài liệu</p>
                    <p class="text-sm font-semibold text-gray-900 truncate">
                      {{ post.criteriaDTO.secondMotel }}
                    </p>
                  </div>
                </div>

                <!-- Chuyên ngành -->
                <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap class="w-5 h-5 text-purple-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs text-gray-500 mb-0.5">Chuyên ngành</p>
                    <p class="text-sm font-semibold text-gray-900 truncate">
                      {{ post.criteriaDTO.major }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Ngày đăng -->
              <div class="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <Clock class="w-4 h-4" />
                <span>Ngày đăng: {{ formatDate(post.createAt) }}</span>
              </div>

              <!-- Thông tin người đăng -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Thông tin người đăng</h2>
                
                <!-- User Card -->
                <div class="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
                  <!-- Avatar -->
                  <div class="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-white shadow-sm">
                    <img
                      v-if="finalAvatar"
                      :src="finalAvatar"
                      alt="avatar"
                      class="object-cover w-full h-full"
                    />
                  </div>

                  <!-- Contact Info -->
                  <div class="flex-1 min-w-0">
                    <!-- Name -->
                    <h3 class="text-base font-semibold text-gray-900 mb-3">
                      {{ post.userDTO.fullName }}
                    </h3>

                    <!-- Contact Details -->
                    <div class="space-y-2">
                      <!-- Email -->
                      <div class="flex items-center gap-2">
                        <Mail class="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span class="text-sm text-gray-600 truncate">{{ post.userDTO.email }}</span>
                      </div>

                      <!-- Phone -->
                      <div class="flex items-center gap-2">
                        <Phone class="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span class="text-sm text-gray-600">{{ post.userDTO.phone }}</span>
                      </div>
                    </div>

                    <!-- Zalo Button -->
                    <a
                      :href="`https://zalo.me/${post.userDTO.phone}`"
                      target="_blank"
                      class="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                      <img src="@/assets/zalo-icon.svg" alt="Zalo" class="w-4 h-4" />
                      Liên hệ qua Zalo
                    </a>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div>
                <h2 class="text-lg font-semibold text-gray-900 mb-3">Mô tả chi tiết</h2>
                <div class="prose prose-sm max-w-none">
                  <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ post.content }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PHẦN TÀI LIỆU -->
          <div v-if="documents && documents.length > 0">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div class="mb-6 border-l-4 border-indigo-500 pl-4">
                <h2 class="text-2xl font-bold text-gray-900 mb-1">Tài liệu đính kèm</h2>
                <p class="text-sm text-gray-600">{{ documents.length }} tài liệu • Click để tải về</p>
              </div>

              <div class="space-y-3">
                <div
                  v-for="(doc, index) in documents"
                  :key="doc.id"
                  class="relative flex items-start gap-4 p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-indigo-400 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  @click="handleDocumentClick(doc)"
                >
                  <!-- Gradient Background Overlay on Hover -->
                  <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <!-- Number Badge -->
                  <div class="relative flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {{ index + 1 }}
                  </div>

                  <!-- File Icon -->
                  <div
                    class="relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300"
                  >
                    <!-- PDF Icon -->
                    <img
                      v-if="doc.fileType && doc.fileType.includes('pdf')"
                      src="@/assets/fileLogo/pdf.svg"
                      alt="PDF"
                      class="w-8 h-8"
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
                      class="w-8 h-8"
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
                      class="w-8 h-8"
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
                      class="w-8 h-8"
                    />

                    <!-- Zip Icon -->
                    <img
                      v-else-if="
                        doc.fileType &&
                        doc.fileType.includes('x-zip-compressed')
                      "
                      src="@/assets/fileLogo/zip.png"
                      alt="Zip"
                      class="w-8 h-8"
                    />

                    <!-- Default File Icon -->
                    <svg
                      v-else
                      class="w-8 h-8 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 18h12V6l-4-4H4v16zm8-14v4h4l-4-4z" />
                    </svg>
                  </div>

                  <!-- File Info -->
                  <div class="relative flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-3 mb-2">
                      <h3 class="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 line-clamp-2">
                        {{ doc.fileName }}
                      </h3>
                      
                      <!-- Download Icon Button -->
                      <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 group-hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300">
                        <svg class="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-3 flex-wrap">
                      <!-- File Type Badge -->
                      <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors duration-300">
                        {{ getFileTypeText(doc.fileType || doc.fileName) }}
                      </span>
                      
                      <!-- Action Text -->
                      <span class="text-xs font-medium text-gray-400 group-hover:text-indigo-600 transition-colors duration-300 flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                        </svg>
                        Click để tải xuống
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments section -->
      <div class="w-full bg-gray-50 px-4 md:px-8 lg:px-12 pb-8">
        <div class="max-w-7xl mx-auto">
          <Comment v-if="post && post.id" :postId="post.id" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
// Import các thư viện Vue cần thiết
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

// Import layouts và components
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import Comment from "../../components/comment/Comment.vue";

// Import các API services
import { getDetailPost } from "@/apis/postService.js";
import { getImageByPost } from "@/apis/imageService.js";
import { getProfile } from "@/apis/authService.js";
import { downloadDoc } from "@/apis/documentService.js";
import { useAuthStore } from "@/stores/store";

// Import message notification
import { message } from "ant-design-vue";

// Import icons
import {
  Phone,
  Mail,
  Clock,
  Tag,
  GraduationCap,
} from "lucide-vue-next";

// Danh sách tài liệu đính kèm
const documents = ref([]);

// Router để lấy params từ URL
const route = useRoute();

// Thông tin bài đăng tài liệu
const post = ref(null);

// Thông tin người dùng hiện tại
const currentUser = ref(null);

// Hàm chuyển đổi định dạng ngày tháng
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

// Tính toán trạng thái hiển thị của bài đăng (Đã duyệt/Chờ duyệt/Bị khóa)
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

// Xử lý và format avatar để hiển thị (thêm prefix base64 nếu cần)
const finalAvatar = computed(() => {
  const avatar = post.value?.userDTO?.b64;
  if (avatar) {
    return avatar.startsWith("data:image")
      ? avatar
      : "data:image/png;base64," + avatar;
  }
  return null;
});

// Ảnh đại diện chính của tài liệu
const mainImage = ref("");

// Hàm lấy thông tin chi tiết bài đăng tài liệu từ API
async function fetchPost() {
  const id = route.params.id;
  try {
    const { data: result } = await getDetailPost(id);
    post.value = result;
    await loadMainImage(result.id);
    documents.value = result.documents || [];
  } catch (error) {
    console.error("Có lỗi khi tải tài liệu:", error);
  }
}

// Hàm tải ảnh đại diện của bài đăng
async function loadMainImage(postId) {
  try {
    const urls = await getImageByPost(postId);
    mainImage.value =
      Array.isArray(urls) && urls.length > 0
        ? urls[0]
        : "https://dummyimage.com/800x600/cccccc/000000.png&text=No+Image";
  } catch (err) {
    console.error("Lỗi khi tải ảnh:", err);
    mainImage.value =
      "https://dummyimage.com/800x600/cccccc/000000.png&text=No+Image";
  }
}

// Xử lý khi ảnh bị lỗi không tải được
function handleImageError(e) {
  e.target.src =
    "https://dummyimage.com/800x600/cccccc/000000.png&text=No+Image";
}

// Hàm xử lý khi click vào tài liệu để tải xuống
async function handleDocumentClick(doc) {
  try {
    console.log("💾 Tải tài liệu:", doc.file_name);
    console.log("🆔 Document ID:", doc.id);

    // Gọi API để tải tài liệu
    const response = await downloadDoc(doc.id);

    console.log("📡 Response:", response);
    console.log("📡 Response type:", typeof response);
    console.log("📡 Is Blob:", response instanceof Blob);

    let blob;
    let downloadFileName = doc.fileName;

    // Xử lý response để lấy blob data
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

    // Tạo link download tự động và kích hoạt
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFileName;
    link.style.display = "none";

    // Thêm link vào DOM, click tự động, sau đó xóa
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Giải phóng bộ nhớ sau khi tải xong
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

// Hàm lấy tên hiển thị loại file dựa trên fileType hoặc fileName
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

// Hàm lấy thông tin profile của người dùng đang đăng nhập
async function fetchProfile() {
  try {
    const response = await getProfile();
    currentUser.value = response.data;
  } catch (error) {
    console.error("Lỗi khi tải thông tin người dùng:", error);
  }
}

// Kiểm tra người dùng hiện tại có phải là chủ sở hữu bài đăng không
const isOwner = computed(() => {
  return (
    currentUser.value &&
    post.value &&
    post.value.userDTO &&
    currentUser.value.id === post.value.userDTO.id
  );
});

// Khi component được mount, tải dữ liệu tài liệu và thông tin người dùng
onMounted(() => {
  // Tải thông tin chi tiết tài liệu
  fetchPost();

  // Nếu đã đăng nhập, tải thông tin người dùng để kiểm tra quyền sở hữu
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
