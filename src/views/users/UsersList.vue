<template>
  <spinner :is_loading="is_loading" />
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Danh sách tài khoản người dùng"
        main
      />
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Tất cả">
          <CardBox class="mb-6" has-table>
            <TableUsers :users="users" @create-success="getDataUsers()" />
          </CardBox>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tài khoản bị báo cáo" force-render>
          <CardBox class="mb-6" has-table>
            <TableReportUser :users="reportedUsers" @create-success="getDataUsers()" />
          </CardBox>
        </a-tab-pane>
      </a-tabs>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script>
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import TableUsers from './TableUsers.vue'
import TableReportUser from './TableReportUser.vue'
import $http from '@/services/httpService'
import get from 'lodash/get'

export default {
  components: {
    LayoutAuthenticated,
    CardBox,
    SectionMain,
    TableUsers,
    TableReportUser
  },
  data() {
    return {
      is_loading: false,
      users: [],
      reportedUsers: [],
      activeKey: '1'
    }
  },
  async created() {
    this.is_loading = true
    this.getDataUsers()
    this.is_loading = false
  },
  methods: {
    async getUsers() {
      const res = await $http.get('/admin/users')
      if (get(res, 'data.result', false)) {
        this.users = res.data.users
      }
    },

    async getReportedUsers() {
      const res = await $http.get('/admin/users/reported')
      if (get(res, 'data.result', false)) {
        this.reportedUsers = res.data.users
      }
    },

    getDataUsers() {
      this.getUsers()
      this.getReportedUsers()
    }
  }
}
</script>
