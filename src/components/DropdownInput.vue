<template>
  <div class="col-auto">
    <label for="{{id}}" class="form-label">{{ title }}</label>
  </div>
  <div class="col-auto">
    <select v-if="!addNew" v-model="selected" class="form-select">
      <option selected></option>
      <option value="todos">Todos</option>
      <option value="backlog">Backlog</option>
    </select>
    <input
      v-if="addNew"
      id="{{id}}"
      v-model="selected"
      type="text"
      class="form-control"
      :placeholder="'Enter a value...'"
    />
    <div class="tooltip">
      <i class="bi bi-plus-square"></i>
      <span class="tooltip-text">Add New Lane...</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const title = 'Lane';
const key = 'Todos';
const id = key + 'Id';
const addNew = false;

const selected = ref('');
</script>
<style scoped>
i {
  font-size: 30px;
  font-weight: bolder;
  color: green;
}
</style>
