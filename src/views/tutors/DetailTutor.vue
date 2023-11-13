<template>
  <spinner :is_loading="is_loading" />
  <LayoutAuthenticated>
    <ContentTutor :tutor="tutor"/>
  </LayoutAuthenticated>
</template>

<script>
import $http from '@/services/httpService'
import $auth from '@/services/authService'
import get from 'lodash/get'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import ContentTutor from './ContentTutor.vue'

export default {
  components: {
    LayoutAuthenticated,
    ContentTutor
  },
  data() {
    return {
      tutor: {},
      is_loading: false
    }
  },

  async created() {
    this.is_loading = true
    const tutor_id = this.$route.params.tutor_id
    const res = await $http.get('/user/' + tutor_id)
    if (get(res, 'data.result', false)) {
      this.tutor = res.data.user
    }
    this.is_loading = false
  },
}
</script>

