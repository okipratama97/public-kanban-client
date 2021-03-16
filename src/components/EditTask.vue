<template>
  <div>
    <Alert
      v-if="alertSwitch === true"
      :alertMessage="alertMessage"
      @alertSwitch="alertSwitch = false"
    ></Alert>

    <div class="card-body">
      <form action="" @submit.prevent="EditTask">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="edit-title"
            placeholder="Enter Edit Task"
            v-model="editTitle"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitDisabled"
        >
          Submit
        </button>
        <button class="btn btn-danger" @click="hideEditTaskForm">
          Cancel
        </button>
      </form>
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
  props: ['hideEditTaskForm', 'fetchAllCategories', 'task'],
  data() {
    return {
      dummy: 'text',
      editTitle: '',
      access_token: '',
      alertSwitch: false,
      alertMessage: {
        message: '',
        icon: '',
      },
    }
  },
  methods: {
    EditTask() {
      console.log('EDIT!')
      axios({
        method: 'PATCH',
        url: API + `/tasks/${this.task.id}/title`,
        headers: {
          access_token: this.access_token,
        },
        data: {
          title: this.editTitle,
        },
      })
        .then(({ data }) => {
          console.log(data, 'SUCCESS EDIT TASK')
          this.fetchAllCategories()
          this.hideEditTaskForm()
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
    console.log(this.task.id)
    this.editTitle = this.task.title
    this.access_token = localStorage.access_token
  },
  computed: {
    isSubmitDisabled() {
      return this.editTitle ? false : true
    },
  },
}
</script>

<style scoped></style>
