
import type { Table } from "dexie";
import Dexie from "dexie";

export interface Task {
  _id: string;
  name: string;
  category: string;
  lane: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Timer {
  _id: string;
  taskId: string;
  createdAt: Date;
  duration: number;
  complete: boolean;
}

export interface Lane {
  _id: string;
  name: string;
  order: number;
}

export interface Category {
  _id: string;
  name: string;
}

export class TomodoroDexie extends Dexie {
  tasks!: Table<Task>;
  timers!: Table<Timer>;
  lanes!: Table<Lane>;
  categories!: Table<Category>;

  constructor() {
    super("Tomodoro");
    this.version(1).stores({
      lanes: "_id",
    });
    this.version(2).stores({
      lanes: "_id,name",
    });
    this.version(6).stores({
      categories: "_id,name",
      tasks: "_id,name",
      timers: "_id,name"
    });
    console.log("constructed");
  }
}
export const db = new TomodoroDexie();

