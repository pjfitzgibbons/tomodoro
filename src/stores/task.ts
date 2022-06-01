import { uid } from "@/utils/uid";
import type { Task } from "@/stores/db";
import {chain, filter} from "lodash";
import {db} from "@/stores/db";
import {makeAutoObservable} from "mobx";

interface TaskMap {
  [key: string]: Task
}

class ObservableTaskStore {

  tasks: TaskMap = {}
  isLoading = true

  constructor() {
    makeAutoObservable(this)

    this.fetchTasks()
  }

  newTask():Task {
    return {_id: uid(), name: '', lane: '', category: '', description: '', createdAt: new Date(), updatedAt: new Date()}
  }

  async fetchTasks() {
    if (!this.isLoading) return;
    console.log("fetchTasks")
    this.tasks = chain(await db.tasks.toArray())
      .keyBy('_id')
      .value();
    this.isLoading = false;
  }

    async saveTask(task: Task) {
      db.tasks.put({...task})
      this.tasks[task._id] = task
      return task
    }

    // get sortedTasks(lane:string | undefined) {
    //   return filter(this.tasks, (t) => lane ? t.lane == lane : true)
    // }
}

const taskStore = new ObservableTaskStore()
export default taskStore
