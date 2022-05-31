import { defineStore } from "pinia";
import type { Lane } from "@/stores/dbLocalforage";
import { db } from "@/stores/dbDexie";
import { uid } from "@/utils/customUtils";
import type { TomodoroDb } from "./dbDexie";
import { liveQuery } from 'dexie';
import type { Observable } from 'rxjs';
import { chain, sortBy } from 'lodash';
import * as _ from 'lodash';

interface LaneStoreProps {
  lanes: { [key:string]: Lane };
}

export const useLaneStore = defineStore("LaneStore", {
  state: (): LaneStoreProps => {
    return {
      lanes: {},
    };
  },
  actions: {
    newLane(name: string): Lane {
      return {
        _id: uid(),
        name,
        order: 0,
      };
    },
    async fetchLanes() {
      this.lanes = chain(await db.lanes.toArray())
      .keyBy("_id")
      .value();
    },

    async saveLane(lane: Lane): Promise<Lane> {
      // unwrap proxy object lane - it might be a Proxy of Lane due to
      // vue reactivity object
      await db.lanes.put({ ...lane });
      this.lanes[lane._id] = lane;
      return lane;
    },
  },
  getters: {
    sortedLanes(): Lane[] {
      return sortBy(this.lanes, 'order')
    }
  }
});
export { _ }