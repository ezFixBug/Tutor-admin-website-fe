<script setup>
import { reactive } from 'vue'

import $http from '@/services/httpService'

const props = defineProps({
  users: {
    type: Array,
    default: null
  }
})

const columns = reactive([
  {
    title: 'Họ và Tên',
    dataIndex: 'full_name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone_number',
    key: 'phone_number'
  },
  {
    title: 'Doanh thu',
    dataIndex: 'revenue_sum_amount',
    key: 'revenue_sum_amount'
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'operation'
  }
])

const handleTransfer = async (user) => {
  const data = {
    payment_type: 3,
    total_amount: user.revenue_sum_amount,
    redirect_url: `http://localhost:5173/payments/course?user_id=${user.id}`
  }

  window.location.href = await getMomoPaymentUrl(data)
}

const getMomoPaymentUrl = async (data) => {
  const response = await $http.post('/momo-payment', {
    total_amount: data.total_amount,
    payment_type: data.payment_type,
    redirect_url: data.redirect_url
  })

  return response.data
}
</script>

<template>
  <a-table :data-source="props.users" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'revenue_sum_amount'">
        <span>{{ `${Number(record.revenue_sum_amount).toLocaleString('vi-VN')} VND` }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-button v-if="record.revenue[0].status_cd == 0" danger @click="handleTransfer(record)">
          Thanh toán</a-button
        >
        <a-tag v-else :color="'green'"><a-space>Đã thanh toán</a-space></a-tag>
      </template>
    </template>
  </a-table>
</template>
