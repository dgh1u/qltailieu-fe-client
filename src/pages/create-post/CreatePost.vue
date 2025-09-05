<template>
  <ProfileLayout>
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div class="max-w-5xl mx-auto">
        <!-- Header Section -->
        <div
          class="text-center mb-8"
          data-aos="fade-down"
          data-aos-duration="600"
        >
      
          <h1 class="text-4xl font-bold text-gray-800 mb-2">
            Đăng tải tài liệu
          </h1>
          <p class="text-gray-600 text-lg">
            Chia sẻ tài liệu học tập với cộng đồng VNUA
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content - Left Side -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Document Category Card -->
            <div
              class="bg-white rounded-3xl shadow-xl p-8"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div class="flex items-center mb-6">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">
                  Phân loại tài liệu
                </h2>
              </div>

              <div
                v-if="formData.criteria.motel === 'TAI_LIEU'"
                class="space-y-6"
              >
                <div>
                  <label
                    class="flex items-center text-sm font-semibold text-gray-700 mb-3"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Loại tài liệu <span class="text-red-500">*</span>
                  </label>
                  <a-select
                    v-model:value="formData.criteria.secondMotel"
                    placeholder="Chọn loại tài liệu"
                    class="w-full"
                    size="large"
                  >
                    <a-select-option value="Giáo trình"
                      >📚 Giáo trình</a-select-option
                    >
                    <a-select-option value="Sách tham khảo"
                      >📖 Sách tham khảo</a-select-option
                    >
                    <a-select-option value="Khóa luận tốt nghiệp"
                      >🎓 Khóa luận tốt nghiệp</a-select-option
                    >
                    <a-select-option value="Báo cáo thực tập"
                      >📝 Báo cáo thực tập</a-select-option
                    >
                    <a-select-option value="Nghiên cứu khoa học"
                      >🔬 Nghiên cứu khoa học</a-select-option
                    >
                    <a-select-option value="Bài báo khoa học"
                      >📄 Bài báo khoa học</a-select-option
                    >
                    <a-select-option value="Tài liệu khác"
                      >📋 Tài liệu khác</a-select-option
                    >
                  </a-select>
                </div>

                <div>
                  <label
                    class="flex items-center text-sm font-semibold text-gray-700 mb-3"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      ></path>
                    </svg>
                    Chuyên ngành <span class="text-red-500">*</span>
                  </label>
                  <a-select
                    v-model:value="formData.criteria.major"
                    placeholder="Chọn chuyên ngành"
                    class="w-full"
                    size="large"
                  >
                    <a-select-option value="Thú y">🐾 Thú y</a-select-option>
                    <a-select-option value="Chăn nuôi - Thủy sản"
                      >🐄 Chăn nuôi - Thủy sản</a-select-option
                    >
                    <a-select-option value="Cơ điện"
                      >⚙️ Cơ điện</a-select-option
                    >
                    <a-select-option value="Công nghệ thông tin"
                      >💻 Công nghệ thông tin</a-select-option
                    >
                    <a-select-option value="Kinh tế"
                      >💰 Kinh tế</a-select-option
                    >
                    <a-select-option value="Công nghệ sinh học"
                      >🧬 Công nghệ sinh học</a-select-option
                    >
                    <a-select-option value="Công nghệ thực phẩm"
                      >🍎 Công nghệ thực phẩm</a-select-option
                    >
                    <a-select-option value="Nông học"
                      >🌱 Nông học</a-select-option
                    >
                    <a-select-option value="Khoa học môi trường"
                      >🌍 Khoa học môi trường</a-select-option
                    >
                    <a-select-option value="Xã hội học"
                      >👥 Xã hội học</a-select-option
                    >
                    <a-select-option value="Ngôn ngữ"
                      >🌐 Ngôn ngữ</a-select-option
                    >
                    <a-select-option value="Du lịch"
                      >✈️ Du lịch</a-select-option
                    >
                    <a-select-option value="Sư phạm"
                      >👨‍🏫 Sư phạm</a-select-option
                    >
                    <a-select-option value="Quản lý đất đai"
                      >🗺️ Quản lý đất đai</a-select-option
                    >
                  </a-select>
                </div>
              </div>
            </div>

            <!-- Document Information Card -->
            <div
              class="bg-white rounded-3xl shadow-xl p-8"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <div class="flex items-center mb-6">
                <div
                  class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">
                  Thông tin mô tả
                </h2>
              </div>

              <div class="space-y-6">
                <div>
                  <label
                    class="flex items-center text-sm font-semibold text-gray-700 mb-3"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      ></path>
                    </svg>
                    Tiêu đề <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.title"
                    type="text"
                    placeholder="Nhập tiêu đề tài liệu..."
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-700"
                  />
                </div>

                <div>
                  <label
                    class="flex items-center text-sm font-semibold text-gray-700 mb-3"
                  >
                    <svg
                      class="w-4 h-4 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      ></path>
                    </svg>
                    Nội dung mô tả <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="formData.content"
                    placeholder="Mô tả chi tiết về tài liệu, nội dung, tác giả, năm xuất bản..."
                    rows="5"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-700 resize-none"
                  />
                </div>
              </div>
            </div>

            <!-- Document Upload Card -->
            <div
              class="bg-white rounded-3xl shadow-xl p-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div class="flex items-center mb-6">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4"
                >
                  <svg
                    class="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">
                  Tài liệu đính kèm
                </h2>
              </div>

              <div class="mb-6">
                <label
                  class="group flex flex-col items-center justify-center w-full h-40 px-4 transition-all bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-2xl cursor-pointer hover:from-blue-100 hover:to-purple-100 hover:border-blue-400 focus:outline-none"
                  @dragover="handleDragOver"
                  @drop="handleDrop"
                >
                  <div class="flex flex-col items-center space-y-3">
                    <div
                      class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors"
                    >
                      <svg
                        class="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                    </div>
                    <div class="text-center">
                      <span class="font-semibold text-gray-700 text-lg"
                        >Tải lên tài liệu</span
                      >
                      <p class="text-sm text-gray-500 mt-1">
                        Kéo thả hoặc click để chọn file
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="documents"
                    class="hidden"
                    multiple
                    accept=".pdf,.docx,.ppt,.pptx,.xlsx,.zip"
                    @change="handleDocumentChange"
                  />
                </label>
              </div>

              <!-- Document List -->
              <div v-if="selectedDocuments.length > 0" class="space-y-3 mb-6">
                <div
                  v-for="(doc, index) in selectedDocuments"
                  :key="index"
                  class="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 18h12V6l-4-4H4v16z" />
                      </svg>
                    </div>
                    <div>
                      <span class="font-semibold text-gray-800 text-sm">{{
                        doc.name
                      }}</span>
                      <p class="text-xs text-gray-500">
                        {{ formatFileSize(doc.size) }}
                      </p>
                    </div>
                  </div>
                  <button
                    @click="removeDocument(index)"
                    class="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div class="text-center">
                <p class="text-sm text-gray-500">
                  <span class="font-semibold">Hỗ trợ:</span> PDF, Word (.docx),
                  PowerPoint (.ppt, .pptx), Excel (.xlsx), ZIP
                </p>
                <p class="text-xs text-gray-400 mt-1">Tối đa 50MB mỗi file</p>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="lg:col-span-1 space-y-6">
             <!-- Hình ảnh -->
      <div class="block bg-white p-4 rounded-xl">
        <div class="py-2 pb-6">
          <span class="font-bold text-base">Hình ảnh</span>
        </div>

        <!-- Single Image Upload Box -->
        <div class="mb-4">
          <div v-if="!file" class="relative border-2 border-dashed border-sky-500 rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer hover:bg-sky-50 transition">
            <FolderUp class="w-10 h-10 text-sky-500" />
            <span class="mt-2 text-gray-500 text-sm text-center">
              Tải ảnh từ thiết bị
            </span>
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div v-else class="relative h-40 rounded-lg overflow-hidden">
            <img
              :src="file.preview"
              alt="preview"
              class="w-full h-full object-cover"
            />
          <button
            @click="removeImage"
            class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 px-2 py-1 bg-white bg-opacity-70 rounded-md text-red-500 hover:text-red-600"
          >
            <Trash2 class="w-4 h-4" />
            <span class="text-xs">Xóa</span>
          </button>
          </div>
        </div>

        <small class="text-gray-500">
          Dung lượng ảnh tối đa 10MB
        </small>
      </div>
  
     

            <!-- Upload Guidelines -->
            <div
              class="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-6 border border-green-200"
              data-aos="fade-left"
              data-aos-duration="900"
            >
              <div class="flex items-center mb-4">
                <div
                  class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3"
                >
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800">Hướng dẫn</h3>
              </div>

              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>Chọn đúng loại và chuyên ngành tài liệu</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>Tiêu đề ngắn gọn, súc tích</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>Mô tả chi tiết nội dung tài liệu</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-500 mr-2">•</span>
                  <span>Đính kèm file tài liệu gốc</span>
                </li>
              </ul>
            </div>

            <!-- Submit Button -->
            <div
              class="sticky top-6"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <button
                @click="handleCreatePost"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div
                  v-if="loading"
                  class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
                <span>{{ loading ? "Đang tạo..." : "Đăng tài liệu" }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { createPost } from "@/apis/postService.js";
import { uploadMultipleImages } from "@/apis/imageService.js";

// Import các component của Ant Design Vue
import { Select, message, Spin, Modal } from "ant-design-vue";

const { confirm } = Modal;

const { Option: ASelectOption } = Select;
import { Check as CheckIcon, FolderUp, Trash2 } from "lucide-vue-next";
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import { uploadDocument } from "@/apis/documentService.js";

const ASelect = Select;
const ASelectOptionComponent = ASelectOption;
const ASpin = Spin;

const file = ref(null);

// Thêm vào reactive data
const selectedDocuments = ref([]);

// Thêm các functions
function handleDocumentChange(event) {
  const files = Array.from(event.target.files);
  processFiles(files);
  event.target.value = "";
}

function processFiles(files) {
  const allowedTypes = [".pdf", ".docx", ".ppt", ".pptx", ".xlsx", ".zip"];
  const validFiles = files.filter((file) => {
    const fileName = file.name.toLowerCase();
    return allowedTypes.some((type) => fileName.endsWith(type));
  });

  if (validFiles.length !== files.length) {
    message.error("Chỉ cho phép upload file PDF, Word, PowerPoint");
    return;
  }

  selectedDocuments.value = [...selectedDocuments.value, ...validFiles];
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  processFiles(files);
}

function removeDocument(index) {
  selectedDocuments.value.splice(index, 1);
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Khai báo các biến reactive
const formData = reactive({
  title: "",
  content: "",
  criteria: {
    motel: "TAI_LIEU",
    price: "",
    acreage: "",
    electricPrice: "",
    waterPrice: "",
    gender: "",
    address: "",
    idDistrict: "",
    interior: "",
    airConditioner: "",
    heater: "",
    internet: "",
    toilet: "",
    time: "",
    parking: "",
    security: "",
    owner: "",
    kitchen: "",
    secondMotel: "",
    openHours: "",
    delivery: "",
    dineIn: "",
    takeAway: "",
    bigSpace: "",
    linkShopeeFood: "",
    major: "",
    referenceUrl: "",
  },
});

const districtList = ref([
  { id: 1, name: "An Đào" },
  { id: 4, name: "Đào Nguyên" },
  { id: 5, name: "Cửu Việt" },
  { id: 6, name: "Thành Chung" },
  { id: 7, name: "Ngô Xuân Quảng" },
  { id: 8, name: "Vinhomes Ocean Park" },
  { id: 9, name: "Khác" },
]);

const featureOptionsMotel = ref([
  { label: "Đầy đủ nội thất", value: "interior" },
  { label: "Có điều hòa", value: "airConditioner" },
  { label: "Có nóng lạnh", value: "heater" },
  { label: "Có internet", value: "internet" },
  { label: "Vệ sinh khép kín", value: "toilet" },
  { label: "Giờ giấc tự do", value: "time" },
  { label: "Có chỗ để xe", value: "parking" },
  { label: "An ninh tốt", value: "security" },
  { label: "Không chung chủ", value: "owner" },
  { label: "Kệ bếp", value: "kitchen" },
]);

const featureOptionsStore = ref([
  { label: "Có giao hàng", value: "delivery" },
  { label: "Phục vụ tại chỗ", value: "dineIn" },
  { label: "Mua mang đi", value: "takeAway" },
  { label: "Không gian rộng", value: "bigSpace" },
  { label: "Có chỗ để xe", value: "parking" },
  { label: "Có điều hòa", value: "airConditioner" },
  { label: "Wifi miễn phí", value: "internet" },
]);

const mapAddress = ref("");
const addressTimer = ref(null);
const loading = ref(false);

// Computed properties
const displayMapAddress = computed(() => {
  return mapAddress.value.trim() || "VNUA";
});

// Watchers
watch(
  () => formData.criteria.address,
  (newAddress) => {
    if (addressTimer.value) clearTimeout(addressTimer.value);
    addressTimer.value = setTimeout(() => {
      mapAddress.value = newAddress;
    }, 1000);
  }
);

// Computed property to check if all 4 images are required based on property type
const isImagesRequired = computed(() => {
  return (
    formData.criteria.motel === "PHONG_TRO" ||
    formData.criteria.motel === "O_GHEP" ||
    formData.criteria.motel === "QUAN_AN" ||
    formData.criteria.motel === "QUAN_NUOC" ||
    formData.criteria.motel === "CUA_HANG" ||
    formData.criteria.motel === "TIEN_ICH"
  );
});

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    if (selectedFile.size > 10 * 1024 * 1024) {
      message.error("Dung lượng ảnh không được vượt quá 10MB");
      e.target.value = null;
      return;
    }

    file.value = {
      file: selectedFile,
      preview: URL.createObjectURL(selectedFile),
    };
  }
  e.target.value = null;
};

