<template>
  <div>
    <div class="card">
      <div
        class="card-body"
        v-if="showEditTask === false && showMoveTask === false"
      >
        <h5 class="card-title">{{ task.title }}</h5>
        <small class="card-title"><span>By: </span>{{ task.User.name }}</small>
        <br />
        <div class="task-options">
          <button
            class="btn btn-primary mr-1"
            @click="showMoveTaskForm"
            v-if="uid == task.User.id"
          >
            <i class="fas fa-arrows-alt-h"></i>
          </button>
          <button
            class="btn btn-primary mr-1"
            @click="showEditTaskForm"
            v-if="uid == task.User.id"
          >
            <i class="fa fa-pen"></i>
          </button>
          <button
            class="btn btn-danger"
            @click="applyDeleteTask(true)"
            v-if="uid == task.User.id"
          >
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
      <MoveTask
        v-if="showMoveTask === true"
        :task="fetchTask"
        :hideMoveTaskForm="hideMoveTaskForm"
        :fetchAllCategories="fetchAllCategories"
        :categories="categories"
      ></MoveTask>
      <EditTask
        v-if="showEditTask === true"
        :task="fetchTask"
        :hideEditTaskForm="hideEditTaskForm"
        :fetchAllCategories="fetchAllCategories"
      ></EditTask>
      <DeleteTask
        v-if="deleteTask === true"
        :task="fetchTask"
        :applyDeleteTask="applyDeleteTask"
        :fetchAllCategories="fetchAllCategories"
      ></DeleteTask>
    </div>
  </div>
</template>

<script>
import EditTask from '../components/EditTask'
import MoveTask from '../components/MoveTask'
import DeleteTask from '../components/DeleteTask'

export default {
  props: ['task', 'fetchAllCategories', 'uid', 'categories'],
  components: {
    EditTask,
    MoveTask,
    DeleteTask,
  },
  data() {
    return {
      showEditTask: false,
      showMoveTask: false,
      deleteTask: false,
      dummy: 'text',
    }
  },
  methods: {
    showEditTaskForm() {
      this.showEditTask = true
    },
    hideEditTaskForm() {
      this.showEditTask = false
    },
    showMoveTaskForm() {
      this.showMoveTask = true
    },
    hideMoveTaskForm() {
      this.showMoveTask = false
    },
    applyDeleteTask(value) {
      this.deleteTask = value
    },
  },
  computed: {
    fetchTask() {
      return this.task
    },
  },
}
</script>

<style scoped>
.task-options {
  display: flex;
}
</style>
