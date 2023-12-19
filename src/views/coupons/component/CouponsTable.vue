<template>
  <spinner :is_loading="props.isLoading" />
  <DataTable :columns="couponDataTable.columns" :data="formattedCoupons" @select="handleSelectCouponLine"
    :options="couponDataTable.options" class="display" />
  <UpdateCoupon :isOpen="open" @update:isOpen="updateOpen" :couponSelect="couponSelect" @updateSuccess="updateSuccess" />
</template>

<script setup>
import CONSTS from '@/Constants.js'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import UpdateCoupon from './UpdateCoupon.vue'

const open = ref(false);

const showModal = () => {
  open.value = true;
};

const updateOpen = (value) => {
  open.value = value;
};

const props = defineProps({
  coupons: Array,
  isLoading: Boolean
});

const emits = defineEmits(['update:isOpen', 'updateSuccess'])

const couponSelect = ref({});

const formattedCoupons = ref([]);
const handleSelectCouponLine = (e, dt, type, indexes) => {
  const row = dt.rows(indexes).data().toArray()[0];
  couponSelect.value = props.coupons.find(coupon => coupon.id == row.id)
  showModal()
}

watch(() => props.coupons, () => {
  formattedCoupons.value = props.coupons.map(coupon => ({
    id: coupon.id,
    created_at: dayjs(coupon.created_at).format('DD-MM-YYYY'),
    name: coupon.name,
    code: coupon.code,
    discount: `${Number(coupon.discount).toLocaleString('vi-VN')} VND`,
    type: `${coupon.type == CONSTS.CD_COUPON_TYPE.CASH ? '$' : '%'}`,
    start_date: dayjs(coupon.start_date).format('DD-MM-YYYY'),
    end_date: dayjs(coupon.end_date).format('DD-MM-YYYY'),
  }));
});

const updateSuccess = () => {
  emits('updateSuccess')
}

const couponDataTable = {
  columns: [
    { data: 'created_at', title: 'Ngày tạo' },
    { data: 'name', title: 'Tên chương trình' },
    { data: 'code', title: 'Mã khuyến mãi' },
    { data: 'discount', title: 'Giá trị khuyến mãi' },
    { data: 'type', title: 'Đơn vị khuyến mãi' },
    { data: 'start_date', title: 'Ngày bắt đầu' },
    { data: 'end_date', title: 'Ngày hết hạn' },
  ],
  options: {
    order: [[0, 'desc']],
    select: true
  },
};
</script>

<style scoped>
.table-row:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
