<script setup>
import { ref, reactive } from 'vue'
import $http from '@/services/httpService'
import SalaryTable from './components/SalaryTable.vue'
import { useRoute, useRouter } from 'vue-router'
import get from 'lodash/get'
import { createToast } from 'mosha-vue-toastify'

const activeKey = ref('1')

const users = ref([])
const users_pending = ref([])
const users_completed = ref([])
const isLoading = ref(false)
const filterYear = [2024, 2023, 2022, 2021]

const filterMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const filter = reactive({
  year: filterYear[0],
  month: filterMonth[0]
})

const getPayments = async () => {
  try {
    isLoading.value = true
    const response = await $http.get('/admin/total_revenue', {
      year: filter.year,
      month: filter.month
    })
    users_pending.value = response.data.users_pending
    console.log(response.data.users_pending);
    users_completed.value = response.data.users_completed
  } catch (error) {
    console.error('Error fetching coupons:', error)
  } finally {
    isLoading.value = false
  }
}

const filterPayment = () => {
  getPayments()
}

const router = useRouter()
const route = useRoute()
const updateStatus = async () => {
  const response = await $http.post('/admin/revenue', {
    user_id: route.query?.user_id
  })
  if (get(response, 'data.result', false)) {
    createToast(`Đã thanh toán thành công`, {
      type: 'success',
      timeout: 3000
    })
    getPayments()
  }
}

if (route.query?.user_id) {
  router.push({ path: '/payments/course' })
  updateStatus()
}

getPayments()
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="flex justify-between items-center mb-3">
        <h1 class="text-3xl">Thanh toán tiền đã bán khoá học</h1>
      </div>
      <div class="flex space-x-2">
        <div class="space-x-2">
          <label for="filter_year">Năm</label>
          <select id="filter_year" v-model="filter.year" @change="filterPayment">
            <option v-for="year in filterYear" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="space-x-2">
          <label for="filter_month">Tháng</label>
          <select id="filter_month" v-model="filter.month" @change="filterPayment">
            <option v-for="month in filterMonth" :key="month" :value="month">{{ month }}</option>
          </select>
        </div>
      </div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Chờ thanh toán">
          <CardBox>
            <SalaryTable :users="users_pending" />
          </CardBox>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Đã thanh toán">
          <CardBox>
            <SalaryTable :users="users_completed" />
          </CardBox>
        </a-tab-pane>
      </a-tabs>
    </SectionMain>
  </LayoutAuthenticated>
</template>
