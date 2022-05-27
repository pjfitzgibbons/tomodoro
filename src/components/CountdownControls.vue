<template>
  <div class="container-sm">
    <h1 class="text-3xl font-bold">Countdown</h1>
    <div className="controls">
      <button id="start" type="button" class="btn" @click="timerStore.start">
        Start
      </button>
      <button
        id="pause"
        type="button"
        class="btn btn-sm btn-outline-secondary"
        @click="timerStore.pause"
      >
        Pause
      </button>
      <button
        id="cancel"
        type="button"
        class="btn btn-sm btn-outline-danger"
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
@layer components {
  .btn {
    @apply border-solid border-2 rounded mx-1 p-1 border-slate-600;
  }
}
</style>
