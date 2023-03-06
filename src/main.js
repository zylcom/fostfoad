import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

import apolloClient from "./plugins/apollo";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(createPinia());
app.use(router);
app.use(VueTelInput);

app.mount("#app");
