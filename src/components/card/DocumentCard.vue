<template>
  <div class="document-card group relative">
    <!-- Main Card Container -->
    <div
      class="card-inner bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <!-- Image Section with Overlay -->
      <div class="relative h-56 overflow-hidden">
        <img
          :src="thumbnailImage"
          alt="preview"
          @error="onImgError"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <!-- Simple Overlay -->
        <div
          class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>

        <!-- Category Badge -->
        <div class="absolute top-3 left-3">
          <div
            class="flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-lg shadow-sm"
          >
            <Tag class="w-4 h-4 text-gray-600" />
            <span class="text-xs font-medium text-gray-700">{{
              post.criteriaDTO?.secondMotel || "Tài liệu"
            }}</span>
          </div>
        </div>

        <!-- Author Avatar -->
        <div class="absolute top-3 right-3">
          <div class="relative">
            <div
              class="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shadow-sm"
            >
              <img
                v-if="finalAvatar"
                :src="finalAvatar"
                alt="avatar"
                @error="onImgError"
                class="object-cover w-full h-full"
              />
              <div
                v-else
                class="w-full h-full bg-gray-200 flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 2L3 7V9H21ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- View Count Badge -->
        <div
          class="absolute bottom-3 right-3 bg-white/90 text-gray-700 px-2 py-1 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Eye class="w-3 h-3" />
          <span class="text-xs">{{
            Math.floor(Math.random() * 1000) + 100
          }}</span>
        </div>
      </div>

      <!-- Content Section -->
      <div class="p-5 space-y-3">
        <!-- Title with Simple Typography -->
        <div class="space-y-2">
          <h3
            class="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-gray-600 transition-colors duration-300"
          >
            {{ post.title }}
          </h3>

          <!-- Major Badge -->
          <div class="flex items-center gap-2">
            <div
              class="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
            >
              <GraduationCap class="w-4 h-4 text-gray-500" />
              <span class="text-sm font-medium text-gray-600">{{
                post.criteriaDTO?.major || "N/A"
              }}</span>
            </div>
          </div>
        </div>

        <!-- Metadata Row -->
        <div
          class="flex items-center justify-between pt-3 border-t border-gray-100"
        >
          <!-- Date/Time -->
          <div class="flex items-center gap-2 text-gray-500">
            <Clock class="w-4 h-4" />
            <span class="text-xs font-medium">{{ formatDate(postDate) }}</span>
          </div>

          <!-- Action Button -->
          <div class="flex items-center gap-2">
            <button
              class="flex items-center gap-1.5 bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-300"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      <!-- Simple Hover Border -->
      <div
        class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200 transition-colors duration-300 pointer-events-none"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted, watch } from "vue";
import {
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Clock,
  Truck,
  Tag,
  GraduationCap,
  Eye,
} from "lucide-vue-next";
import { getImageByPost } from "@/apis/imageService";

const props = defineProps({ post: { type: Object, required: true } });
const placeholder =
  "https://dummyimage.com/400x300/cccccc/000000.png&text=No+Image";
const fetchedImages = ref([]);

// Lấy danh sách hình ảnh của bài đăng
async function fetchImages() {
  if (!props.post.id) return;
  try {
    const images = await getImageByPost(props.post.id);
    fetchedImages.value = Array.isArray(images) ? images : [];
  } catch {
    fetchedImages.value = [];
  }
}

onMounted(fetchImages);
watch(() => props.post.id, fetchImages);

// Lấy hình ảnh đầu tiên làm thumbnail hoặc sử dụng ảnh placeholder
const thumbnailImage = computed(() => {
  return fetchedImages.value.length > 0 ? fetchedImages.value[0] : placeholder;
});

// Xử lý lỗi khi không tải được hình ảnh
function onImgError(event) {
  console.error("⚠️ Image failed to load:", event.target.src);
}

// Xử lý hiển thị avatar người dùng
const finalAvatar = computed(() => {
  const avatar = props.post.userDTO?.b64;
  return avatar
    ? avatar.startsWith("data:image")
      ? avatar
      : `data:image/png;base64,${avatar}`
    : null;
});

// Smart date field detection
const postDate = computed(() => {
  const post = props.post;
  // Thử các tên trường phổ biến cho ngày tạo
  return (
    post.createdAt ||
    post.created_at ||
    post.createAt ||
    post.create_at ||
    post.date ||
    post.updatedAt ||
    post.updated_at ||
    null
  );
});

// Format date for display with better handling
function formatDate(dateString) {
  if (!dateString) return "N/A";

  try {
    let date;

    // Xử lý các định dạng ngày khác nhau
    if (typeof dateString === "string") {
      // Nếu là ISO string hoặc timestamp
      if (dateString.includes("T") || dateString.includes("-")) {
        date = new Date(dateString);
      }
      // Nếu là timestamp dạng số nhưng dưới dạng string
      else if (/^\d+$/.test(dateString)) {
        date = new Date(parseInt(dateString));
      }
      // Nếu là timestamp với milliseconds
      else {
        date = new Date(dateString);
      }
    }
    // Nếu là số (timestamp)
    else if (typeof dateString === "number") {
      // Nếu timestamp ít hơn 13 digits, có thể là seconds thay vì milliseconds
      date =
        dateString.toString().length <= 10
          ? new Date(dateString * 1000)
          : new Date(dateString);
    } else {
      date = new Date(dateString);
    }

    // Kiểm tra xem date có hợp lệ không
    if (isNaN(date.getTime())) {
      console.warn("Invalid date:", dateString);
      return "N/A";
    }

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error, dateString);
    return "N/A";
  }
}

// Debug function to check post structure
function debugPost() {
  console.log("Post object:", props.post);
  console.log("Available date fields:", {
    createdAt: props.post.createdAt,
    created_at: props.post.created_at,
    createAt: props.post.createAt,
    create_at: props.post.create_at,
    date: props.post.date,
    updatedAt: props.post.updatedAt,
    updated_at: props.post.updated_at,
  });
}

// Call debug on mount
onMounted(() => {
  debugPost();
});
</script>

<style scoped>
/* Simple Card Container */
.document-card {
  position: relative;
  height: auto;
  min-height: 380px;
}

.card-inner {
  position: relative;
  z-index: 1;
  background: #ffffff;
}

/* Line Clamp Utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

/* Simple Hover Animations */
.group:hover .card-inner {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Image Hover Effects */
.group:hover img {
  filter: brightness(1.05);
}

/* Button Hover */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .document-card {
    min-height: 360px;
  }

  .h-56 {
    height: 11rem;
  }

  .p-5 {
    padding: 1rem;
  }

  .text-lg {
    font-size: 1rem;
  }

  .group:hover .card-inner {
    transform: translateY(-2px);
  }
}

/* Focus States */
.document-card:focus-within {
  outline: 2px solid #6b7280;
  outline-offset: 2px;
}

button:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

/* Clean transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
