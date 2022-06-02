import {defineStore} from "pinia";
import { chain } from "lodash";
import {uid} from "utils/customUtils";
import {db} from "./db";
import type {Task} from "./db";

export const newTask = ({name, lane}: { name: string, lane: string }): Task => {
  return {
    _id: uid(),
    name,
    description: '',
    category: '',
    lane: lane,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  // return tasks.setItem();
}

interface TaskStoreState {
  tasks: { [key: string]: Task }
  isLoading: boolean;
}

export const useTaskStore = defineStore("TaskStore", {
  state: (): TaskStoreState => {
    return {
      tasks: {},
      isLoading: true
    };
  },
  actions: {

    async fetchTasks() {
      console.log("taskStore loadTasks");
      this.tasks = chain(await db.tasks.toArray())
        .keyBy('_id')
        .value();
      this.isLoading = false;
    },

    async saveTask(task: Task) {
      await db.tasks.put({...task})
      this.tasks[task._id] = task
      return await task;
    },
  },
  getters: {
    sortedTasks: (state) => chain(state.tasks)
      .values()
      .sortBy(['startDate'])
      .reverse()
      .value(),
  },
});
