<template>
  <div class="container">
    <div class="row">
      <Category
        v-for="category in categories"
        :key="category.id"
        :category="category"
        class="col-lg-3 col-md-6 col-sm-12 mx-0"
        :fetchAllCategories="fetchAllCategories"
        :categories="categories"
        :uid="uid"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API } from '../utils/constants'
import Category from '../components/Category.vue'

export default {
  components: {
    Category,
  },
  props: ['access_token', 'uid'],
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    fetchAllCategories() {
      axios({
        url: API + '/categories',
        method: 'GET',
        headers: {
          access_token: this.access_token,
        },
      })
        .then(({ data }) => {
          this.categories = data
        })
        .catch(({ response }) => {
          console.log(response.data.message, '<<<<<<<< main ERROR')
          const message = response.data.message
        })
    },
  },
  created() {
    this.fetchAllCategories()
  },
}
</script>

<style scoped></style>
