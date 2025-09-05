<template>
  <DefaultLayout>
    <div class="create-post max-w-3xl mx-auto p-4 space-y-4">
      <!-- Tiêu đề trang -->
      <div class="block p-4 items-center justify-center flex">
        <span class="font-bold text-3xl text-sky-500">Cập nhật tin đăng</span>
      </div>

      <!-- PHẦN HÌNH THỨC -->
      <div class="block bg-white p-4 pb-6 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Phân loại</span>
        </div>

        <!-- Selection phụ cho QUAN_AN -->
        <div v-if="formData.criteria.motel === 'TAI_LIEU'">
          <label>Loại tài liệu <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.criteria.secondMotel"
              placeholder="Chọn loại tài liệu"
              class="w-full"
            >
              <a-select-option value="Giáo trình">Giáo trình</a-select-option>
              <a-select-option value="Sách tham khảo"
                >Sách tham khảo</a-select-option
              >
              <a-select-option value="Khóa luận tốt nghiệp"
                >Khóa luận tốt nghiệp</a-select-option
              >
              <a-select-option value="Báo cáo thực tập"
                >Báo cáo thực tập</a-select-option
              >
              <a-select-option value="Nghiên cứu khoa học"
                >Nghiên cứu khoa học</a-select-option
              >
              <a-select-option value="Bài báo khoa học"
                >Bài báo khoa học</a-select-option
              >
              <a-select-option value="Tài liệu khác"
                >Tài liệu khác</a-select-option
              >
            </a-select>
          </div>
        </div>
        <!-- Selection phụ cho QUAN_AN -->
        <div v-if="formData.criteria.motel === 'TAI_LIEU'" class="mt-3">
          <label>Chuyên ngành <span class="text-red-500">*</span> </label>
          <div class="flex rounded-lg mt-1">
            <a-select
              v-model:value="formData.criteria.major"
              placeholder="Chọn chuyên ngành"
              class="w-full"
            >
              <a-select-option value="Thú y">Thú y</a-select-option>
              <a-select-option value="Chăn nuôi - Thủy sản"
                >Chăn nuôi - Thủy sản</a-select-option
              >
              <a-select-option value="Cơ điện">Cơ điện</a-select-option>
              <a-select-option value="Công nghệ thông tin"
                >Công nghệ thông tin</a-select-option
              >
              <a-select-option value="Kinh tế">Kinh tế</a-select-option>
              <a-select-option value="Công nghệ sinh học"
                >Công nghệ sinh học</a-select-option
              >
              <a-select-option value="Công nghệ thực phẩm"
                >Công nghệ thực phẩm</a-select-option
              >
              <a-select-option value="Nông học">Nông học</a-select-option>
              <a-select-option value="Khoa học môi trường"
                >Khoa học môi trường</a-select-option
              >
              <a-select-option value="Xã hội học">Xã hội học</a-select-option>
              <a-select-option value="Ngôn ngữ">Ngôn ngữ</a-select-option>
              <a-select-option value="Du lịch">Du lịch</a-select-option>
              <a-select-option value="Sư phạm">Sư phạm</a-select-option>
              <a-select-option value="Quản lý đất đai"
                >Quản lý đất đai</a-select-option
              >
              <a-select-option value="Sư phạm">Sư phạm</a-select-option>
            </a-select>
          </div>
        </div>
      </div>

      <!-- PHẦN THÔNG TIN MÔ TẢ -->
      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2">
          <span class="font-bold text-base">Thông tin mô tả</span>
        </div>
        <div class="py-2">
          <label>Tiêu đề <span class="text-red-500">*</span></label>
          <div class="flex border border-gray-300 rounded-lg mt-1">
            <input
              v-model="formData.title"
              type="text"
              placeholder="Nhập tiêu đề"
              class="w-full p-2 border-none outline-none rounded-lg"
            />
          </div>
        </div>
        <div class="py-2">
          <span class="block">
            Nội dung mô tả <span class="text-red-500">*</span>
          </span>
          <div class="flex border border-gray-300 rounded-lg mt-1">
            <textarea
              v-model="formData.content"
              placeholder="Nhập nội dung mô tả"
              rows="4"
              class="w-full p-2 mt-1 border-none outline-none rounded-lg"
            />
          </div>
        </div>
      </div>
      <!-- PHẦN HÌNH ẢNH (UPLOAD, PREVIEW, XOÁ) -->
      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2 pb-6">
          <span class="font-bold text-base">Hình ảnh</span>
        </div>

        <!-- Single Image Upload Box -->
        <div class="mb-4">
          <div
            v-if="!imageBox"
            class="relative border-2 border-dashed border-sky-500 rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer hover:bg-sky-50 transition"
          >
            <FolderUp class="w-12 h-12 text-sky-500" />
            <span class="mt-2 text-gray-500">Tải ảnh từ thiết bị</span>
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div v-else class="relative h-40 rounded-lg overflow-hidden">
            <img
              :src="imageBox.preview"
              class="w-full h-full object-cover rounded-lg"
            />
            <button
              @click.stop="removeImage"
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 px-2 py-1 bg-white bg-opacity-70 rounded-md text-red-500 hover:text-red-600"
            >
              <Trash2 class="w-4 h-4" />
              <span class="text-xs">Xóa</span>
            </button>
          </div>
        </div>

        <small class="text-gray-500">Dung lượng ảnh tối đa 10MB</small>
      </div>

      <!-- PHẦN TÀI LIỆU -->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="py-2 pb-6">
          <span class="font-bold text-base">Tài liệu đính kèm</span>
        </div>

        <!-- Tài liệu hiện có -->
        <div v-if="existingDocuments.length > 0" class="mb-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">
            Tài liệu hiện có:
          </h4>
          <div class="grid grid-cols-1 gap-2">
            <div
              v-for="doc in existingDocuments"
              :key="doc.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 18h12V6l-4-4H4v16z" />
                  </svg>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-900">
                    {{ doc.fileName }}
                  </span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="removeExistingDocument(doc.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Upload tài liệu mới -->
        <div class="mb-4">
          <label
            class="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
          >
            <span class="flex items-center space-x-2">
              <FolderUp class="w-6 h-6 text-gray-600" />
              <span class="font-medium text-gray-600"> Thêm tài liệu mới </span>
            </span>
            <input
              type="file"
              name="documents"
              class="hidden"
              multiple
              accept=".pdf,.docx,.ppt,.pptx"
              @change="handleDocumentChange"
            />
          </label>
        </div>

        <!-- Tài liệu mới được chọn -->
        <div v-if="selectedDocuments.length > 0" class="grid grid-cols-1 gap-2">
          <div
            v-for="(doc, index) in selectedDocuments"
            :key="index"
            class="flex items-center justify-between p-3 bg-green-50 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-green-100 rounded flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 18h12V6l-4-4H4v16z" />
                </svg>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-900">
                  {{ doc.name }} <span class="text-green-600">(mới)</span>
                </span>
                <span class="text-xs text-gray-500 block">
                  {{ formatFileSize(doc.size) }}
                </span>
              </div>
            </div>
            <button
              @click="removeDocument(index)"
              class="text-red-500 hover:text-red-700"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- NÚT SUBMIT VÀ TRỞ VỀ -->
      <div class="text-white font-semibold">
        <button
          class="submit-btn bg-sky-500 px-4 py-2 rounded hover:bg-sky-600 w-full flex items-center justify-center"
          :disabled="loading"
          @click="handleUpdatePost"
        >
          <div
            v-if="loading"
            class="loader mr-2 animate-spin rounded-full h-5 w-5 border-b-2 border-white"
          ></div>
          <span>
            <span v-if="!loading">Cập nhật bài đăng</span>
            <span v-if="loading">Đang cập nhật...</span>
          </span>
        </button>
        <router-link
          :to="
            formData.criteria.motel === 'TAI_LIEU'
              ? `/post/document/${postId}`
              : `/post/roommate/${postId}`
          "
          class="bg-gray-500 hover:bg-gray-600 w-full py-2 rounded-xl mt-2 flex items-center justify-center text-white"
        >
          <span class="font-medium">Trở về</span>
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import { Select, message } from "ant-design-vue";
import { Check as CheckIcon, FolderUp, Trash2 } from "lucide-vue-next";
import dayjs from "dayjs";
import { updatePost, getDetailPost } from "@/apis/postService.js";
import {
  getImageDTOByPost,
  deleteImagesByPost,
  uploadMultipleImages,
} from "@/apis/imageService.js";

