import Dexie from 'dexie';
import type { Table } from 'dexie';

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
    super('Tomodoro');
    this.version(5).stores({
      tasks: '_id',
      timers: '_id createdAt',
      lanes: '_id',
      categories: '_id',
    });
  }
}

export const db = new TomodoroDexie();
