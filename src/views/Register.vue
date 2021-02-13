<template>
  <div class="container">
    <Alert
      v-if="alert_switch === true"
      :alertMessage="alertMessage"
      @alert_switch="alert_switch = false"
    ></Alert>

    <h1>
      {{ message }}
    </h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="register-name">Name</label>
        <input
          type="text"
          class="form-control"
          id="register-name"
          placeholder="Enter name"
          v-model="user.name"
        />
      </div>
      <div class="form-group">
        <label for="register-email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="register-email"
          placeholder="Enter email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="register-password">Password</label>
        <input
          type="password"
          class="form-control"
          id="register-password"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
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
      alert_switch: false,
      alertMessage: {
        message: '',
        icon: '',
      },
      message: 'REGISTER KANG',
      user: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    register() {
      axios({
        url: API + '/register',
        method: 'POST',
        data: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then(({ data: { access_token, id } }) => {
          this.popsweetalert('Success Register')
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('uid', id)

          this.$emit('setAuth', access_token, id)
        })
        .catch(({ response }) => {
          console.log(response.data.message, '<<<<<<<< register ERROR')
          const message = response.data.message
          this.popsweetalert(message, 'error')
        })
        .then((_) => {
          this.user = {
            name: '',
            email: '',
            password: '',
          }
        })
    },
    popsweetalert(message, icon = 'success') {
      this.alertMessage.message = message
      this.alertMessage.icon = icon
      this.alert_switch = true
    },
  },
}
</script>

<style scoped></style>
