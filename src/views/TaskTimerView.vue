<template>
  <div>
    <div>
      <CountdownControlsVue
        @onStart="clickStart"
        @onPause="clickPause"
        @onCancel="clickCancel"
      ></CountdownControlsVue>
      <CountdownTimerVue></CountdownTimerVue>
      <TaskInputVue></TaskInputVue>
    </div>
    <TaskListVue></TaskListVue>
  </div>
</template>

<script setup lang="ts">
import { useTimerStore } from '@/stores/timer';
import CountdownControlsVue from '@/components/CountdownControls.vue';
import CountdownTimerVue from '@/components/CountdownTimer.vue';
import TaskInputVue from '@/components/TaskInput.vue';
import TaskListVue from '@/components/TaskList.vue';

const timerStore = useTimerStore();
timerStore.startTicking();

const clickPause = () => {
  ///
};

const clickCancel = () => {
  ///
};

// const taskNameChange = (value) => {
//   console.log(value);
//   this.currentTaskName = value;
// };
</script>
