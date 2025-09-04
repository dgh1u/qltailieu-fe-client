<template>
  <Layout>
    <!-- Chuyên ngành Section -->
    <div class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10" >
          <h2 class="text-3xl font-bold mb-4">Chuyên ngành</h2>
          <p class="text-gray-600">Tìm kiếm tài liệu theo chuyên ngành của bạn</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="major in majors"
            :key="major.value"
            @click="navigateWithFilter('major', major.value)"
            class="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            data-aos="fade-up"
          >
            <div class="h-52 overflow-hidden">
              <img
                :src="major.image"
                :alt="major.label"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2">{{ major.label }}</h3>
              <p class="text-gray-600 text-sm">
                {{ major.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loại tài liệu Section -->
    <div class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-10" >
          <h2 class="text-3xl font-bold mb-4">Loại tài liệu</h2>
          <p class="text-gray-600">Khám phá các loại tài liệu học tập</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="type in documentTypes"
            :key="type.value"
            @click="navigateWithFilter('docType', type.value)"
            class="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            data-aos="fade-up"
          >
            <div class="h-52 overflow-hidden">
              <img
                :src="type.image"
                :alt="type.label"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2">{{ type.label }}</h3>
              <p class="text-gray-600 text-sm">
                {{ type.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useFilterStore } from '@/stores/filterStore';
import Layout from "../../layouts/HomeLayout.vue";

const router = useRouter();
const filterStore = useFilterStore();

function navigateWithFilter(type, value) {
  filterStore.setFilter(type, value);
  router.push({ name: 'DocumentList' });
}

const majors = [
  {
    label: "Thú y",
    value: "Thú y",
    image: "/src/assets/home-page/thú y.png",
    description: "Tài liệu chuyên ngành Thú y"
  },
  {
    label: "Chăn nuôi - Thủy sản",
    value: "Chăn nuôi - Thủy sản",
    image: "/src/assets/home-page/chăn nuôi.jpg",
    description: "Tài liệu chuyên ngành Chăn nuôi và Thủy sản"
  },
  {
    label: "Công nghệ thông tin",
    value: "Công nghệ thông tin",
    image: "/src/assets/home-page/cntt.png",
    description: "Tài liệu chuyên ngành Công nghệ thông tin"
  },
  {
    label: "Kinh tế",
    value: "Kinh tế",
    image: "/src/assets/home-page/quản trị kinh doanh.jpg",
    description: "Tài liệu chuyên ngành Quản trị kinh doanh"
  }
];

const documentTypes = [
  {
    label: "Giáo trình",
    value: "Giáo trình",
    image: "/src/assets/home-page/giáo trình.jpg",
    description: "Giáo trình chính thức của các môn học"
  },
  {
    label: "Khóa luận",
    value: "Khóa luận tốt nghiệp",
    image: "/src/assets/home-page/khóa luận.jpg",
    description: "Khóa luận tốt nghiệp của sinh viên"
  },
  {
    label: "Nghiên cứu khoa học",
    value: "Nghiên cứu khoa học",
    image: "/src/assets/home-page/nghiên cứu khoa học.jpg",
    description: "Các công trình nghiên cứu khoa học"
  },
  {
    label: "Bài báo khoa học",
    value: "Bài báo khoa học",
    image: "/src/assets/home-page/bài báo khoa học.png",
    description: "Các bài báo khoa học đã công bố"
  }
];
</script>

<style scoped>
.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}
</style>
