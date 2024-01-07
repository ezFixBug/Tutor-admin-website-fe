<script setup>
import { reactive, ref } from 'vue'

import $http from '@/services/httpService'
import get from 'lodash/get'
import { createToast } from 'mosha-vue-toastify'
import ReasonReportList from '@/views/users/components/ReasonReportList.vue'
import UserAvatar from '@/components/UserAvatar.vue'

const props = defineProps({
  courses: {
    type: Array,
    default: null
  }
})

const emits = defineEmits(['createSuccess'])

const columns = reactive([
  {
    title: '',
    dataIndex: 'image',
    key: 'image'
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Tên người tạo',
    dataIndex: 'user_full_name',
    key: 'user_full_name'
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'start_date',
    key: 'start_date'
  },
  {
    title: 'Loại khóa học',
    dataIndex: 'type_cd',
    key: 'type_cd'
  },
  {
    title: 'Thao tác',
    dataIndex: 'operation',
    key: 'operation'
  }
])

const open = ref(false)
let courseSelected = null

const showReasonReportModal = (e) => {
  courseSelected = e
  open.value = true
}

const closeReasonReportModal = () => {
  open.value = false
}

const handleBlockUser = () => {
  closeReasonReportModal();
}

</script>

<template>
  <a-table :data-source="props.courses" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'type_cd'">
        <span>{{ record.type_cd == 1 ? 'Học tại nhà' : 'Học online' }}</span>
      </template>
      <template v-else-if="column.dataIndex === 'user_full_name'">
        <p>{{ record.user.full_name }}</p>
      </template>
      <template v-else-if="column.dataIndex === 'image'">
        <img :src="record.image" style="height: 50px;" />
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a-space warp>
          <a-button type="primary" ghost size="large" @click="showReasonReportModal(record)">
            <i class="fa-regular fa-eye"></i>
          </a-button>
        </a-space>
      </template>
    </template>
  </a-table>
  <ReasonReportList
    :open="open"
    :user="courseSelected"
    @on-confirm-block="handleBlockUser"
    @close-reason-report-modal="closeReasonReportModal"
  />
</template>