import {
  getDocumentsByPost,
  uploadDocument,
  downloadDocument as downloadDoc,
  deleteSingleDocument,
} from "@/apis/documentService.js";

const openHoursValue = ref(null);
// Thêm vào reactive data
const existingDocuments = ref([]);
const selectedDocuments = ref([]);

/**
 * Hàm chuyển base64 -> File
 */
function base64ToFile(base64, fileName, fileType) {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new File([intArray], fileName, { type: fileType });
}

const ASelect = Select;
const ASelectOption = ASelect.Option;

const formData = reactive({
  title: "",
  content: "",
  criteria: {
    id: null,
    motel: "TAI_LIEU",

    secondMotel: "",

    major: "",
  },
});

const mapAddress = ref("");
const addressTimer = ref(null);
const loading = ref(false);

watch(
  () => formData.criteria.address,
  (newAddress) => {
    if (addressTimer.value) clearTimeout(addressTimer.value);
    addressTimer.value = setTimeout(() => {
      mapAddress.value = newAddress;
    }, 1000);
  }
);

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

// Replace imageBoxes array with single imageBox
const imageBox = ref(null);

/**
 * Kiểm tra xem đã đủ 4 ảnh chưa
 */
function isAllBoxesFilled() {
  return imageBoxes.value.every((box) => box !== null);
}

