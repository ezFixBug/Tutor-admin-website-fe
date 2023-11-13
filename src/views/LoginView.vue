<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import $auth from '@/services/authService'
import { ref } from 'vue'
import get from 'lodash/get'
import set from 'lodash/set'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { computed } from 'vue'

const form = reactive({
  email: null,
  password: null
})

const is_loading = ref(false)

const router = useRouter()

const submit = async () => {
  is_loading.value = true
  const response = await $auth.login(form)
  if (get(response, 'data.result', null)) {
    window.location.href = '/'
  } else {
    if (get(response, 'data.status', {}) === 400) {
      createToast(get(response, 'data.message', {}), {
        type: 'danger',
        timeout: 6000
      })
    } else if (get(response, 'code', null) === 'ERR_NETWORK') {
      createToast(get(response, 'message', {}), {
        type: 'danger',
        timeout: 6000
      })
    } else {
      createToast(get(response, 'data.errors', {}), {
        type: 'danger',
        timeout: 6000
      })
    }
  }
  is_loading.value = false
}

const componentClass = computed(() => {
  const base = [
    'inline-flex',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'focus:outline-none',
    'transition-colors',
    'focus:ring',
    'duration-150',
    'border',
  ]


  return base
})
</script>

<template>
  <spinner :is_loading="is_loading" />
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.email"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
            placeholder="Enter your email"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="Enter your password"
          />
        </FormField>

        <template #footer>
          <BaseButton @click="submit" color="info" label="Submit">Login</BaseButton>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
