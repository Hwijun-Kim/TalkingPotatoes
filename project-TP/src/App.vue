<template>
  <div class="container">
      <Header />
      <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header,
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
</style>