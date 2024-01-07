<template>
  <spinner :is_loading="is_loading" />
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Danh sách khóa học đang chờ duyệt"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableCourses :courses="courses_pending" />
      </CardBox>

      <SectionTitleLineWithButton
        :icon="mdiTableOff"
        title="Danh sách khóa học đã duyệt"
      ></SectionTitleLineWithButton>
      <CardBox>
        <TableCourses :courses="courses_approve" />
      </CardBox>
      <SectionTitleLineWithButton :icon="mdiTableOff" title="Danh sách khoá học bị tố cáo" />
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Đã duyệt">
          <CardBox class="mb-6" has-table>
            <TableCourses :courses="courses_baned" />
          </CardBox>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Chờ duyệt" force-render>
          <CardBox class="mb-6" has-table>
            <TableReportedCourses
              :courses="courses_reported"
              @create-success="console.log(123123)"
            />
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
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableCourses from './TableCourses.vue'
import TableReportedCourses from './TableReportedCourses.vue'
import $http from '@/services/httpService'
import get from 'lodash/get'

export default {
  components: {
    SectionTitleLineWithButton,
    LayoutAuthenticated,
    CardBox,
    SectionMain,
    TableCourses,
    TableReportedCourses
  },

  data() {
    return {
      is_loading: false,
      courses_pending: [],
      courses_approve: [],
      courses_reported: [],
      courses_baned: [],
      activeKey: '1'
    }
  },

  async created() {
    this.is_loading = true
    this.getPendingCourses()
    this.getApproveCourses()
    this.getReportedCourses()
    this.is_loading = false
  },

  methods: {
    async getPendingCourses() {
      const res = await $http.get('/admin/courses', { status_cd: 1 })

      if (get(res, 'data.result', false)) {
        this.courses_pending = res.data.courses
      }
    },
    async getApproveCourses() {
      const response = await $http.get('/admin/courses', { status_cd: 2 })

      if (get(response, 'data.result', false)) {
        this.courses_approve = response.data.courses
      }
    },
    async getBanCourses() {
      const response = await $http.get('/admin/courses', { status_cd: 3 })

      if (get(response, 'data.result', false)) {
        this.courses_baned = response.data.courses
      }
    },
    async getReportedCourses() {
      const res = await $http.get('/admin/courses/reported')
      if (get(res, 'data.result', false)) {
        this.courses_reported = res.data.courses
      }
    }
  }
}
</script>
