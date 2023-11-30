<template>
  <div class="wrapper">
    <input type="text" v-model="formData.title" />
    <input type="number" v-model="formData.price" />
    <button @click="submitEdit">Edit</button>
  </div>
</template>

<script>
export default {
  props: ["expense"],
  emits: ["toggleEdit"],
  data() {
    return {
      formData: {
        title: this.expense.title,
        price: this.expense.price,
      },
    };
  },
  methods: {
    submitEdit() {
      this.$store.dispatch("editExpense", {
        id: this.expense._id,
        title: this.formData.title,
        price: this.formData.price,
      });
      this.$toast.info("Edytowano pozycje!", {
        duration: 5000,
      });
      this.$emit("toggleEdit", false);
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
input {
  padding: 0.5rem 0.3rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.358);
  font-size: 1.2rem;
  height: 30px;
  font-family: var(--font-mont);
  transition: all 0.1s;
  max-width: 230px;
  color: var(--color-grey);
  background-color: transparent;
}
input:active,
input:focus,
input:focus:hover {
  outline: none;
  border-bottom: 2px solid var(--color-green);
}

button {
  background-color: var(--color-green);
  color: var(--color-white);
  border: 0;
  border-radius: 5px;
  height: 30px;
  min-width: 70px;
  max-width: 180px;
  font-size: 1rem;
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

  input {
    width: 100%;
  }
  button {
    width: 100%;
    height: 2rem;
    margin-top: 10px;
  }
}
</style>
