<template>
  <div class="combobox">
    <Combobox v-model="selectedPerson">
      <ComboboxInput  @change="query = $event.target.value"/>
      <ComboboxOptions >
        <ComboboxOption
            v-for="person in filteredPeople"
            v-slot="{ active, selected }"
            :key="person"
            :value="person"
        >
          <li
              class="optionList"
          >
            {{ person }}
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue'

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
]
const selectedPerson = ref(people[0])
const query = ref('')

const filteredPeople = computed(() =>
    query.value === ''
        ? people
        : people.filter((person) => {
          return person.toLowerCase().includes(query.value.toLowerCase())
        })
)
</script>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "lane-autocomplete",
  props: {
    id: { type:String, default: 'lane' }
  }
})
</script>
<style scoped>
@tailwind components;
@layer components {
  .combobox { @apply relative }
  .optionList {
    @apply text-slate-600
  }

  .optionList:hover {
    @apply bg-cyan-100
  }

  input {
    @apply static top-0 border-2 rounded-xl
  }
  ul {
    @apply static bottom-0 bg-red-50 border-2 rounded-md }
}
</style>