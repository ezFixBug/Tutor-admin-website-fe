<script setup>
import $http from '@/services/httpService'
import get from 'lodash/get'
import { reactive } from 'vue';
import dayjs from 'dayjs'
import { createToast } from 'mosha-vue-toastify';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean
});

const emits = defineEmits(['update:isOpen', 'createSuccess']);
const couponTypeOptions = [
  { id: 0, label: '$' },
  { id: 1, label: '%' },
]

let is_loading = false;

const coupons = reactive({
  name: null,
  code: 'PROMO_' + new Date().getTime(),
  discount: null,
  type: couponTypeOptions[0],
  startDate: dayjs(new Date).format('YYYY-MM-DD'),
  endDate: dayjs(new Date).format('YYYY-MM-DD'),
})

const submitForm = async () => {
  is_loading = true;
  const res = await $http.post('/admin/coupons/create', { ...coupons, type: coupons.type.id })

  if (get(res, 'data.result', false)) {
    createToast('Thêm chương trình khuyến mãi thành công!', {
      type: 'success',
      timeout: 3000
    })
    handleClose()
    emits('createSuccess');
  }
  is_loading = false;
}

const handleClose = () => {
  emits('update:isOpen', false);
};
</script>

<template>
  <Modal v-model:open="props.isOpen" title="Thêm chương trình khuyến mãi" :footer="null" width="1000px"
    :maskClosable="false" :closable="false">
    <CardBox is-form @submit.prevent="submitForm">
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label="Tên chương trình" required class="col-span-1">
          <FormControl v-model="coupons.name" required name="name" placeholder="Nhập tên chương trình khuyến mãi" />
        </FormField>
        <FormField label="Mã khuyễn mãi" required memo="Không thể thay đổi" class="col-span-1">
          <FormControl v-model="coupons.code" required disabled name="code" />
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label="Giá trị khuyến mãi" required class="col-span-1">
          <FormControl required v-model="coupons.discount" name="discount" placeholder="0" />
        </FormField>
        <FormField label="Đơn vị khuyến mãi" required class="col-span-1">
          <FormControl v-model="coupons.type" required :options="couponTypeOptions" name="type" />
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label="Ngày bắt đầu" required class="col-span-1">
          <FormControl v-model="coupons.startDate" name="startDate" type="date" />
        </FormField>
        <FormField label="Ngày hết hạn" required class="col-span-1">
          <FormControl v-model="coupons.endDate" name="endDate" type="date" />
        </FormField>
      </div>
      <template #footer>
        <div class="flex w-full justify-between">
          <BaseButton is-button @click="handleClose" color="contrast" label="Huỷ" />
          <BaseButton is-button type="submit" color="info" label="Thêm mới" />
        </div>
      </template>
    </CardBox>
  </Modal>
</template>