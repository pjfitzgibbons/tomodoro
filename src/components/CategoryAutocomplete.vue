<template>
  <div class="flex flex-row">
    <select>
      <option v-for="category in store.sorted" :key="category._id">
        {{category.name}}
      </option>
    </select>
    <CategoryEditorModal></CategoryEditorModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue';
import { useCategoryStore } from 'stores/category';
import type { Category } from 'stores/db';
import AddButton from "components/AddButton.vue";
import CategoryEditorModal from "components/CategoryEditorModal.vue";

const store = useCategoryStore();

const selectedCategory = ref('');

const query = ref('');

const filteredCategories = computed(() => {
  let filteredCategories = [];
  // categories((category) => {
  //   return category.name.toLowerCase().includes(query.value.toLowerCase());
  // });

  return query.value === ''
    ? store.sorted
    : filter(store.sorted, (c) => c.name.startsWith(query.value));
});

onMounted(async () => {
  store.fetchCategories();
  // result.map((l: Lane) => categories.push(l));
  // console.log('mounted categories', categories);
});

const queryCanAdd = () => {
  console.log({ query: query.value, filteredPeople: filteredCategories.value });
  // if (query.value > '' && (filteredPeople.value.length == 0)) return true

  return (
    query.value > '' &&
    (filteredCategories.value.length == 0 ||
      query.value !== filteredCategories.value[0].name)
  );
};
const createCategory = async () => {
  const newRec: Category = store.newCategory(query.value);
  store.save(newRec);
};

const addCategory = (event:any) => {
  console.log("addCategory", event.target.value)
}
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { filter } from 'lodash';

export default defineComponent({
  name: 'category-autocomplete',
  props: {
    category: { type: String, default: 'category' },
  },
});
</script>

<style scoped>
@tailwind components;
@layer components {
  .combobox {
    @apply relative;
  }

  .optionList {
    @apply text-slate-600;
  }

  .optionList:hover {
    @apply bg-cyan-100;
  }

  input {
    @apply static top-0 border-2 rounded-xl;
    max-height: 28px;
    max-width: 200px;
    text-align: left;
  }

  ul {
    @apply static bottom-0 bg-red-50 border-2 rounded-md;
    max-width: 200px;
  }
}
</style>
