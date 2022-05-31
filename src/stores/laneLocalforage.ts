import { defineStore } from "pinia";
import { lanes } from "@/stores/dbLocalforage";
import type { Lane } from "@/stores/dbLocalforage";
import { uid } from "@/utils/customUtils";

interface LaneStoreProps {
  lanes: Lane[] | null;
}

export const useLaneStore = defineStore("LaneStore", {
  state: (): LaneStoreProps => {
    return {
      lanes: null,
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
      const result: Lane[] = [];
      await lanes.iterate((val: Lane) => {
        console.log(val);
        result.push(val);
      });
      return result;
    },

    async saveLane(lane: Lane): Promise<Lane> {
      // re-pack lane - it might be a Proxy of Lane due to
      // vue reactivity object
      lanes.setItem<Lane>(lane._id, { ...lane });
      return lane;
    },
  },
});
