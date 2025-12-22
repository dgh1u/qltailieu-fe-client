<template>
  <DefaultLayout>
    <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-8">
        <div class="bg-white rounded-2xl border border-gray-200 p-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
          <div class="pl-4">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Chỉnh sửa tài liệu</h1>
            <p class="mt-2 text-gray-600">Cập nhật thông tin tài liệu của bạn</p>
          </div>
        </div>
      </div>

      <!-- Main Form -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <!-- Classification Section -->
            <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Phân loại tài liệu</h2>
              </div>
              <div class="p-6 space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Loại tài liệu <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="formData.criteria.secondMotel"
                      class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300"
                    >
                      <option value="" disabled>Chọn loại tài liệu</option>
                      <option value="Giáo trình">Giáo trình</option>
                      <option value="Sách tham khảo">Sách tham khảo</option>
                      <option value="Khóa luận tốt nghiệp">Khóa luận tốt nghiệp</option>
                      <option value="Báo cáo thực tập">Báo cáo thực tập</option>
                      <option value="Nghiên cứu khoa học">Nghiên cứu khoa học</option>
                      <option value="Bài báo khoa học">Bài báo khoa học</option>
                      <option value="Tài liệu khác">Tài liệu khác</option>
                    </select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Chuyên ngành <span class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="relative">
                    <select
                      v-model="formData.criteria.major"
                      class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300"
                    >
                      <option value="" disabled>Chọn chuyên ngành</option>
                      <option value="Thú y">Thú y</option>
                      <option value="Chăn nuôi - Thủy sản">Chăn nuôi - Thủy sản</option>
                      <option value="Cơ điện">Cơ điện</option>
                      <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                      <option value="Kinh tế">Kinh tế</option>
                      <option value="Công nghệ sinh học">Công nghệ sinh học</option>
                      <option value="Công nghệ thực phẩm">Công nghệ thực phẩm</option>
                      <option value="Nông học">Nông học</option>
                      <option value="Khoa học môi trường">Khoa học môi trường</option>
                      <option value="Xã hội học">Xã hội học</option>
                      <option value="Ngôn ngữ">Ngôn ngữ</option>
                      <option value="Du lịch">Du lịch</option>
                      <option value="Sư phạm">Sư phạm</option>
                      <option value="Quản lý đất đai">Quản lý đất đai</option>
                    </select>
                    <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Description Section -->
            <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Thông tin mô tả</h2>
              </div>
              <div class="p-6 space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Tiêu đề <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="Nhập tiêu đề tài liệu (10-50 ký tự)"
                    class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2">
                    Nội dung mô tả <span class="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    v-model="formData.content"
                    placeholder="Mô tả chi tiết về tài liệu (50-500 ký tự)"
                    rows="6"
                    class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all hover:border-gray-300 resize-y"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Image Section -->
            <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Hình ảnh đại diện</h2>
              </div>
              <div class="p-6">
                <div v-if="!imageBox" class="relative border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 group">
                  <div class="flex flex-col items-center">
                    <FolderUp class="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:scale-110" />
                    <p class="mt-3 text-base font-semibold text-gray-700">Chọn hình ảnh</p>
                    <p class="mt-1 text-sm text-gray-500">PNG, JPG (Max 10MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleFileChange"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                <div v-else class="relative rounded-xl overflow-hidden border border-gray-200 shadow-md">
                  <img :src="imageBox.preview" alt="Preview" class="w-full h-80 object-cover" />
                  <button
                    @click="removeImage"
                    class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-white text-red-500 border-2 border-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Trash2 :size="16" />
                    <span>Xóa ảnh</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Documents Section -->
            <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Tài liệu đính kèm</h2>
              </div>
              <div class="p-6 space-y-4">
                <!-- Existing Documents -->
                <div v-if="existingDocuments.length > 0" class="space-y-3">
                  <p class="text-sm font-semibold text-gray-900">Tài liệu hiện có</p>
                  <div
                    v-for="doc in existingDocuments"
                    :key="doc.id"
                    class="flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all"
                  >
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                      <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText :size="20" />
                      </div>
                      <span class="text-sm font-semibold text-gray-900 truncate">{{ doc.fileName }}</span>
                    </div>
                    <button
                      @click="removeExistingDocument(doc.id)"
                      class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </div>

                <!-- Upload New Documents -->
                <label class="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 group">
                  <FolderUp class="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-all" />
                  <span class="mt-2 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Thêm tài liệu mới</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.ppt,.pptx"
                    @change="handleDocumentChange"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>

                <!-- New Documents -->
                <div v-if="selectedDocuments.length > 0" class="space-y-3">
                  <div
                    v-for="(doc, index) in selectedDocuments"
                    :key="index"
                    class="flex items-center justify-between p-4 bg-green-50 border-2 border-green-300 rounded-xl hover:border-green-400 transition-all"
                  >
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                      <div class="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText :size="20" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-900 truncate">{{ doc.name }}</p>
                        <p class="text-xs text-gray-500">{{ formatFileSize(doc.size) }}</p>
                      </div>
                    </div>
                    <button
                      @click="removeDocument(index)"
                      class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <button
            @click="handleUpdatePost"
            :disabled="loading"
            class="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            <div v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span v-if="!loading">Cập nhật tài liệu</span>
            <span v-else>Đang xử lý...</span>
          </button>
          
          <router-link
            :to="`/post/document/${postId}`"
            class="flex-1 flex items-center justify-center px-8 py-4 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Hủy bỏ
          </router-link>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import { message } from "ant-design-vue";
import { FolderUp, Trash2, ChevronDown, FileText } from "lucide-vue-next";
import { updatePost, getDetailPost } from "@/apis/postService.js";
import {
  getImageDTOByPost,
  deleteImagesByPost,
  uploadMultipleImages,
} from "@/apis/imageService.js";
import {
  uploadDocument,
  deleteSingleDocument,
} from "@/apis/documentService.js";


const openHoursValue = ref(null);
const existingDocuments = ref([]);
const selectedDocuments = ref([]);

function base64ToFile(base64, fileName, fileType) {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new File([intArray], fileName, { type: fileType });
}

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
const loading = ref(false);

const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const imageBox = ref(null);
const documentsToDelete = ref([]);


onMounted(async () => {
  try {
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

    const imgRes = await getImageDTOByPost(postId);
    console.log("Response từ getImageDTOByPost:", imgRes);

    if (imgRes && Array.isArray(imgRes) && imgRes.length > 0) {
      const img = imgRes[0];
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
    message.error("Không thể tải dữ liệu tài liệu.");
  }
});


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

function removeExistingDocument(docId) {
  existingDocuments.value = existingDocuments.value.filter(
    (doc) => doc.id !== docId
  );

  if (!documentsToDelete.value.includes(docId)) {
    documentsToDelete.value.push(docId);
  }

  console.log(`Đã đánh dấu xóa tài liệu ${docId}`);
  console.log("Danh sách sẽ xóa:", documentsToDelete.value);
  message.success("Đã xóa tài liệu khỏi danh sách");
}

function removeDocument(index) {
  selectedDocuments.value.splice(index, 1);
  console.log(`Đã xóa tài liệu mới tại vị trí ${index}`);
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      message.error("Dung lượng ảnh không được vượt quá 10MB");
      e.target.value = null;
      return;
    }

    if (imageBox.value && !imageBox.value.isExisting) {
      URL.revokeObjectURL(imageBox.value.preview);
    }

    imageBox.value = {
      preview: URL.createObjectURL(file),
      file: file,
      isExisting: false,
    };
  }
  e.target.value = null;
}

