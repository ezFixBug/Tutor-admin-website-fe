<template>
  <div>
    <a-modal :open="props.open" width="768px" title="Danh sách lý do vi phạm" :closable="false">
      <a-table :columns="columns" :data-source="reported">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'user_full_name'">
            <span>{{ record.user.full_name }}</span>
          </template>
          <template v-else-if="column.dataIndex === 'type'">
            <span>{{ getDescriptionByType(record.type) }}</span>
          </template>
          <template v-else-if="column.dataIndex === 'created_at'">
            <span>{{ formatCreatedAt(record.created_at) }}</span>
          </template>
        </template>
      </a-table>
      <template #footer>
        <div class="flex justify-between">
          <a-button key="back" @click="handleCancel">Trờ về</a-button>
          <a-button v-if="props.user.status_cd !== 0" key="submit" type="primary" danger @click="handleUpdateStatusUser"
            >Khoá tài khoản</a-button
          >
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    }
  },
  emits: ['onConfirmBlock', 'closeReasonReportModal'],

  setup(props, { emit: emits }) {
    const columns = [
      {
        title: 'Người báo cáo',
        dataIndex: 'user_full_name',
        key: 'user_full_name'
      },
      {
        title: 'Lý do đã chọn',
        dataIndex: 'type',
        key: 'reason_report'
      },
      {
        title: 'Thời gian',
        dataIndex: 'created_at',
        key: 'created_at'
      }
    ]

    const reasonReports = [
      {
        type: 1,
        description: 'Lý do 1'
      },
      {
        type: 2,
        description: 'Lý do 2'
      },
      {
        type: 3,
        description: 'Lý do 3'
      }
    ]
    const handleUpdateStatusUser = () => {
      emits('onConfirmBlock')
    }

    const handleCancel = () => {
      emits('closeReasonReportModal')
    }

    return {
      columns,
      props,
      handleUpdateStatusUser,
      handleCancel,
      reasonReports
    }
  },

  computed: {
    reported() {
      return this.props.user?.reported ?? []
    },

    reasonReport() {
      return this.props.user?.created_at ?? ''
    }
  },

  methods: {
    getDescriptionByType(type) {
      const reasonReport = this.reasonReports.find((reasonReport) => reasonReport.type === type)
      return reasonReport?.description ?? ''
    },

    formatCreatedAt(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
</script>
