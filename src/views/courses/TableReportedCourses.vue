<script setup>
import { reactive, ref } from 'vue'

import $http from '@/services/httpService'
import get from 'lodash/get'
import { createToast } from 'mosha-vue-toastify'
import ReasonReportList from '@/views/users/components/ReasonReportList.vue'

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

const handleBlockCourse = () => {
  closeReasonReportModal()
  onUpdateBlockCourse(courseSelected.id)
}

const onUpdateBlockCourse = async (courseId) => {
  const course = props.courses.find((course) => course.id == courseId);
  if(!course){
    return;
  }

  const res = await $http.post(`/admin/courses/${course.id}/block`, {
    status_cd: course.status_cd === 2 ? 3 : 2
  })
  if (get(res, 'data.result', false)) {
    createToast(`Đã ${course.status_cd === 3 ? 'khoá' : 'mở'} thành công tài khoản người dùng`, {
      type: course.status_cd === 1 ? 'warning' : 'success',
      timeout: 3000
    })
    emits('createSuccess')
  }
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
        <img :src="record.image" style="height: 50px" />
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
    @on-confirm-block="handleBlockCourse"
    @close-reason-report-modal="closeReasonReportModal"
  />
</template>