function removeImage() {
  if (imageBox.value) {
    if (imageBox.value.preview && !imageBox.value.isExisting) {
      URL.revokeObjectURL(imageBox.value.preview);
    }
    imageBox.value = null;
  }
}

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


async function handleUpdatePost() {
  if (!formData.title.trim()) {
    message.error("Tiêu đề không được để trống");
    return;
  }
  if (formData.title.trim().length < 10 || formData.title.trim().length > 50) {
    message.error("Tiêu đề phải từ 10 đến 50 ký tự");
    return;
  }

  if (!formData.content.trim()) {
    message.error("Nội dung mô tả không được để trống");
    return;
  }
  if (formData.content.trim().length < 50 || formData.content.trim().length > 500) {
    message.error("Nội dung mô tả phải từ 50 đến 500 ký tự");
    return;
  }

  loading.value = true;
  try {
    console.log("Cập nhật tài liệu với payload:", buildPayload());
    await updatePost(postId, buildPayload());
    console.log("Cập nhật tài liệu thành công.");

    await deleteImagesByPost(postId);

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

    if (documentsToDelete.value.length > 0) {
      console.log("Xóa các tài liệu:", documentsToDelete.value);

      for (const docId of documentsToDelete.value) {
        try {
          await deleteSingleDocument(docId);
          console.log(`Đã xóa tài liệu ${docId} thành công`);
        } catch (error) {
          console.error(`Lỗi khi xóa tài liệu ${docId}:`, error);
        }
      }
    }

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

    documentsToDelete.value = [];

    message.success("Cập nhật tin thành công!");
    if (formData.criteria.motel === "TAI_LIEU") {
      router.push(`/post/document/${postId}`);
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật tài liệu:", error);
    message.error("Đã có lỗi xảy ra khi cập nhật tin.");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Custom styles for native select dropdown arrow */
select {
  background-image: none;
}
</style>