/**
 * onMounted: Lấy chi tiết bài đăng + mảng ImageDTO (base64) ảnh cũ
 */
onMounted(async () => {
  try {
    // 1) Lấy detail post
    const resp = await getDetailPost(postId);
    console.log("Detail post:", resp.data);
    const data = resp.data;

    formData.title = data.title;
    formData.content = data.content;

    if (data.criteriaDTO) {
      Object.assign(formData.criteria, data.criteriaDTO);
      if (data.criteriaDTO.district && data.criteriaDTO.district.id) {
        formData.criteria.idDistrict = data.criteriaDTO.district.id;
      }
    }

    if (data.criteriaDTO && data.criteriaDTO.openHours) {
      // Parse giờ mở cửa từ string để hiển thị trong time picker
      const timeStr = data.criteriaDTO.openHours;
      const parts = timeStr.split("-").map((t) => t.trim());

      if (parts.length === 2) {
        openHoursValue.value = [
          dayjs(`2023-01-01 ${parts[0]}`),
          dayjs(`2023-01-01 ${parts[1]}`),
        ];
      }
    }

    // 2) Load ảnh cũ
    const imgRes = await getImageDTOByPost(postId);
    console.log("Response từ getImageDTOByPost:", imgRes);

    if (imgRes && Array.isArray(imgRes) && imgRes.length > 0) {
      const img = imgRes[0]; // Get only first image
      const previewUrl = `data:${img.fileType};base64,${img.uri}`;
      imageBox.value = {
        id: img.id,
        fileName: img.fileName,
        fileType: img.fileType,
        base64: img.uri,
        preview: previewUrl,
        isExisting: true,
      };
    }

    // ⭐ 3) THÊM PHẦN NÀY - Load documents từ getDetailPost
    console.log("📄 Loading documents...");

    if (data.documents && Array.isArray(data.documents)) {
      existingDocuments.value = data.documents;
      console.log("📄 Documents loaded:", existingDocuments.value);
      console.log("📄 Number of documents:", existingDocuments.value.length);
    } else {
      console.log("📄 No documents found in response");
      existingDocuments.value = [];
    }
  } catch (error) {
    console.error("Lỗi khi tải detail post:", error);
    message.error("Không thể tải dữ liệu bài đăng.");
  }
});

// Thêm functions
function handleDocumentChange(event) {
  const files = Array.from(event.target.files);
  const allowedTypes = [".pdf", ".docx", ".ppt", ".pptx"];
  const validFiles = files.filter((file) => {
    const fileName = file.name.toLowerCase();
    return allowedTypes.some((type) => fileName.endsWith(type));
  });

  if (validFiles.length !== files.length) {
    message.error("Chỉ cho phép upload file PDF, Word, PowerPoint");
    return;
  }

  selectedDocuments.value = [...selectedDocuments.value, ...validFiles];
  event.target.value = "";
}

// ⭐ THÊM: Mảng lưu ID các tài liệu sẽ bị xóa
const documentsToDelete = ref([]);

// ⭐ THAY ĐỔI: Function xóa tài liệu cũ - CHỈ xóa trên giao diện
function removeExistingDocument(docId) {
  // 1. Xóa khỏi danh sách hiển thị
  existingDocuments.value = existingDocuments.value.filter(
    (doc) => doc.id !== docId
  );

  // 2. Thêm vào danh sách "sẽ xóa"
  if (!documentsToDelete.value.includes(docId)) {
    documentsToDelete.value.push(docId);
  }

  console.log(`Đã đánh dấu xóa tài liệu ${docId}`);
  console.log("Danh sách sẽ xóa:", documentsToDelete.value);
  message.success("Đã xóa tài liệu khỏi danh sách");
}

// Function xóa tài liệu mới - giữ nguyên
function removeDocument(index) {
  selectedDocuments.value.splice(index, 1);
  console.log(`Đã xóa tài liệu mới tại vị trí ${index}`);
}

async function downloadDocument(docId) {
  try {
    const response = await downloadDoc(docId);
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "document");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    message.error("Lỗi khi tải tài liệu");
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Khi user chọn file mới cho một box cụ thể
 */
function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      message.error("Dung lượng ảnh không được vượt quá 10MB");
      e.target.value = null;
      return;
    }

    // If there's an existing image, revoke its URL
    if (imageBox.value && !imageBox.value.isExisting) {
      URL.revokeObjectURL(imageBox.value.preview);
    }

    // Set new image
    imageBox.value = {
      preview: URL.createObjectURL(file),
      file: file,
      isExisting: false,
    };
  }
  e.target.value = null;
}

