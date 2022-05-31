<template>
  <div>
    <div class="flex bg-slate-100 border-2 border-slate-400">
      <span class="flex-1">Trello Board</span>
      <button type="button" class="flex ml-auto" @click="addLane">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Add Lane</span>
      </button>
    </div>
    <div class="">
      <div class="v-screen flex overflow-scroll">
        <div
          v-for="lane in laneStore.sortedLanes"
          :key="lane._id"
          class="lane border-2 rounded-md min-w-250"
        >
          <editable-label
            :label="lane.name"
            @updateLabel="(label:string) => saveLane(lane, label)"
          ></editable-label>
          <div class="flex flex-row justify-end">
            <button @click="addTask(lane)">Add Task</button>
          </div>
          <task-card :task="task"></task-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';
import { LoremIpsum } from 'lorem-ipsum';
import type { Lane, Task } from '@/stores/db';
import { useLaneStore } from '@/stores/laneDexie';
import { db } from '@/stores/dbDexie';
import { onMounted, reactive } from 'vue';
import EditableLabel from '@/components/EditableLabel.vue';
import TaskCard from '@/components/TaskCard.vue';

const lorem = new LoremIpsum();

const task: Task = {
  _id: 'testTask',
  name: 'Task',
  category: 'Default',
  lane: 'Lane',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const sentence = () => lorem.generateSentences(2);
const range = (max: number) => Math.floor(Math.random() * max + 3);
const laneStore = useLaneStore();

onMounted(async () => {
  await laneStore.fetchLanes();
});

const addLane = async () => {
  const newLane: Lane = laneStore.newLane('');
  const savedLane = await laneStore.saveLane(newLane);
};

const saveLane = async (lane: Lane, name: string) => {
  lane.name = name;
  await laneStore.saveLane(lane);
};

const addTask = async (lane: Lane) => {
  console.log('addTask to lane ', lane.name);
};
</script>

<style scoped>
.lane {
  min-width: 250px;
  max-width: 250px;
}

.card {
  margin-bottom: 10px;
}

.card-body {
  border-top: 2px solid darkgray;
}

.bd-highlight {
  border: 1px solid gray;
  background-color: lightcyan;
}
</style>
