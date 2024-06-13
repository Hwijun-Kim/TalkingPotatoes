<template>
  <div class="container">
    <Header v-if="!hideHeader" />
    <router-view />
    <Footer v-if="!hideHeader " />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header, Footer
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.content {
  flex: 1;
}
</style>
