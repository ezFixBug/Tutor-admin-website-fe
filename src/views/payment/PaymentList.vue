<script setup>
import { ref } from 'vue'
import $http from '@/services/httpService'
import PaymentsCourseTable from './components/PaymentsCourseTable.vue'
import PaymentsTutorTable from './components/PaymentsTutorTable.vue'


const payments = ref([])
const isLoading = ref(false)

const activeKey = ref('1')

const filter_date = ref({
  start_date: null,
  end_date: null
})

const getPayments = async () => {
  try {
    isLoading.value = true
    const response = await $http.get('/admin/payments', {
      start_date: filter_date.value.start_date,
      end_date: filter_date.value.end_date
    })
    payments.value = response.data.payments
  } catch (error) {
    console.error('Error fetching coupons:', error)
  } finally {
    isLoading.value = false
  }
}
const filterCreate = () => {
  getPayments()
}

getPayments()
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between items-center mb-3">
        <h1 class="text-3xl">Quản lý lịch sử giao dịch</h1>
      </div>
      <div class="flex space-x-3">
        <div class="space-x-2">
          <input id="start_payment_date" v-model="filter_date.start_date" type="date" />
          <i class="fa-solid fa-arrow-right"></i>
          <input id="end_payment_date" v-model="filter_date.end_date" type="date" />
        </div>
        <div class=""></div>
        <BaseButton color="info" label="Lọc" @click="filterCreate" />
      </div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Thanh toán mua khoá học">
          <CardBox>
            <PaymentsCourseTable :payments="payments.payment_course" />
          </CardBox>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Thanh toán nhận lớp" force-render>
          <CardBox>
            <PaymentsTutorTable :payments="payments.payment_tutor" />
          </CardBox>
        </a-tab-pane>
      </a-tabs>
    </SectionMain>
  </LayoutAuthenticated>
</template>
