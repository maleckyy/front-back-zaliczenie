<template>
  <div class="container">
    <div class="item-wrapper">
      <div class="wrapper-left">
        <div class="edit-icon" @click="editItem">
          <font-awesome-icon icon="fa-solid fa-pen" />
        </div>
        <div class="content">
          <div class="title">{{ data.title }}</div>
          <div class="date">{{ data.created }}</div>
        </div>
      </div>

      <div class="wrapper-right">
        <div class="price">{{ data.price }}$</div>
        <div class="delete-icon" @click="deleteItem">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </div>
      </div>
    </div>
    <edit-expense
      v-if="toogleEdit"
      :expense="data"
      @toggle-edit="handleEdit"
    ></edit-expense>
  </div>
</template>

<script>
import EditExpense from "../EditExpense.vue";
export default {
  components: { EditExpense },
  props: ["data"],
  data() {
    return {
      toogleEdit: false,
    };
  },
  methods: {
    handleEdit(payload) {
      this.toogleEdit = payload;
    },
    editItem() {
      this.toogleEdit = !this.toogleEdit;
    },
    deleteItem() {
      this.$store.dispatch("deleteExpense", this.data._id);
      this.$toast.default("Usunięto pozycje!", {
        duration: 5000,
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.318);
  width: 700px;
  transition: all 0.2s;
  min-height: 80px;
}
.item-wrapper {
  display: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container:hover {
  padding: 1.3rem 2rem;
  background-color: rgb(250, 250, 250);
}
.wrapper-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.wrapper-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.title,
.price {
  font-family: var(--font-mont);
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 5px;
  letter-spacing: -0.3px;
}
.title {
  max-width: 300px;
}
.date {
  color: var(--color-grey);
  font-weight: 300;
  font-size: 0.9rem;
}

.edit-icon {
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}
.edit-icon:hover {
  color: var(--color-green);
  animation: rotate 0.8s infinite;
}
.delete-icon {
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  margin-bottom: 5px;
}
.delete-icon:hover {
  opacity: 0.7;
  color: var(--color-red);
  animation: shake 1.6s infinite;
}
@media only screen and (max-width: 730px) {
  .container {
    width: 90%;
  }
}
@media only screen and (max-width: 350px) {
  .container {
    padding: 1rem;
    width: 100%;
  }
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(-20deg);
  }
  66% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
