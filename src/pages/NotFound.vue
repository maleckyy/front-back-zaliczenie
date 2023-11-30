<template>
  <div class="wrapper">
    <div class="not-found">Page not found ;(</div>
    <button @click="navigateToHomePage">back to home page</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.not-found {
  text-align: center;
  font-size: 1.3rem;
}
button {
  color: var(--color-white);
  font-size: 1rem;
  background-color: var(--color-grey);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-top: 40px;
  transition: all 0.1s;
}
button:hover {
  transform: scale(1.03);
}
</style>
