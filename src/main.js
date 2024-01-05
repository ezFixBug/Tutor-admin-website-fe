import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import Spinner from '@/components/Spinner/Spinner.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { Select, FormItem, Form, Button, Modal, message } from 'ant-design-vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-responsive'
import 'datatables.net-select'
import './css/main.css'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';

// Init Pinia
const pinia = createPinia()

// Create Vue app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)
app.component('spinner', Spinner)
app.component('pulse-loader', PulseLoader)
app.component('Select', Select)
app.component('Modal', Modal)
app.component('Button', Button)
app.component('FormItem', FormItem)
app.component('Form', Form)
app.component('LayoutAuthenticated', LayoutAuthenticated)
app.component('SectionMain', SectionMain)
app.component('CardBox', CardBox)
app.component('SectionTitleLineWithButton', SectionTitleLineWithButton)
app.component('FormField', FormField)
app.component('FormControl', FormControl)
app.component('BaseButton', BaseButton)

app.component('DataTable', DataTable)
DataTable.use(DataTablesCore)

app.mount('#app')

// Init main store
const mainStore = useMainStore(pinia);
app.config.globalProperties.$message = message;
// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
// import { useDarkModeStore } from './stores/darkMode'

// const darkModeStore = useDarkModeStore(pinia)

// if (
//   (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
//   localStorage['darkMode'] === '1'
// ) {
//   darkModeStore.set(true)
// }

// Default title tag
const defaultDocumentTitle = 'Admin'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})