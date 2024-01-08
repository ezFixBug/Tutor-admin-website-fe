<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiAccountSchool,
  mdiBookAccount,
  mdiCommentArrowLeft,
  mdiNoteEdit,
  mdiCommentQuote,
  mdiReload
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import SectionBannerStarOnGitHub from '@/components/SectionBannerStarOnGitHub.vue'
import $http from '@/services/httpService'
import get from 'lodash/get'

const fetchDataChart = [
  {
    sum_price: '8720',
    total_price_including_tax: 11760,
    total_price_excluding_tax: 9800,
    net_price_including_tax: 11760,
    net_price_excluding_tax: 9800,
    customer_count: 2,
    value: 5880,
    label: '2023-44'
  },
  {
    sum_price: '1800',
    total_price_including_tax: 1800,
    total_price_excluding_tax: 1500,
    net_price_including_tax: 1800,
    net_price_excluding_tax: 1500,
    customer_count: 1,
    value: 1800,
    label: '2023-45'
  },
  {
    label: '2023-46',
    value: 0,
    customer_count: 0
  },
  {
    label: '2023-47',
    value: 0,
    customer_count: 0
  },
  {
    sum_price: '3740',
    total_price_including_tax: 3740,
    total_price_excluding_tax: 3163,
    net_price_including_tax: 3740,
    net_price_excluding_tax: 3163,
    customer_count: 1,
    value: 3740,
    label: '2023-48'
  },
  {
    label: '2023-49',
    value: 0,
    customer_count: 0
  },
  {
    label: '2023-50',
    value: 0,
    customer_count: 0
  },
  {
    label: '2023-51',
    value: 0,
    customer_count: 0
  },
  {
    sum_price: '13502',
    total_price_including_tax: 7000,
    total_price_excluding_tax: 5926,
    net_price_including_tax: 7000,
    net_price_excluding_tax: 5926,
    customer_count: 0,
    value: null,
    label: '2023-52'
  },
  {
    label: '2024-01',
    value: 0,
    customer_count: 0
  },
  {
    label: '2024-02',
    value: 0,
    customer_count: 0
  }
]

const is_loading = ref(false)
const statistics = ref({})
onMounted(async () => {
  is_loading.value = true
  const res = await $http.get('/admin/statistics')
  if (get(res, 'data.result', false)) {
    statistics.value = res.data.statistics
  }
  is_loading.value = false
})

const mainStore = useMainStore()

const clientBarItems = computed(() => mainStore.clients.slice(0, 4))

const transactionBarItems = computed(() => mainStore.history)

const chartData = {
  labels: fetchDataChart.map((item) => item.label),
  datasets: [
    {
      data:  fetchDataChart.map((item) => item.value || 0)
    }
  ]
}
</script>

<template>
  <spinner :is_loading="is_loading" />
  <LayoutAuthenticated>
    <SectionMain>
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

      <SectionBannerStarOnGitHub class="mt-6 mb-6" />

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Thống kê giao dịch">
        <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
