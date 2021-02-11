<template>
  <div>
    <h1>{{ message }}</h1>

    <Alert
      v-if="alert_switch === true"
      :alert_message="alert_message"
      @alert_switch="alert_switch = false"
    ></Alert>

    <Popper
      trigger="clickToOpen"
      :options="{
        placement: 'top',
        modifiers: { offset: { offset: '0,10px' } },
      }"
    >
      <div class="popper">Popper Content</div>

      <button slot="reference" @click="popsweetalert('ref', 'error')">
        Reference Element
      </button>
    </Popper>

    <button @click.prevent="login()">GO TO LOGIN</button>

    <Login v-if="page === 'login'"></Login>
  </div>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import Alert from "./components/Alert.vue";
import Login from "./views/Login";

export default {
  components: {
    Popper,
    Alert,
    Login,
  },
  data() {
    return {
      message: "Hello world",
      alert_switch: false,
      alert_message: {
        message: "",
        icon: "",
      },
      page: "",
    };
  },
  methods: {
    popsweetalert(message, icon = "success") {
      this.alert_message.message = message
      this.alert_message.icon = icon
      this.alert_switch = true
    },
    login() {
      this.page = "login"
    },
  }
};
</script>

<style scoped>
</style>