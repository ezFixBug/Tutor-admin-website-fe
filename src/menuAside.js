import {
  mdiMonitor,
  mdiAccountGroup,
  mdiAccountCash,
  mdiBookmarkBoxMultipleOutline,
  mdiAccount,
  mdiCash,
  mdiCodeTags
} from '@mdi/js'

export default [
  {
    to: '/',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/tutors',
    label: 'Gia sư',
    icon: mdiAccountGroup
  },
  {
    to: '/courses',
    label: 'Khóa học',
    icon: mdiBookmarkBoxMultipleOutline
  },
  {
    to: '/coupons',
    label: 'Khuyến mãi',
    icon: mdiAccountCash
  },
  {
    to: '/users',
    label: 'Người dùng',
    icon: mdiAccount
  },{
    to: '/payments',
    label: 'Giao dịch',
    icon: mdiCash
  },
    {
    to: '/payments/course',
    label: 'Thanh toán',
    icon: mdiCodeTags
  },
]
