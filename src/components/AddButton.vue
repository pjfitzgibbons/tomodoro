<template>
  <button type="button" :style="cssProps" @click="click">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
      />
    </svg>
  </button>
</template>
<script type="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'AddButton',
  props: {
    click: {type: Function, required: true},
    size: {type: String, default: "28px"}
  },
  computed: {
    cssProps() {
      return {
        '--button-size': (this.size)
      }
    }
  }
})
</script>
<style>
button {
  height: var(--button-size);
}
</style>
