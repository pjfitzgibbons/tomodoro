<template>
  <div class="grid place-items-center items-center">
    <h1 class="text-3xl font-bold">Countdown</h1>
    <div className="controls">
      <button id="start" type="button" class="btn bg-green-200" @click="timerStore.start">
        Start
      </button>
      <button
        id="pause"
        type="button"
        class="btn bg-amber-100"
        @click="timerStore.pause"
      >
        Pause
      </button>
      <button
        id="cancel"
        type="button"
        class="btn bg-rose-300"
        @click="timerStore.cancel"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTimerStore } from '@/stores/timer';
const timerStore = useTimerStore();
</script>

<style>
@tailwind components;
@layer components {
  .btn {
    @apply border-solid border-4 rounded mx-1 p-1 border-slate-500;
  }
}
</style>
