<template>
  <base-card>
    <header>
      <div @click="navigateToHome" class="title">Monitor your expenses</div>
      <router-link v-if="!userEmail" to="/login"><p>login</p> </router-link>
      <a @click="logout" v-if="userEmail"
        ><p>
          logout <font-awesome-icon icon="fa-solid fa-user" /> {{ userEmail }}
        </p>
      </a>
    </header>
  </base-card>
</template>

<script>
export default {
  methods: {
    navigateToHome() {
      this.$router.push("/");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$toast.info("Wylogowano.", {
        duration: 3000,
      });
    },
  },
  computed: {
    userEmail() {
      return this.$store.getters.getUserEmail;
    },
  },
};
</script>

<style scoped>
header {
  background-color: var(--color-green);
  font-family: var(--font-play);
  letter-spacing: 1.2px;
  font-size: 2rem;
  padding: 1.2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  text-align: center;
  color: var(--color-white);
  cursor: pointer;
}
a {
  text-decoration: none;
  color: var(--color-white);
  cursor: pointer;
}
.fa-user {
  font-size: 1.1rem;
  margin-left: 6px;
}
p {
  font-size: 1.2rem;
  transition: all 0.2s;
}
p:hover {
  transform: scale(1.04);
}
@media only screen and (max-width: 730px) {
  header {
    padding: 1rem;
  }
  .title {
    font-size: 1.3rem;
  }
}
@media only screen and (max-width: 350px) {
  header {
    width: 100%;
  }
}
</style>
