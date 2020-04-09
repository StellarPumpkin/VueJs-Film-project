import Vue from "vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import ThisFilm from "./components/ThisFilm.vue";





Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/thisFilm/:id",
    name: "ThisFilm",
    component: ThisFilm
}
];

const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
