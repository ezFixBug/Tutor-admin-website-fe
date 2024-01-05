import {
  mdiMonitor,
  mdiAccountGroup,
  mdiAccountCash,
  mdiBookmarkBoxMultipleOutline,
  mdiAccount
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
  },
  //   {
  //   to: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline
  // },

]
