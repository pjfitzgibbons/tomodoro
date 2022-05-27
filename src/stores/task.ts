import { defineStore } from "pinia";
import { sortBy, reverse } from "lodash";
import { uid } from "@/utils/customUtils";
import { db } from "./db";
import type { Task } from "./db";

export const useTaskStore = defineStore("TaskStore", {
  state: () => {
    return {
      taskName: "abc",
      category: "DEFAULT",
      lane: "Tomodoro",
      tasks: null,
    };
  },
  actions: {
    async createTask() {
      const task: Task = {
        _id: uid(),
        name: this.taskName,
        category: this.category,
        lane: this.lane,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return db.tasks.add(task);
    },
    async loadTasks() {
      if (this.tasks !== null) return;

      const list = await this.fetchTasks();
      this.tasks = list;
    },
    updateTaskName(evt: any) {
      this.taskName = evt.target.value;
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
  getters: {
    sortedTasks: (state) => reverse(sortBy(state.tasks || [], ["startDate"])),
  },
});
