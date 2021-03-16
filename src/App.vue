<template>
  <div>
    <Alert
      v-if="alertSwitch === true"
      :alertMessage="alertMessage"
      @alertSwitch="alertSwitch = false"
    ></Alert>

    <div class="d-flex justify-content-end m-3">
      <button
        @click.prevent="login()"
        v-if="page === 'register'"
        class="btn btn-primary ml-auto"
      >
        LOGIN
      </button>
      <button
        @click.prevent="register()"
        v-if="page === 'login'"
        class="btn btn-primary ml-auto"
      >
        REGISTER
      </button>
      <button
        @click.prevent="logout()"
        v-if="page === 'main'"
        class="btn btn-danger ml-auto"
      >
        Logout <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>

    <Login v-if="page === 'login'" @setAuth="setAuth"></Login>
    <Register v-if="page === 'register'" @setAuth="setAuth"></Register>
    <Main
      v-if="page === 'main'"
      @setAuth="setAuth"
      :access_token="auth"
      :uid="uid"
    ></Main>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'
import Alert from './components/Alert.vue'
import Login from './views/Login'
import Register from './views/Register'
import Main from './views/Main'

export default {
  components: {
    Popper,
    Alert,
    Login,
    Register,
    Main,
  },
  data() {
    return {
      message: 'Hello world',
      alertSwitch: false,
      alertMessage: {
        message: '',
        icon: '',
      },
      page: 'login',
      auth: '',
      uid: 0,
    }
  },
  methods: {
    popsweetalert(message, icon = 'success') {
      this.alertMessage.message = message
      this.alertMessage.icon = icon
      this.alertSwitch = true
    },
    login() {
      this.page = 'login'
    },
    register() {
      this.page = 'register'
    },
    main() {
      this.page = 'main'
    },
    setAuth(access_token, uid) {
      this.auth = access_token
      this.uid = uid
      this.page = 'main'
    },
    logout() {
      localStorage.clear()
      this.page = 'login'
    },
  },
  created() {
    this.auth = localStorage.access_token || ''
    this.uid = localStorage.uid || 0
    if (this.auth) {
      this.main()
    }
  },
}
</script>

<style scoped></style>
