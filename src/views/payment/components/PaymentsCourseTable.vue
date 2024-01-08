<script setup>
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  payments: {
    type: Array,
    default: null,
  },
  isLoading: Boolean
})
const paymentDataTable = {
  columns: [
    { data: 'created_at', title: 'Ngày giao dịch' },
    { data: 'transaction_no', title: 'Mã giao dịch' },
    { data: 'amount', title: 'Số tiền đã thanh toán' },
    { data: 'user_name', title: 'Người Thanh Toán' },
    { data: 'tutor_name', title: 'Người Nhận' }
  ],
  options: {
    order: [[0, 'desc']],
  }
}
const formattedPayments = ref([])

watch(
  () => props.payments,
  () => {
    formattedPayments.value = props.payments.map((payment) => ({
      id: payment.id,
      created_at: dayjs(payment.created_at).format('DD-MM-YYYY HH:mm:ss'),
      user_name: payment.user.full_name,
      transaction_no: payment.bank_transaction_no,
      amount: `${Number(payment.amount).toLocaleString('vi-VN')} VND`,
      type: payment.payment_type == 0 ? 'Đăng ký khoá học' : 'Nhận học viên',
      tutor_name: payment.register_course.course.user.full_name,
    }))
  }
)
</script>
<template>
  <DataTable
    :columns="paymentDataTable.columns"
    :options="paymentDataTable.options"
    :data="formattedPayments"
    class="display"
  />
</template>
