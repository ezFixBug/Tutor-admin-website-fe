
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between items-center mb-3">
        <h1 class="text-3xl">
          Danh sách chương trình khuyến mãi
        </h1>
        <Button type="primary" ghost @click="showModal">Thêm chương trình mới</Button>
      </div>

      <CardBox>
        <CouponsTable :coupons="coupons" :isLoading="isLoading" @updateSuccess="getCoupons()" />
      </CardBox>
    </SectionMain>
    <CreateCoupon :isOpen="open" @update:isOpen="updateOpen" @createSuccess="getCoupons()" />
  </LayoutAuthenticated>
</template>
<script setup>
import CreateCoupon from './component/CreateCoupon.vue'
import CouponsTable from './component/CouponsTable.vue'
import $http from '@/services/httpService'
import { ref } from 'vue';

const isLoading = ref(false);
const open = ref(false);
const coupons = ref([]);

const showModal = () => {
  open.value = true;
};


const updateOpen = (value) => {
  open.value = value;
};

const getCoupons = async () => {
  try {
    isLoading.value = true;
    const response = await $http.get('/admin/coupons');
    coupons.value = response.data;
  } catch (error) {
    console.error('Error fetching coupons:', error);
  } finally {
    isLoading.value = false;
  }
};
getCoupons();
</script>