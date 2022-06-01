import type {Lane} from '@/stores/db';
import {db} from '@/stores/db';
import {uid} from '@/utils/uid';
import {chain, sortBy} from 'lodash';
import {makeAutoObservable} from 'mobx'

interface LaneMap {
  [key: string]: Lane
}


class ObservableLaneStore {
  lanes: LaneMap = {};
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this)

    this.fetchLanes()
  }

  async fetchLanes() {
    if (!this.isLoading) return;
    console.log("fetchLanes")
    this.lanes = chain(await db.lanes.toArray())
      .keyBy('_id')
      .value();
    this.isLoading = false;
  }

  async saveLane(lane: Lane): Promise<Lane> {
    // unwrap proxy object lane - it might be a Proxy of Lane due to
    // vue reactivity object
    await db.lanes.put({...lane});
    this.lanes[lane._id] = lane;
    return lane;
  }

  get sortedLanes(): Lane[] {
    return sortBy(this.lanes, 'order');
  }
}


const newLane = (): Lane => {
  return {
    _id: uid(),
    name: '',
    order: 0,
  };
}

const laneStore = new ObservableLaneStore();
export default laneStore;
export { newLane }
