<template>
  <div class="container">
    <Alert
      v-if="alertSwitch === true"
      :alertMessage="alertMessage"
      @alertSwitch="alertSwitch = false"
    ></Alert>

    <h1>
      {{ message }}
    </h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="login-email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="login-email"
          placeholder="Enter email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="login-password">Password</label>
        <input
          type="password"
          class="form-control"
          id="login-password"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <button
      v-google-signin-button="clientId"
      class="btn btn-danger google-signin-button btn-margin"
    >
      Continue with Google
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import { API } from '../utils/constants'
import Alert from '../components/Alert.vue'

export default {
  components: {
    Alert,
  },
  data() {
    return {
      alertSwitch: false,
      alertMessage: {
        message: '',
        icon: '',
      },
      message: 'LOGIN KANG',
      user: {
        email: '',
        password: '',
      },
      clientId:
        '669124168393-loiv81narsjln9ffoignjj6d0c8u81sv.apps.googleusercontent.com',
    }
  },
  methods: {
    login() {
      axios({
        url: API + '/login',
        method: 'POST',
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then(({ data }) => {
          const { access_token, id } = data
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('uid', id)

          this.$emit('setAuth', access_token, id)
        })
        .catch(({ response }) => {
          console.log(response.data.message, '<<<<<<<< LOGIN ERROR')
          const message = response.data.message
          this.popsweetalert(message, 'error')
        })
        .then((_) => {
          this.user = {
            email: '',
            password: '',
          }
        })
    },
    OnGoogleAuthSuccess(idToken) {
      // console.log(idToken)
      axios({
        url: API + '/googleLogin',
        method: 'POST',
        data: {
          tokenGoogle: idToken,
        },
      })
        .then(({ data }) => {
          const { access_token, id } = data
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('uid', id)

          this.$emit('setAuth', access_token, id)
        })
        .catch(({ response }) => {
          console.log(response.data.message, '<<<<<<<< LOGIN ERROR')
          const message = response.data.message
          this.popsweetalert(message, 'error')
        })
    },
    OnGoogleAuthFail(error) {
      console.log(error, error)
    },
    popsweetalert(message, icon = 'success') {
      this.alertMessage.message = message
      this.alertMessage.icon = icon
      this.alertSwitch = true
    },
  },
}
</script>

<style scoped>
.btn-margin {
  margin-top: 10px;
}
</style>
