<template>
  <table class="table table-sm table-striped table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Task</th>
        <th>Category</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in taskStore.sortedTasks" v-bind:key="task._id">
        <td>{{ task._id }}</td>
        <td>{{ task.name }}</td>
        <td>{{ task.category }}</td>
        <td>{{ dateDisplay(task.startDate) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useTaskStore } from '@/stores/task';
const taskStore = useTaskStore();
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'medium',
});
function dateDisplay(date) {
  return dateFormatter.format(date) || 'Current';
}
</script>

<script>
export default {
  props: ['taskList'],
  methods: {},
};
</script>

<style></style>
