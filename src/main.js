import { createApp } from "vue";
import router from "./router";
import store from "./store";
import ToastPlugin from "vue-toast-notification";

import "vue-toast-notification/dist/theme-bootstrap.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTrashCan,
  faPen,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
library.add(faTrashCan, faPen, faPlus, faUser);

import App from "./App.vue";
import BaseCardVue from "./UI/BaseCard.vue";

const app = createApp(App);

app.component("base-card", BaseCardVue);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(ToastPlugin);
app.use(router);
app.use(store);
app.mount("#app");
