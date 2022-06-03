<template>
  <div class="card m-0.5 overflow-hidden border-2 rounded-xl">
    <div class="items-stretch text-center bg-gray-300">
      <EditableCategoryAutocomplete
        :category="task.category"
      ></EditableCategoryAutocomplete>
    </div>
    <div class="card-body">
      <div class="font-bold">Title</div>
      <div class="">
        {{ sentence() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoremIpsum } from 'lorem-ipsum';
import EditableCategoryAutocomplete from 'components/CategoryEditorModal.vue';

const lorem = new LoremIpsum();

import type { Task } from 'stores/db';
import {defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: 'TaskCard',
  components: { EditableCategoryAutocomplete },
  props: {
    task: { type: Object as PropType<Task> }
  },
  methods: {
    sentence: () => lorem.generateSentences(2)
  }
});
</script>
<style></style>
