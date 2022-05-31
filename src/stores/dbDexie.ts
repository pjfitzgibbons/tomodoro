import type { Table } from "dexie";
import type { Lane, Category } from '@/stores/db';
import Dexie from "dexie";

export class TomodoroDb extends Dexie {
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
    this.version(3).stores({
      categories: "_id,name",
    });
    console.log("constructed");
  }
}
export const db = new TomodoroDb();
