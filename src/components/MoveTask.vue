<template>
  <div>
    <Alert
      v-if="alertSwitch === true"
      :alertMessage="alertMessage"
      @alertSwitch="alertSwitch = false"
    ></Alert>

    <div class="card-body">
      <form action="" @submit.prevent="MoveTask">
        <div class="form-group">
          <label for="move-options">Move to</label>
          <select
            class="form-control"
            id="move-options"
            v-model="selectedCategoryId"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              >{{ category.title }}</option
            >
          </select>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitDisabled"
        >
          Submit
        </button>
        <button class="btn btn-danger" @click="hideMoveTaskForm">
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
  props: ['hideMoveTaskForm', 'fetchAllCategories', 'task', 'categories'],
  data() {
    return {
      dummy: 'text',
      access_token: '',
      alertSwitch: false,
      alertMessage: {
        message: '',
        icon: '',
      },
      selectedCategoryId: 0,
    }
  },
  methods: {
    MoveTask() {
      console.log('MOVE!')
      axios({
        method: 'PATCH',
        url: API + `/tasks/${this.task.id}`,
        headers: {
          access_token: this.access_token,
        },
        data: {
          CategoryId: this.selectedCategoryId,
        },
      })
        .then(({ data }) => {
          console.log(data, 'SUCCESS MOVE TASK')
          this.fetchAllCategories()
          this.hideMoveTaskForm()
        })
        .catch(({ response }) => {
          console.log(response.data.message)
          const message = response.data.message
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
    console.log('MOV')
    console.log(this.categories)
    this.selectedCategoryId = this.task.CategoryId
    this.editTitle = this.task.title
    this.access_token = localStorage.access_token
  },
  computed: {
    isSubmitDisabled() {
      return this.editTitle ? false : true
    },
    categoriesOptions() {},
  },
}
</script>

<style scoped></style>
