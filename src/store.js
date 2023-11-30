import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      expensesData: [],
      token: null,
      userEmail: null,
      errorMessage: null,
      isLoading: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userEmail = payload.userEmail;
    },
    addToExpenses(state, payload) {
      state.expensesData.unshift(payload);
    },
    setExpenses(state, payload) {
      state.expensesData = payload;
    },
    deleteExpensebyId(state, payload) {
      state.expensesData = state.expensesData.filter(
        (exp) => exp._id !== payload
      );
    },
    editExpensebyId(state, payload) {
      state.expensesData.forEach((exp) => {
        if (exp._id === payload.id) {
          exp.title = payload.title;
          exp.price = payload.price;
        }
      });
    },
  },
  actions: {
    async signup(context, payload) {
      context.state.isLoading = true;
      context.state.errorMessage = null;
      const URL = "http://localhost:3001/user/signup";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });
      const responseData = await response.json();
      context.state.isLoading = false;
      if (!response.ok) {
        context.state.errorMessage = responseData.wiadomosc;
        return false;
      }
    },
    async login(context, payload) {
      context.state.isLoading = true;
      context.state.errorMessage = null;
      const URL = "http://localhost:3001/user/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });
      const responseData = await response.json();
      context.state.isLoading = false;
      if (!response.ok) {
        context.state.errorMessage = responseData.wiadomosc;
        return false;
      }
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userEmail", responseData.userEmail);
      context.state.errorMessage = null;
      context.commit("setUser", {
        token: responseData.token,
        userEmail: responseData.userEmail,
      });
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      context.commit("setUser", {
        userEmail: null,
        token: null,
      });
    },
    async getExpensesFromBD(context) {
      context.state.isLoading = true;
      const URL = "http://localhost:3001/expenses";

      const response = await fetch(URL);
      const resData = await response.json();
      context.state.isLoading = false;
      if (!response.ok) {
        throw new Error({ message: "Failed to fetch" });
      }
      context.commit("setExpenses", resData.data);
    },
    autoLogin(context) {
      if (localStorage.getItem("token") && localStorage.getItem("userEmail")) {
        context.commit("setUser", {
          token: localStorage.getItem("token"),
          userEmail: localStorage.getItem("userEmail"),
        });
      }
    },
    async addNewExpense(context, payload) {
      const URL = "http://localhost:3001/expenses/new";
      context.state.isLoading = true;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.state.token}`,
        },
        body: JSON.stringify({
          title: payload.title,
          price: payload.price,
        }),
      });
      const responseData = await response.json();
      context.state.isLoading = false;

      context.commit("addToExpenses", responseData.data);
    },
    async editExpense(context, payload) {
      const URL = `http://localhost:3001/expenses/edit/${payload.id}`;
      context.state.isLoading = true;
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.state.token}`,
        },
        body: JSON.stringify({
          title: payload.title,
          price: payload.price,
        }),
      });
      context.commit("editExpensebyId", {
        id: payload.id,
        title: payload.title,
        price: payload.price,
      });
      context.state.isLoading = false;
    },
    async deleteExpense(context, payload) {
      const URL = `http://localhost:3001/expenses/delete/${payload}`;
      context.state.isLoading = true;
      await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.state.token}`,
        },
      });
      context.commit("deleteExpensebyId", payload);
      context.state.isLoading = false;
    },
  }, //akcje moga byc async
  getters: {
    getAllExpenses(state) {
      return state.expensesData;
    },
    getUserToken(state) {
      return state.token;
    },
    getUserEmail(state) {
      return state.userEmail;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
});

export default store;
