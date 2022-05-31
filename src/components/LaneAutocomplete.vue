<template>
  <div class="combobox">
    <Combobox v-model="selectedLane" nullable>
      <ComboboxInput
        @change="query = $event.target.value"
        :display-value="(lane:any) => lane.name"
      />
      <button v-if="queryCanAdd()" type="button" @click="createLane">
        Add Lane...
      </button>
      <ComboboxOptions>
        <ComboboxOption
          v-for="lane in filteredLanes"
          v-slot="{ active, selected }"
          :key="lane._id"
          :value="lane"
        >
          <li class="optionList">
            {{ lane.name }}
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
import { useLaneStore } from '@/stores/laneLocalforage';
import type { Lane } from '@/stores/db';

const laneStore = useLaneStore();
const lanes = reactive<{ [key: string]: Lane }>({});

const selectedLane = ref(lanes[0]);

const query = ref('');

const filteredLanes = computed(() => {
  let filteredLanes = [];
  // lanes((lane) => {
  //   return lane.name.toLowerCase().includes(query.value.toLowerCase());
  // });

  return query.value === '' ? lanes : filteredLanes;
});

onMounted(async () => {
  let result = await laneStore.fetchLanes();
  // result.map((l: Lane) => lanes.push(l));
  // console.log('mounted lanes', lanes);
});

const queryCanAdd = () => {
  console.log({ query: query.value, filteredPeople: filteredLanes.value });
  // if (query.value > '' && (filteredPeople.value.length == 0)) return true

  return (
    query.value > '' &&
    (filteredLanes.value.length == 0 ||
      query.value !== filteredLanes.value[0].name)
  );
};
const createLane = async () => {
  const newLane: Lane = await laneStore.addLane(query.value);
  lanes.unshift(newLane.name);
};
</script>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'lane-autocomplete',
  props: {
    id: { type: String, default: 'lane' },
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
