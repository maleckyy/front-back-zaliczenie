<template>
  <div class="wrapper">
    <form @submit.prevent="submitForm">
      <input
        type="text"
        placeholder="expense name"
        v-model.trim="formData.title"
        required
      />
      <input
        type="number"
        placeholder="expense price"
        v-model="formData.price"
        required
      />
      <button :disabled="!isUser" type="submit">{{ buttonText }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: null,
        price: null,
      },
    };
  },
  methods: {
    async submitForm() {
      if (this.formData.price < 0) {
        alert("Cena nie może byc mniejsza niż 0");
      } else if (this.formData.title.length < 3) {
        alert("Nazwa musi mieć wiecej niż 3 litery");
      } else {
        await this.$store.dispatch("addNewExpense", {
          title: this.formData.title,
          price: this.formData.price,
        });
        this.formData = {
          title: null,
          price: null,
        };
        this.$toast.success("Dodano nową pozycje!", {
          duration: 5000,
        });
      }
    },
  },
  computed: {
    userEmail() {
      return this.$store.getters.getUserEmail;
    },
    isUser() {
      if (this.userEmail) {
        return true;
      } else {
        return false;
      }
    },
    buttonText() {
      if (this.userEmail) {
        return "Add";
      } else {
        return "Login first!";
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 700px;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: 20px;
}
form {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
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
}
input:active,
input:focus,
input:focus:hover {
  outline: none;
  border-bottom: 3px solid var(--color-green);
}

button {
  background-color: var(--color-green);
  color: var(--color-white);
  border: 0;
  border-radius: 5px;
  height: 40px;
  min-width: 70px;
  max-width: 180px;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  font-family: var(--font-mont);
  font-weight: 500;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.239);
  transition: all 0.1s;
}
button:hover {
  transform: scale(1.03);
}
button:disabled {
  opacity: 0.7;
}
@media only screen and (max-width: 730px) {
  .wrapper {
    width: 100%;
  }
  form {
    width: 90%;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 100%;
  }
  button {
    width: 100%;
    height: 3rem;
    margin-top: 10px;
  }
}
</style>
