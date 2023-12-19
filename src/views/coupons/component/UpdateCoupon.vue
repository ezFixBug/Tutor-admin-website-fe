<script setup>
import $http from '@/services/httpService'
import get from 'lodash/get'
import { } from 'vue'
import dayjs from 'dayjs'
import { createToast } from 'mosha-vue-toastify'
import { defineProps, defineEmits, reactive, watch, ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  couponSelect: Object
})

const couponTypeOptions = [
  { id: 0, label: '$' },
  { id: 1, label: '%' }
]

const coupon = ref({})

watch(
  () => props.couponSelect,
  () => {
    coupon.value = {
      ...props.couponSelect,
      type: couponTypeOptions.find(type => type.id == props.couponSelect.type),
      startDate: dayjs(props.couponSelect.start_date).format('YYYY-MM-DD'),
      endDate: dayjs(props.couponSelect.end_date).format('YYYY-MM-DD'),
    }
  }
)

const emits = defineEmits(['update:isOpen', 'updateSuccess'])

let isLoading = false

const submitForm = async () => {
  isLoading = true
  const res = await $http.post(`/admin/coupons/${coupon.value.id}`, {
    ...coupon.value,
    type: coupon.value.type.id
  })

  if (get(res, 'data.result', false)) {
    createToast('Cập nhật chương trình khuyến mãi thành công!', {
      type: 'success',
      timeout: 3000
    })
    handleClose()
    emits('updateSuccess')
  }
  isLoading = false
}

const handleClose = () => {
  emits('update:isOpen', false)
}

const handleDeleteCoupon = async () => {
  isLoading = true
  const res = await $http.delete(`/admin/coupons/${coupon.value.id}`)

  if (get(res, 'data.result', false)) {
    createToast('Xoá chương trình khuyến mãi thành công!', {
      type: 'success',
      timeout: 3000
    })
    handleClose()
    emits('updateSuccess')
  }
  isLoading = false
}
</script>

<template>
  <Modal v-model:open="props.isOpen" title="Chi tiết chương trình khuyến mãi" :footer="null" width="1000px"
    :maskClosable="false" :closable="false">
    <CardBox is-form @submit.prevent="submitForm">
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label="Tên chương trình" required class="col-span-1">
          <FormControl v-model="coupon.name" required name="name" placeholder="Nhập tên chương trình khuyến mãi" />
        </FormField>
        <FormField label="Mã khuyễn mãi" required memo="Không thể thay đổi" class="col-span-1">
          <FormControl v-model="coupon.code" required disabled name="code" />
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label="Giá trị khuyến mãi" required class="col-span-1">
          <FormControl required v-model="coupon.discount" name="discount" placeholder="0" />
        </FormField>
        <FormField label="Đơn vị khuyến mãi" required class="col-span-1">
          <FormControl v-model="coupon.type" :options="couponTypeOptions" name="type" />
        </FormField>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label="Ngày bắt đầu" required class="col-span-1">
          <FormControl v-model="coupon.startDate" name="startDate" type="date" required />
        </FormField>
        <FormField label="Ngày hết hạn" required class="col-span-1">
          <FormControl v-model="coupon.endDate" name="endDate" type="date" required />
        </FormField>
      </div>
      <template #footer>
        <div class="flex w-full justify-between">
          <BaseButton is-button color="danger" @click="handleDeleteCoupon" label="Xoá" />
          <div class="flex space-x-3">
            <BaseButton is-button @click="handleClose" color="contrast" label="Huỷ" />
            <BaseButton is-button type="submit" color="info" label="Lưu" />
          </div>
        </div>
      </template>
    </CardBox>
  </Modal>
</template>