const removeImage = () => {
  if (file.value) {
    URL.revokeObjectURL(file.value.preview);
    file.value = null;
  }
};

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

const handleCreatePost = () => {
  // Validate tiêu đề chỉ khi là PHONG_TRO hoặc O_GHEP
  if (
    formData.criteria.motel === "PHONG_TRO" ||
    formData.criteria.motel === "O_GHEP"
  ) {
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
    if (isImagesRequired.value) {
      if (
        !files.value[0] ||
        !files.value[1] ||
        !files.value[2] ||
        !files.value[3]
      ) {
        message.error("Bạn phải tải lên đủ 4 ảnh theo yêu cầu");
        return;
      }
    }
  }

  if (
    formData.criteria.motel === "QUAN_AN" ||
    formData.criteria.motel === "QUAN_NUOC" ||
    formData.criteria.motel === "CUA_HANG" ||
    formData.criteria.motel === "TIEN_ICH"
  ) {
    // Validate tiêu đề:
    if (!formData.title.trim()) {
      message.error("Tiêu đề không được để trống");
      return;
    }
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 50
    ) {
      message.error("Tiêu đề phải từ 10 đến 100 ký tự");
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
    if (!formData.criteria.openHours) {
      message.error("Giờ mở cửa không được để trống");
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
    if (isImagesRequired.value) {
      if (
        !files.value[0] ||
        !files.value[1] ||
        !files.value[2] ||
        !files.value[3]
      ) {
        message.error("Bạn phải tải lên đủ 4 ảnh theo yêu cầu");
        return;
      }
    }
  }

  // Hiển thị confirm trước khi trừ 2000 số dư
  confirm({
    title: "Xác nhận đăng bài",
    content: "Bạn có chắc chắn muốn đăng bài viết này không? (Phí: 2000₫/lần)",
    async onOk() {
      loading.value = true;
      try {
        const { data: post } = await createPost(formData);
        const postId = post.id;

        // Upload single image if exists
        if (file.value) {
          await uploadMultipleImages(postId, [file.value.file]);
        }

        // Upload documents if any
        if (selectedDocuments.value.length > 0) {
          for (const doc of selectedDocuments.value) {
            await uploadDocument(postId, doc);
          }
        }

        message.success("Đăng tin thành công!");
        resetForm();
        file.value = null; // Reset single file
      } catch (error) {
        const errorMessage = error.message;
        if (errorMessage.includes("Số dư không đủ")) {
          message.error(
            "Không thể đăng bài: Số dư không đủ 2000 đồng. Vui lòng nạp thêm tiền để có thể Đăng tin!"
          );
        } else {
          message.error("Đã có lỗi xảy ra");
        }
      } finally {
        loading.value = false;
      }
    },
    onCancel() {
      message.info("Đã hủy đăng tin");
    },
  });
};

const toggleFeature = (featureValue) => {
  formData.criteria[featureValue] = !formData.criteria[featureValue];
};

const resetForm = () => {
  Object.assign(formData, {
    title: "",
    content: "",
    criteria: {
      motel: "TAI_LIEU",
      price: "",
      acreage: "",
      electricPrice: "",
      waterPrice: "",
      gender: "",
      address: "",
      idDistrict: "",
      interior: "",
      airConditioner: "",
      heater: "",
      internet: "",
      toilet: "",
      time: "",
      parking: "",
      security: "",
      owner: "",
      kitchen: "",
      secondMotel: "",
      openHours: "",
      delivery: "",
      dineIn: "",
      takeAway: "",
      bigSpace: "",
      linkShopeeFood: "",
      major: "",
      referenceUrl: "",
    },
  });
};
</script>

<style scoped>
.submit-btn:hover {
  background-color: #2980b9;
}
.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
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
