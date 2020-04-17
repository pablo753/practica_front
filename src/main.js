import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Carros from './components/Carros'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import axios from 'axios'

//Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//Vue.use(axios)



const router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/carros/:id', component: Carros }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
