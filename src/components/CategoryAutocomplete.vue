<template>
  <div class="combobox">
    <Combobox v-model="selectedCategory" nullable>
      <ComboboxInput
        @change="query = $event.target.value"
        :display-value="(category:any) => category.name"
      />
      <button v-if="queryCanAdd()" type="button" @click="createCategory">
        Add Lane...
      </button>
      <ComboboxOptions>
        <ComboboxOption
          v-for="category in filteredCategories"
          v-slot="{ active, selected }"
          :key="category._id"
          :value="category"
        >
          <li class="optionList">
            {{ category.name }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
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
import { useCategoryStore } from '@/stores/category';
import type { Category } from '@/stores/db';

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
  }

  ul {
    @apply static bottom-0 bg-red-50 border-2 rounded-md;
  }
}
</style>
