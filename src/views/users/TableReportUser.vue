<script setup>
import { reactive, ref } from 'vue'

import $http from '@/services/httpService'
import get from 'lodash/get'
import { createToast } from 'mosha-vue-toastify'
import ReasonReportList from './components/ReasonReportList.vue'

const props = defineProps({
  users: {
    type: Array,
    default: null
  }
})

const emits = defineEmits(['createSuccess'])

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
    title: 'Vai trò',
    dataIndex: 'role_cd',
    key: 'role_cd'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status_cd',
    key: 'status_cd'
  },
  {
    title: 'Thao tác',
    dataIndex: 'operation',
    key: 'operation'
  }
])

const open = ref(false)

let userSelected = null

const showReasonReportModal = (e) => {
  userSelected = e
  open.value = true
}

const closeReasonReportModal = () => {
  open.value = false
}

const handleBlockUser = () => {
  onUpdateStatusUser(userSelected.id);
  closeReasonReportModal();
}

const onUpdateStatusUser = async (userId) => {
  const user = props.users.filter((user) => userId === user.id)
  if (!user.length) return

  const res = await $http.post(`/admin/users/${user[0].id}/block`, {
    status_cd: user[0].status_cd === 1 ? 0 : 1
  })
  if (get(res, 'data.result', false)) {
    createToast(`Đã ${user[0].status_cd === 1 ? 'khoá' : 'mở'} thành công tài khoản người dùng`, {
      type: user[0].status_cd === 1 ? 'warning' : 'success',
      timeout: 3000
    })
    emits('createSuccess')
  }
}
</script>

<template>
  <a-table :data-source="props.users" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'role_cd'">
        <span v-if="record.role_cd == 2">Gia sư</span>
        <span v-else-if="record.role_cd == 1">Học viên</span>
      </template>
      <template v-else-if="column.dataIndex === 'status_cd'">
        <span>
          <a-tag :key="record.status_cd" :color="record.status_cd === 1 ? 'green' : 'volcano'">
            <a-space style="cursor: pointer" @click="onUpdateStatusUser(record.id)">
              {{ record.status_cd === 1 ? 'Đang hoạt động' : 'Đã khóa' }}
            </a-space>
          </a-tag>
        </span>
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
    :user="userSelected"
    @on-confirm-block="handleBlockUser"
    @close-reason-report-modal="closeReasonReportModal"
  />
</template>
