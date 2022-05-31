import localforage from "localforage";
import { bindCallback, bindNodeCallback } from "rxjs";

export { localforage, bindCallback, bindNodeCallback };

export const tasks = localforage.createInstance({ name: "tasks" });

export const timers = localforage.createInstance({ name: "timers" });

export const lanes = localforage.createInstance({ name: "lanes" });


export const categories = localforage.createInstance({ name: "categories" });
//
// export class TomodoroDexie extends Dexie {
//   tasks!: Table<Task>;
//   timers!: Table<Timer>;
//   lanes!: Table<Lane>;
//   categories!: Table<Category>;
//
//   constructor() {
//     super('Tomodoro');
//     this.version(1).stores({
//       tasks: '_id',
//       timers: '_id createdAt',
//       lanes: '_id',
//       categories: '_id',
//     });
//   }
// }
//
// export const db = new TomodoroDexie();
// db.open()
