<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">{{ category.title }}</h5>
      </div>
      <div class="card-body card-task">
        <Task
          v-for="task in category.Tasks"
          :key="task.id"
          :task="task"
          :fetchAllCategories="fetchAllCategories"
          :uid="uid"
          :categories="categories"
        ></Task>
        <NewTask
          v-if="showNewTask"
          :CategoryId="category.id"
          :hideNewTaskForm="hideNewTaskForm"
          :fetchAllCategories="fetchAllCategories"
        ></NewTask>
      </div>
      <div class="card-footer">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <button class="btn btn-success" @click="showNewTaskForm">
              Add Task
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Task from './Task'
import NewTask from './NewTask'
export default {
  components: {
    Task,
    NewTask,
  },
  props: ['category', 'fetchAllCategories', 'uid', 'categories'],
  data() {
    return {
      dummy: 'text',
      showNewTask: false,
    }
  },
  methods: {
    showNewTaskForm() {
      this.showNewTask = true
    },
    hideNewTaskForm() {
      this.showNewTask = false
    },
  },
}
</script>

<style scoped>
.card-title {
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0 !important;
}

.card-task {
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: 600px;
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.card-task::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.card-task {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
