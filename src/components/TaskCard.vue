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

<script setup lang="ts">
import { LoremIpsum } from 'lorem-ipsum';
import { defineComponent } from 'vue';
import type { Task } from '@/stores/db';
import EditableCategoryAutocomplete from './EditableCategoryAutocomplete.vue';

const lorem = new LoremIpsum();

const sentence = () => lorem.generateSentences(2);
</script>
<script lang="ts">
export default defineComponent({
  name: 'TaskCard',
  props: ['task'],
});
</script>
<style></style>