/**
 * Xóa ảnh ở một box cụ thể
 */
function removeImage() {
  if (imageBox.value) {
    if (imageBox.value.preview && !imageBox.value.isExisting) {
      URL.revokeObjectURL(imageBox.value.preview);
    }
    imageBox.value = null;
  }
}

/**
 * Xây dựng payload updatePost
 */
function buildPayload() {
  return {
    title: formData.title,
    content: formData.content,
    criteria: {
      id: formData.criteria.id,

      motel: formData.criteria.motel,

      secondMotel: formData.criteria.secondMotel,

      major: formData.criteria.major,
    },
  };
}

const handleTimeChange = (time) => {
  if (time && Array.isArray(time) && time.length === 2) {
    const formatTime = (timeValue) => {
      if (!timeValue) return "";
      const date = new Date(timeValue);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const startTime = formatTime(time[0]);
    const endTime = formatTime(time[1]);

    // Lưu trực tiếp dưới dạng chuỗi
    formData.criteria.openHours = `${startTime} - ${endTime}`;
  }
};

/**
 * Khi nhấn "Cập nhật bài đăng"
 */
async function handleUpdatePost() {
  {
    // Validate tiêu đề:
    if (!formData.title.trim()) {
      message.error("Tiêu đề không được để trống");
      return;
    }
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 50
    ) {
      message.error("Tiêu đề phải từ 10 đến 50 ký tự");
      return;
    }

    // Validate nội dung mô tả:
    if (!formData.content.trim()) {
      message.error("Nội dung mô tả không được để trống");
      return;
    }
    if (
      formData.content.trim().length < 50 ||
      formData.content.trim().length > 500
    ) {
      message.error("Nội dung mô tả phải từ 50 đến 500 ký tự");
      return;
    }
    if (!formData.criteria.price) {
      message.error("Giá cho thuê không được để trống");
      return;
    }
    if (!formData.criteria.acreage) {
      message.error("Diện tích không được để trống");
      return;
    }
    if (!formData.criteria.electricPrice) {
      message.error("Giá điện không được để trống");
      return;
    }
    if (!formData.criteria.waterPrice) {
      message.error("Giá nước không được để trống");
      return;
    }
    if (!formData.criteria.idDistrict) {
      message.error("Khu vực không được để trống");
      return;
    }
    if (!formData.criteria.address.trim()) {
      message.error("Địa chỉ không được để trống");
      return;
    }
  }

  loading.value = true;
  try {
    console.log("Cập nhật bài đăng với payload:", buildPayload());
    await updatePost(postId, buildPayload());
    console.log("Cập nhật bài đăng thành công.");

    // Xoá toàn bộ ảnh cũ trên server
    await deleteImagesByPost(postId);

    // Upload new image
    if (imageBox.value) {
      const fileToUpload = imageBox.value.isExisting
        ? base64ToFile(
            imageBox.value.base64,
            imageBox.value.fileName,
            imageBox.value.fileType
          )
        : imageBox.value.file;

      await uploadMultipleImages(postId, [fileToUpload]);
    }

    // ⭐ XỬ LÝ TÀI LIỆU: Xóa những file đã đánh dấu
    if (documentsToDelete.value.length > 0) {
      console.log("Xóa các tài liệu:", documentsToDelete.value);

      // Xóa từng tài liệu một
      for (const docId of documentsToDelete.value) {
        try {
          await deleteSingleDocument(docId);
          console.log(`Đã xóa tài liệu ${docId} thành công`);
        } catch (error) {
          console.error(`Lỗi khi xóa tài liệu ${docId}:`, error);
          // Tiếp tục xóa các file khác dù có lỗi
        }
      }
    }

    // Upload tài liệu mới (nếu có)
    if (selectedDocuments.value.length > 0) {
      console.log("Upload tài liệu mới:", selectedDocuments.value);
      for (const doc of selectedDocuments.value) {
        try {
          await uploadDocument(postId, doc);
          console.log(`Đã upload ${doc.name} thành công`);
        } catch (error) {
          console.error(`Lỗi upload ${doc.name}:`, error);
        }
      }
    }

    // Reset danh sách xóa sau khi hoàn thành
    documentsToDelete.value = [];

    message.success("Cập nhật tin thành công!");
    if (formData.criteria.motel === "TAI_LIEU") {
      router.push(`/post/document/${postId}`);
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật bài đăng:", error);
    message.error("Đã có lỗi xảy ra khi cập nhật tin.");
  } finally {
    loading.value = false;
  }
}

/**
 * Toggle feature
 */
function toggleFeature(featureValue) {
  formData.criteria[featureValue] = !formData.criteria[featureValue];
  console.log("Toggle feature:", featureValue, formData.criteria[featureValue]);
}
</script>

<style scoped>
.submit-btn:hover {
  background-color: #2980b9;
}
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
