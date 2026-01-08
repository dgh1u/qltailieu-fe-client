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
        <!-- Danh sách tài liệu -->
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
                @change="handlePageChange"
              />
            </div>
          </template>
          <template v-else>
            <div class="flex items-center font-semibold justify-center py-10">
              <a-empty description="Không tìm thấy tài liệu nào!" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </DefaultWhiteLayout>
</template>

<script setup>
// Import các thư viện Vue cần thiết
import { ref, watch, onMounted, onUnmounted } from "vue";

// Import layouts và components
import DefaultWhiteLayout from "../../layouts/DefaultWhiteLayout.vue";
import DocumentFilter from "../../components/filter/DocumentFilter.vue";
import DocumentCard from "../../components/card/DocumentCard.vue";

// Import API service
import { getListPost } from "@/apis/postService.js";

// Import icon
import { Search } from "lucide-vue-next";

// Import store quản lý bộ lọc
import { useFilterStore } from '@/stores/filterStore';

// Store quản lý bộ lọc
const filterStore = useFilterStore();

// Khởi tạo bộ lọc tài liệu
const filters = ref({
  keywords: "",
  majorSelected: null,
  secondMotelSelected: null,
});

// Danh sách bài đăng tài liệu
const posts = ref([]);

// Thông báo lỗi nếu có
const errorMsg = ref("");

// Cấu hình phân trang
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
});

// Hàm xử lý cập nhật bộ lọc từ component DocumentFilter
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

// Hàm chuyển đổi bộ lọc thành tham số query cho API
function buildQueryParams() {
  const params = {};
  // Mặc định là tài liệu
  params.motel = "TAI_LIEU";

  // Chỉ lấy bài đăng đã duyệt và đang hiển thị
  params.approved = true;
  params.notApproved = false;
  params.del = false;

  // Tham số phân trang (trang hiện tại và số item trên trang)
  params.start = Math.max(pagination.value.current - 1, 0);
  params.limit = pagination.value.pageSize;

  // Thêm từ khóa tìm kiếm nếu có
  if (filters.value.keywords && filters.value.keywords.trim() !== "") {
    params.keywords = filters.value.keywords.trim();
  }

  // Thêm chuyên ngành
  if (filters.value.majorSelected) {
    params.major = filters.value.majorSelected;
  }

  // Thêm loại tài liệu
  if (filters.value.secondMotelSelected) {
    params.secondMotel = filters.value.secondMotelSelected;
  }

  return params;
}

// Hàm gọi API để lấy danh sách tài liệu
async function fetchPosts() {
  try {
    errorMsg.value = "";
    const queryParams = buildQueryParams();
    const response = await getListPost(queryParams);
    const data = response.data;

    // Cập nhật danh sách và tổng số tài liệu
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
      "Có lỗi xảy ra khi lấy danh sách tài liệu. Vui lòng kiểm tra lại log!";
  }
}

// Hàm xử lý khi chuyển trang
function handlePageChange(page) {
  pagination.value.current = page;
  fetchPosts();
  // Cuộn lên đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Khi component được mount, kiểm tra và áp dụng bộ lọc từ store (nếu có)
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

// Tự động tải lại dữ liệu khi bộ lọc thay đổi
watch(
  filters,
  () => {
    fetchPosts();
  },
  { deep: true }
);

// Khi component bị unmount, xóa bộ lọc khỏi store
onUnmounted(() => {
  filterStore.clearFilter();
});
</script>

<style scoped>
/* Tuỳ chỉnh style nếu cần */
</style>
