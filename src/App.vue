<template>
  <div class="app">
    <the-header></the-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/headerComponent/TheHeader.vue";
export default {
  name: "App",
  components: { TheHeader },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style>
@import "./globalStyles.css";
.app {
  font-family: var(--font-mont);
  max-width: 100vw;
}
.content {
  margin: 0 auto;
  max-width: 1080px;
}
@media only screen and (max-width: 730px) {
  .app {
  }
  .content {
  }
}
@media only screen and (max-width: 730px) {
}
</style>
