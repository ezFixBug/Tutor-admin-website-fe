<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: null
  },
  api: {
    type: String,
    default: 'avataaars'
  }
})


const username = computed(() => props.username)
</script>

<template>
  <div>
    <img
      :src="image"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
    />
    <slot />
  </div>
</template>
