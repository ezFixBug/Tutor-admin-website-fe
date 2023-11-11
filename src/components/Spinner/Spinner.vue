<template>
  <div class="background" v-if="is_loading">
    <pulse-loader :loading="is_loading" class="spinner" :color="`#ec5252`"></pulse-loader>
  </div>
</template>
<script>

export default {
  props: {
    is_loading: {
      default: false,
    },
  },
};
</script>
<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(67, 67, 67, 0.4);
    transition: all 0.3s ease;
    z-index: 2000;
}
.spinner{
    position: absolute;
    top: 47%;
    left: 47%;
    z-index: 2000;
}
</style>
