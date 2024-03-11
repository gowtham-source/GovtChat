import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { VueFire, VueFireAuth } from "vuefire";
import { app as firebaseApp } from "./firebaseConfig";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});

app.mount("#app");
