import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Home from './components/Home.vue';
import Gallery from './components/Gallery.vue';
import Random from './components/RandomGallery.vue';

import Vuelidate from 'vuelidate';

//Font Awesome 
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faAngleRight)
library.add(faAngleLeft)
library.add(faAngleDoubleLeft);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;



Vue.config.productionTip = false

Vue .use(VueRouter)
    .use(Vuelidate);

const routes = [
  {path: '/home', component: Home},
  {path: '/gallery', component: Gallery},
  {path: '/random', component: Random},
  {path: '', redirect: '/home'}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
