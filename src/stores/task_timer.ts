import { defineStore } from 'pinia';

interface TaskTimer {
  taskId: string;
  timerId: string;
}

export const useTaskTimerStore = defineStore('TaskTimerStore', {
  state: (): { currentTaskTimer: TaskTimer | undefined } => {
    return {
      currentTaskTimer: undefined,
    };
  },
});
