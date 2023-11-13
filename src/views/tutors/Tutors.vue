
<template>
  <spinner :is_loading="is_loading" />
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="Danh sách gia sư đang chờ duyệt"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableTutors :tutors="tutors_waiting" />
      </CardBox>

      <SectionTitleLineWithButton
        :icon="mdiTableOff"
        title="Danh sách gia sư đã duyệt"
      ></SectionTitleLineWithButton>
      <CardBox>
        <TableTutors :tutors="tutors_approve" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import TableTutors from './TableTutors.vue'
import $http from '@/services/httpService'
import get from 'lodash/get'

export default {
  components: {
    CardBoxComponentEmpty,
    BaseButton,
    SectionTitleLineWithButton,
    LayoutAuthenticated,
    CardBox,
    TableSampleClients,
    NotificationBar,
    SectionMain,
    TableTutors
  },

  data() {
    return {
      is_loading: false,
      tutors_waiting: [],
      tutors_approve: []
    }
  },

  async created() {
    this.is_loading = true
    const res = await $http.get('/admin/tutors', { status_cd: 1 })

    if (get(res, 'data.result', false)) {
      this.tutors_approve = res.data.tutors
    }

    const response = await $http.get('/admin/tutors', { status_cd: 2 })

    if (get(response, 'data.result', false)) {
      this.tutors_waiting = response.data.tutors
    }
    this.is_loading = false
  }
}
</script>

