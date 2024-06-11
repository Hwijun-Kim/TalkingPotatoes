<template>
  <div class="container">
    <Header v-if="!hideHeader" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
  computed: {
    hideHeader() {
      // 라우터에서 설정한 메타 데이터를 확인하여 헤더를 숨길지 결정
      return this.$route.meta.hideHeader || false;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
</style>
