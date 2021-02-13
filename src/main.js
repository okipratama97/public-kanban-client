import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  GoogleSignInButton,
  render: (h) => h(App),
}).$mount('#app')
