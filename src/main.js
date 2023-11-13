import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import Spinner from '@/components/Spinner/Spinner.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { Select, FormItem, Form, Button } from "ant-design-vue";

import './css/main.css'

// Init Pinia
const pinia = createPinia()

// Create Vue app
const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('spinner' ,Spinner)
app.component('pulse-loader', PulseLoader);
app.component('Select', Select);
app.component('Button', Button);
app.component('FormItem', FormItem);
app.component('Form', Form);

app.mount('#app');

// Init main store
const mainStore = useMainStore(pinia)


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
const defaultDocumentTitle = 'Admin One Vue 3 Tailwind'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
