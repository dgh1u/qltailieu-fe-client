<template>
  <DefaultWhiteLayout>
  
    <!-- Wrapper toàn trang: hướng cột trên mobile, hướng hàng ngang từ md trở lên -->
    <div class="flex flex-col md:flex-row min-h-screen py-6 bg-sky-50">
      <!-- Bộ lọc: chiếm toàn bộ chiều rộng trên mobile, tự động shrink trên desktop -->
      <div class="w-full md:w-auto md:mr-10 mb-4 md:mb-0">
        <DocumentFilter @update:filters="handleFilterUpdate" />
      </div>
      <!-- Nội dung chính: chiếm phần còn lại -->
      <div class="flex-1 flex flex-col bg-sky-50">
        <!-- Thanh tìm kiếm từ khóa -->
        <div class="mb-1 relative">
          <input
            v-model="filters.keywords"
            type="text"
            placeholder="Nhập tên tài liệu muốn tìm..."
            class="w-full p-3 pl-10 bg-white text-sky-400 rounded-3xl shadow hover:shadow-3xl placeholder:text-blue-200 placeholder:font-semibold"
          />
          <Search
            class="w-5 h-5 text-sky-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <!-- Hiển thị thông báo lỗi nếu có -->
        <div v-if="errorMsg" class="p-4 text-red-600">
          {{ errorMsg }}
        </div>
        <!-- Danh sách tin đăng -->
        <div class="p-2 pb-20 flex-1 overflow-y-auto">
          <template v-if="posts.length">
            <!-- Grid 1 cột trên mobile, 2 cột từ md trở lên -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <router-link
                v-for="post in posts"
                :key="post.id"
                :to="{ name: 'DocumentDetail', params: { id: post.id } }"
                class="block"
              >
                <DocumentCard
                  :post="post"
                  data-aos="fade-left"
                  data-aos-duration="800"
                />
              </router-link>
            </div>
            <!-- Phân trang (Ant Design Vue) -->
            <div class="pt-10">
              <a-pagination
                :current="pagination.current"
                :pageSize="pagination.pageSize"
                :total="pagination.total"
                show-quick-jumper
                :locale="paginationLocale"
                :itemRender="itemRender"
                @change="handlePageChange"
              />
            </div>
          </template>
          <template v-else>
            <div class="flex items-center font-semibold justify-center py-10">
              <a-empty description="Không tìm thấy tin đăng nào!" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </DefaultWhiteLayout>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';
import DefaultWhiteLayout from "../../layouts/DefaultWhiteLayout.vue";
import { getListPost } from "@/apis/postService.js";
import { Empty } from "ant-design-vue";

import { Search } from "lucide-vue-next";
import DocumentFilter from "../../components/filter/DocumentFilter.vue";
import DocumentCard from "../../components/card/DocumentCard.vue";
import { useFilterStore } from '@/stores/filterStore';

const router = useRouter();
const filterStore = useFilterStore();
const initialFilter = ref(null);

// Khởi tạo bộ lọc
const filters = ref({
  keywords: "",
  majorSelected: null,
  secondMotelSelected: null,
});

// Danh sách bài đăng
const posts = ref([]);

// Thông báo lỗi
const errorMsg = ref("");

// Cấu hình phân trang
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
});

// Xử lý cập nhật bộ lọc từ component BeverageFilter
function handleFilterUpdate(newFilters) {
  filters.value = {
    ...filters.value,
    ...newFilters,
    keywords: filters.value.keywords,
  };
  // Reset về trang 1 khi filter thay đổi
  pagination.value.current = 1;
  fetchPosts();
}

// Chuyển đổi bộ lọc thành query params cho API
function buildQueryParams() {
  const params = {};
  // Mặc định là quán nước
  params.motel = "TAI_LIEU";

  // Chỉ lấy tin đã duyệt và đang hiển thị
  params.approved = true;
  params.notApproved = false;
  params.del = false;

  // Tham số phân trang
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  // Thêm từ khóa tìm kiếm
  if (filters.value.keywords && filters.value.keywords.trim() !== "") {
    params.keywords = filters.value.keywords.trim();
  }

  // Thêm khu vực
  if (filters.value.majorSelected) {
    params.major = filters.value.majorSelected;
  }

  // Thêm loại quán
  if (filters.value.secondMotelSelected) {
    params.secondMotel = filters.value.secondMotelSelected;
  }

  return params;
}

// Gọi API và cập nhật danh sách bài đăng
async function fetchPosts() {
  try {
    errorMsg.value = "";
    const queryParams = buildQueryParams();
    const response = await getListPost(queryParams);
    const data = response.data;

    if (data && data.items) {
      posts.value = data.items;
      pagination.value.total = data.total || 0;
    } else {
      posts.value = [];
      pagination.value.total = 0;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    errorMsg.value =
      "Có lỗi xảy ra khi lấy danh sách bài đăng. Vui lòng kiểm tra lại log!";
  }
}

// Xử lý chuyển trang
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  // Cuộn lên đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Khởi tạo dữ liệu khi component được mount
onMounted(() => {
  const activeFilter = filterStore.activeFilter;
  if (activeFilter.type && activeFilter.value) {
    if (activeFilter.type === 'major') {
      filters.value.majorSelected = activeFilter.value;
    } else if (activeFilter.type === 'docType') {
      filters.value.secondMotelSelected = activeFilter.value;
    }
  }
  fetchPosts();
});

// Tự động cập nhật dữ liệu khi bộ lọc thay đổi
watch(
  filters,
  () => {
    fetchPosts();
  },
  { deep: true }
);

onUnmounted(() => {
  filterStore.clearFilter();
});
</script>

<style scoped>
/* Tuỳ chỉnh style nếu cần */
</style>
