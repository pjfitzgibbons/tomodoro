<template>
  <form>
    <div class="row g-4">
      <div class="col-auto">
        <label for="taskName" class="form-label">Task Name</label>
      </div>
      <div class="col-auto">
        <input
          id="taskName"
          type="text"
          class="form-control"
          :value="taskStore.taskName"
          :placeholder="'Enter a Task Name... then click Start'"
          @input="taskStore.updateTaskName"
        />
      </div>
      <div class="col-auto">
        <label for="categoryName" class="form-label">Category</label>
      </div>
      <div class="col-auto">
        <input
          id="categoryName"
          type="text"
          class="form-control"
          :value="taskStore.category"
          :placeholder="'Enter a Category'"
          @input="taskStore.updateCategory"
        />
      </div>
      <dropdown-input key="lane" title="Lane"></dropdown-input>
    </div>
  </form>
</template>

<script setup>
import { useTaskStore } from '@/stores/task';
import DropdownInput from './DropdownInput.vue';
const taskStore = useTaskStore();
taskStore.loadTasks();
</script>
<script>
// CREATE ONCHANGE FOR REACTIVITY TO PARENT
// import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  props: ['modelValue'],
  data() {
    return {
      placeholder: 'Enter a Task Name... then click Start',
    };
  },
  computed: {
    // ...mapState(['taskName', 'category']),
  },
  // methods: {
  //   // ...mapActions(['task/updateTask', 'task/updateCategory']),
  //   update(keyvalue) {
  //     const updatedModel = {};
  //     // $emit('update:modelValue.category', $event.target.value);
  //   },
  // },
};
</script>

<style></style>
