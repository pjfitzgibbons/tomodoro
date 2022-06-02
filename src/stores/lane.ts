import { defineStore } from "pinia";
import type { Lane } from "stores/db";
import { db } from "stores/db";
import { uid } from "utils/customUtils";
  import { chain } from 'lodash';
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
      return  chain(this.lanes)
        .sortBy('order')
        .value()
    }
  }
});
export { _ }
