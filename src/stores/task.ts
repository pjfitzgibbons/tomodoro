import { defineStore } from "pinia";
import { sortBy, reverse } from "lodash";
import { uid } from "@/utils/customUtils";
import { tasks } from "./dbLocalforage";
import type { Task } from "./dbLocalforage";

export const useTaskStore = defineStore("TaskStore", {
  state: () => {
    return {
      category: "DEFAULT",
      lane: "Tomodoro",
    };
  },
  actions: {
    async createTask({ name }: { name: string }) {
      const task: Task = {
        _id: uid(),
        name,
        category: this.category,
        lane: this.lane,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // return tasks.setItem();
    },
    async loadTasks() {
      // if (this.tasks !== null) return;
      // const list = await this.fetchTasks();
      // this.tasks = list;
    },
    updateTaskName(evt: any) {
      // this.taskName = evt.target.value;
    },
    updateCategory(evt: any) {
      this.category = evt.target.value;
    },

    async insertTask(task: Task) {
      console.log(`creating Task`, task);
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      return await response.json();
    },

    async fetchTasks() {
      console.log("taskStore loadTasks");
      const response = await fetch("http://localhost:3000/tasks");
      return await response.json();
    },

    async updateTask(task: Task) {
      console.log(`update Task ${task}`);
      const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      return await response.json();
    },
  },
  // getters: {
  //   sortedTasks: (state) => reverse(sortBy(state.tasks || [], ["startDate"])),
  // },
});
