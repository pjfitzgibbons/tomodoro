import { defineStore } from "pinia";
import { uid } from "utils/customUtils";

interface TimerState {
  countdown: number;
  running: boolean;
  initialTime: number;
  intervalTimerId: any | undefined;
  countdownFormatter: Intl.DateTimeFormat;
  events: any
}
export const useTimerStore = defineStore("TimerStore", {
  state: ():TimerState => {
    return {
      countdown: 0,
      running: false,
      initialTime: 1500,
      intervalTimerId: undefined,
      countdownFormatter: new Intl.DateTimeFormat("en-US", {
        minute: "2-digit",
        second: "2-digit",
      }),
      events: {
        ticked: {},
      },
    };
  },
  actions: {
    startTicking() {
      console.log(`timerStore startTicking intervalId ${this.intervalTimerId}`);
      if (this.intervalTimerId !== undefined) return;

      this.intervalTimerId = setInterval(() => {
        this.tick();
      }, 1000);
    },
    tick() {
      // this.ticked();
      if (this.running && this.countdown > 0) {
        this.countdown -= 1;
        if (this.countdown <= 0) {
          this.running = false;
          this.completed();
        }
      }
    },
    cleanup() {
      if (this.intervalTimerId) clearInterval(this.intervalTimerId);
    },
    start() {
      if (this.running || this.countdown > 0) return;

      this.countdown = this.initialTime;
      this.running = true;
      console.log("triggering started event");
    },
    pause() {
      if (this.countdown > 0) {
        this.running = !this.running;
        // this.running ? this.running() : this.paused();
      }
    },
    cancel() {
      this.running = false;
      this.countdown = 0;
      this.cancelled();
    },
    ticked() {
      this.events.ticked = { name: "ticked", _id: uid() };
    },
    completed() {
      ///
    },
    cancelled() {
      ///
    },
  },
  getters: {
    formattedCountdown(state) {
      return state.countdownFormatter.format(state.countdown * 1000);
    },
  },
});
