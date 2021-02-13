<template>
  <div>
    <Alert
      v-if="alertSwitch === true"
      :alertMessage="alertMessage"
      @alertSwitch="alertSwitch = false"
    ></Alert>
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
  props: ['fetchAllCategories', 'task', 'applyDeleteTask'],
  data() {
    return {
      access_token: '',
      alertSwitch: false,
      alertMessage: {
        message: '',
        icon: '',
      },
    }
  },
  methods: {
    DeleteTask() {
      console.log('DELETE!')
      axios({
        method: 'DELETE',
        url: API + `/tasks/${this.task.id}`,
        headers: {
          access_token: this.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data, 'SUCCESS DELETE TASK')
          this.applyDeleteTask(false)
          this.fetchAllCategories()
        })
        .catch(({ response }) => {
          console.log(response)
          // const message = response.data.message
          // this.popsweetalert(message, 'error')
        })
    },
    popsweetalert(message, icon = 'success') {
      this.alertMessage.message = message
      this.alertMessage.icon = icon
      this.alertSwitch = true
    },
  },
  created() {
    console.log(this.task.id)
    this.access_token = localStorage.access_token
    this.DeleteTask()
  },
}
</script>

<style scoped></style>
