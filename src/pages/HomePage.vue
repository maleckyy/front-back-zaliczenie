<template>
  <div class="home-page">
    <add-expenses-form></add-expenses-form>
    <div v-if="userEmail" class="all-costs">
      <p>Your expenses: {{ allCosts }}$</p>
    </div>
    <div v-if="userEmail" class="list-container">
      <img
        class="spinner"
        v-if="isLoading"
        src="../assets/loadingSpinner.svg"
        alt=""
      />
      <expenses-item
        v-for="expense in expensesData"
        :key="expense._id"
        :data="expense"
      ></expenses-item>
    </div>
    <div v-if="expensesData.length == 0" class="list-container">
      <p class="no-items">Nie masz jeszcze żadnych wydatków!</p>
    </div>
    <div v-if="!userEmail" class="list-container">
      <p class="no-items">Login first!!!</p>
    </div>
  </div>
</template>

<script>
import AddExpensesForm from "@/components/AddExpensesForm/AddExpensesForm.vue";
import ExpensesItem from "../components/ExpensesItem/ExpensesItem.vue";
export default {
  components: { ExpensesItem, AddExpensesForm },
  methods: {
    async loadData() {
      await this.$store.dispatch("getExpensesFromBD");
      this.expensesData = this.$store.getters.getAllExpenses;
    },
  },
  computed: {
    expensesData() {
      return this.$store.getters.getAllExpenses;
    },
    allCosts() {
      let allcosts = 0;
      this.expensesData.forEach((item) => {
        allcosts += item.price;
      });
      return allcosts;
    },
    userEmail() {
      return this.$store.getters.getUserEmail;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    if (this.userEmail) {
      this.loadData();
    }
  },
};
</script>

<style scoped>
.home-page {
  max-width: 1080px;
  position: relative;
}
.spinner {
  margin: 0 auto;
  transform: scale(0.3);
  position: absolute;
}
.all-costs {
  width: 700px;
  text-align: right;
  padding: 1.3rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.318);
  letter-spacing: 0.8px;
  margin: 0 auto;
  padding-right: 2rem;
}
.all-costs p {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12);
}
.list-container {
  padding: 0 0 30px;
  position: static;
  bottom: 0;
  margin: 0 auto;
  max-width: 100%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.no-items {
  text-align: right;
  padding: 1.3rem;
  font-size: 1.3rem;
  font-weight: 500;
}
@media only screen and (max-width: 730px) {
  .all-costs {
    width: 100%;
  }

  .list-container {
    width: 100%;
  }
}
</style>
