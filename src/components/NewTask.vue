<template>
  <div>
    <Alert
      v-if="alertSwitch === true"
      :alertMessage="alertMessage"
      @alertSwitch="alertSwitch = false"
    ></Alert>

    <div class="card">
      <div class="card-body">
        <form action="" @submit.prevent="addNewTask">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="add-title"
              placeholder="Enter New Task"
              v-model="newTitle"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitDisabled"
          >
            Submit
          </button>
          <button class="btn btn-danger" @click="hideNewTaskForm">
            Cancel
          </button>
        </form>
      </div>
    </div>
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
  props: ['CategoryId', 'hideNewTaskForm', 'fetchAllCategories'],
  data() {
    return {
      dummy: 'text',
      newTitle: '',
      access_token: '',
      alertSwitch: false,
      alertMessage: {
        message: '',
        icon: '',
      },
    }
  },
  methods: {
    addNewTask() {
      console.log('ADD!')
      axios({
        method: 'POST',
        url: API + '/tasks',
        headers: {
          access_token: this.access_token,
        },
        data: {
          title: this.newTitle,
          CategoryId: this.CategoryId,
        },
      })
        .then(({ data }) => {
          console.log(data, 'SUCCESS ADD NEW TASK')
          this.hideNewTaskForm()
          this.fetchAllCategories()
        })
        .catch(({ response }) => {
          console.log(response.data.message)
          const message = response.data.message.join(', ')
          this.popsweetalert(message, 'error')
        })
    },
    popsweetalert(message, icon = 'success') {
      this.alertMessage.message = message
      this.alertMessage.icon = icon
      this.alertSwitch = true
    },
  },
  created() {
    console.log(this.CategoryId)
    this.access_token = localStorage.access_token
  },
  computed: {
    isSubmitDisabled() {
      return this.newTitle ? false : true
    },
  },
}
</script>

<style scoped></style>
