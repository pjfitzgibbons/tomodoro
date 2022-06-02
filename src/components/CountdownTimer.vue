<template>
  <div>
    <div className="timer">
      <span>{{ timerStore.formattedCountdown }}</span>
    </div>
  </div>
</template>
<script setup>
// import { onUnmounted } from 'vue';
// import { createNotification } from 'stores/notification';
import { useTimerStore } from 'stores/timer';
const timerStore = useTimerStore();
timerStore.startTicking();

// onUnmounted(() => {
//   timerStore.cleanup();
// });

// const setEventCb = (name) => timerStore.events[name]((e) => console.log(e));

// // setEventCb('onTick');
// setEventCb('onStarted');
// setEventCb('onPaused');
// setEventCb('onRunning');
// setEventCb('onCompleted');
// setEventCb('onCancelled');
// completed(event) {
//   console.log(event);
//   createNotification(`Timer is completed!!  Great Job!`);
// };

// return {
//   timer: timerStore.state,
//   events: timerStore.events,
// };
</script>

<style></style>
