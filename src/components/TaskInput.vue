<template>
  <form>
    <div class="flex flex-row space-x-2">
      <div class="flex flex-col">
        <label for="taskName" class="">Task Name</label>
        <input
            id="taskName"
            type="text"
            class="input font-semibold"
            :value="taskStore.taskName"
            :placeholder="'Enter a Task Name... then click Start'"
            @input="taskStore.updateTaskName"
        />
      </div>
      <div class="flex flex-col">
        <label for="categoryName" class="form-label">Category</label>
        <input
            id="categoryName"
            type="text"
            class="input"
            :value="taskStore.category"
            :placeholder="'Enter a Category'"
            @input="taskStore.updateCategory"
        />
      </div>
      <div class="flex flex-col">
        <label class="form-label">Lane</label>
        <lane-autocomplete id="lane"></lane-autocomplete>
      </div>
    </div>
  </form>
</template>

<script setup>
import {useTaskStore} from 'stores/task';
import DropdownInput from './DropdownInput.vue';
import LaneAutocomplete from "components/LaneAutocomplete.vue";

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

<style>
@tailwind components;
@layer components {
  .input {
    @apply rounded-xl font-semibold
  }
}
</style>
