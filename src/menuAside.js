import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
  mdiAccountGroup,
  mdiBookmarkBoxMultipleOutline
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
    to: '/forms',
    label: 'Forms',
    icon: mdiSquareEditOutline
  },
  {
    to: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide
  },
  {
    to: '/responsive',
    label: 'Responsive',
    icon: mdiResponsive
  },
  {
    to: '/',
    label: 'Styles',
    icon: mdiPalette
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle
  },
  {
    to: '/login',
    label: 'Login',
    icon: mdiLock
  },
  {
    to: '/error',
    label: 'Error',
    icon: mdiAlertCircle
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One'
      },
      {
        label: 'Item Two'
      }
    ]
  },
]
