<template>
  <div class="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 h-[400px] border border-gray-200">
    <!-- Thumbnail Image Container -->
    <div class="w-full h-[300px]">
      <img
        :src="thumbnailImage"
        alt="preview"
        @error="onImgError"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Content Section -->
    <div class="flex flex-col p-4">
      <!-- Title -->
      <span class="line-clamp-1 text-base font-semibold text-gray-800 mb-1">
        {{ post.title }}
      </span>

      <!-- Stats and Avatar Container -->
      <div class="flex justify-between items-start">
        <!-- Stats Column -->
        <div class="flex flex-col text-xs text-gray-500">
          <!-- Major -->
          <div class="flex items-center gap-1 mb-1">
            <GraduationCap class="w-4 h-4" />
            <span>{{ post.accomodationDTO?.major || "N/A" }}</span>
          </div>
          <!-- Type -->
          <div class="flex items-center gap-1">
            <Tag class="w-3 h-4" />
            <span>{{ post.accomodationDTO?.secondMotel }}</span>
          </div>
        </div>

        <!-- Avatar Column -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              v-if="finalAvatar"
              :src="finalAvatar"
              alt="avatar"
              @error="onImgError"
              class="object-cover w-full h-full"
            />
          </div>
          
        </div>
      </div>
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
  Eye
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

</script>

<style scoped>
/* Update existing styles */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
