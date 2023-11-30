import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import NotFound from "./pages/NotFound.vue";
// import EditExpense from "./components/EditExpense.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    // { path: "/edit/:id", component: EditExpense, props: true },
    // { path: "/cos/:id", component: variable, props: true, children: [] },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
