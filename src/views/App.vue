<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/board">Task Board</router-link></li>
        <li><router-link to="/">Task Timer</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    onTimerComplete() {
      console.log('Timer Completed!');
    },
  },
});
</script>
