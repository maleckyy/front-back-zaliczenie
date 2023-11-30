<template>
  <div class="wrapper">
    <form @submit.prevent="login">
      <input
        type="email"
        placeholder="email"
        v-model.trim="formData.email"
        required
      />
      <input
        type="password"
        placeholder="password"
        v-model="formData.password"
        required
      />
      <p v-if="err" class="error">{{ err }}</p>
      <div class="actions">
        <button>Login</button>
        <router-link to="/register">Register now!</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: null,
        password: null,
      },
      err: null,
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", this.formData);
      if (!this.$store.getters.getErrorMessage) {
        this.$toast.success("Poprawnie zalogowano", {
          duration: 5000,
        });
        this.$router.push("/");
      } else {
        this.formData = {
          email: null,
          password: null,
        };
        this.err = this.$store.getters.getErrorMessage;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 30px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
input {
  padding: 0.5rem 0.3rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.358);
  font-size: 1.2rem;
  height: 40px;
  font-family: var(--font-mont);
  transition: all 0.1s;
  width: 300px;
}
input:active,
input:focus,
input:focus:hover {
  outline: none;
  border-bottom: 3px solid var(--color-green);
}
.actions {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 40px;
}
button {
  background-color: var(--color-green);
  color: var(--color-white);
  border: 0;
  border-radius: 5px;

  font-size: 1.2rem;
  font-family: var(--font-mont);
  font-weight: 500;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.239);
  transition: all 0.1s;
  padding: 0.8rem 2rem;
}

button:hover {
  transform: scale(1.03);
  opacity: 0.9;
}
a {
  text-decoration: none;
  color: var(--color-grey);
  transition: all 0.1s;
}
a:hover {
  text-decoration: underline;
  opacity: 0.9;
}
.error {
  text-align: center;
  font-size: 1.1rem;
  animation: errorPulse 1.4s infinite;
}

@keyframes errorPulse {
  0% {
    color: var(--color-black);
    transform: scale(1);
  }
  50% {
    color: var(--color-red);
    transform: scale(1.06);
  }
  100% {
    color: var(--color-black);
    transform: scale(1);
  }
}
</style>
