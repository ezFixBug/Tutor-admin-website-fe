<script setup>
import { computed, ref, onMounted, reactive } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiAccountSchool,
  mdiBookAccount,
  mdiCommentArrowLeft,
  mdiNoteEdit,
  mdiCommentQuote
} from '@mdi/js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import SectionBannerStarOnGitHub from '@/components/SectionBannerStarOnGitHub.vue'
import $http from '@/services/httpService'
import get from 'lodash/get'

const is_loading = ref(false)
const statistics = ref({})
onMounted(async () => {
  is_loading.value = true
  getStatistics()
  console.log(statistics.value)
  is_loading.value = false
})

const getStatistics = async () => {
  const res = await $http.get('/admin/statistics', {
    ...filter
  })
  if (get(res, 'data.result', false)) {
    statistics.value = res.data.statistics
    PaymentsCourseChartData.value = {
      labels: statistics.value.payments_course?.map((item) => item.label),
      datasets: [
        {
          data: statistics.value.payments_course?.map((item) => item.value || 0)
        }
      ]
    }
    PaymentsTutorChartData.value = {
      labels: statistics.value.payments_tutor?.map((item) => item.label),
      datasets: [
        {
          data: statistics.value.payments_tutor?.map((item) => item.value || 0)
        }
      ]
    }
  }
}

const mainStore = useMainStore()

const clientBarItems = computed(() => mainStore.clients.slice(0, 4))

const transactionBarItems = computed(() => mainStore.history)

const PaymentsCourseChartData = ref({
  labels: [],
  datasets: []
})
const PaymentsTutorChartData = ref({
  labels: [],
  datasets: []
})

const handleFilter = () => {
  getStatistics()
}

const filterYear = [2024, 2023, 2022, 2021]

const filterMonth = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const filter = reactive({
  year: filterYear[0],
  month: null
})
</script>

<template>
  <spinner :is_loading="is_loading" />
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartPie" title="Tổng quan">
      </SectionTitleLineWithButton>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="statistics.total_tutor"
          label="Gia sư"
        />
        <CardBoxWidget
          color="text-blue-500"
          :icon="mdiAccountSchool"
          :number="statistics.total_student"
          label="Học sinh"
        />
        <CardBoxWidget
          color="text-red-500"
          :icon="mdiBookAccount"
          :number="statistics.total_course"
          label="Khóa học"
        />
        <CardBoxWidget
          color="text-yellow-500"
          :icon="mdiCommentArrowLeft"
          :number="statistics.total_request"
          label="Yêu cầu gia sư"
        />
        <CardBoxWidget
          color="text-slate-500"
          :icon="mdiNoteEdit"
          :number="statistics.total_post"
          label="Bài viết"
        />
        <CardBoxWidget
          color="text-black-500"
          :icon="mdiCommentQuote"
          :number="statistics.total_feedback"
          label="Feedback"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>

      <div>
        <SectionTitleLineWithButton :icon="mdiChartPie" title="Thống kê giao dịch">
        <div class="flex space-x-2">
          <div class="space-x-2">
            <label for="filter_year">Năm</label>
            <select id="filter_year" v-model="filter.year" @change="handleFilter">
              <option v-for="year in filterYear" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
          <div class="space-x-2">
            <label for="filter_month">Tháng</label>
            <select id="filter_month" v-model="filter.month" @change="handleFilter">
              <option v-for="month in filterMonth" :key="month" :value="month">{{ month }}</option>
            </select>
          </div>
        </div>
      </SectionTitleLineWithButton>
      <div class="grid grid-cols-2 space-x-4">
        <CardBox class="mb-6">
          <line-chart :data="PaymentsCourseChartData" :title="'Mua khoá học'" />
        </CardBox>
        <CardBox class="mb-6">
          <line-chart :data="PaymentsTutorChartData" :title="'Nhận học viên'" />
        </CardBox>
      </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
