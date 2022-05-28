import { defineStore } from "pinia";
import {db } from "@/stores/db";
import type { Lane } from "@/stores/db";
import {uid} from "@/utils/customUtils";

interface LaneStoreProps {
    lanes: Lane[] | null;
}
export const useLaneStore = defineStore("LaneStore", {
    state: ():LaneStoreProps => {
        return {
            lanes: null
        }
    },
    actions: {
        async loadLanes() {
            if (this.lanes !== null) return;

            const list = await this.fetchLanes();
            this.lanes = list;
        },
        async fetchLanes() {
            const response = db.lanes.toArray()
            return response
        },
        async addLane(name:string): Promise<Lane> {
            const newLane:Lane = {
                _id: uid(),
                name,
                order: 0
            }
            db.lanes.add(newLane)
            return newLane
        }
    }
})