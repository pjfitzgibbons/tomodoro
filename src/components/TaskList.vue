<template>
  <div class="flex justify-center items-center v-screen">
    <table class="table-fixed w-10/12 border-2 rounded-l content-center">
      <thead>
      <tr>
        <th>Task</th>
        <th>Category</th>
        <th>Lane</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in taskStore.sortedTasks" v-bind:key="task._id">
        <td>{{ task.name }}<span>{{ task._id }}</span></td>
        <td>{{ task.category }}</td>
        <td>{{ task.lane }}</td>
        <td>{{ dateDisplay(task.startDate) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {useTaskStore} from 'stores/task';

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
