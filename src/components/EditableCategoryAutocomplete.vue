<template>
  <div class="text-center">
    <div
      v-show="!isEditing"
      class="font-bold text-center mb-5"
      @click="isEditing = !isEditing"
    >
      {{ category || '_blank_' }}
    </div>
    <category-autocomplete
      v-show="isEditing"
      id="category"
      ref="input"
    ></category-autocomplete>
  </div>
</template>

<script setup lang="ts">
import CategoryAutocomplete from '@/components/CategoryAutocomplete.vue';
</script>
<script lang="ts">
export default {
  name: 'EditableCategoryAutocomplete',
  props: ['category'],
  emits: ['updateLabel'],
  data() {
    return {
      isEditing: this.category == '',
    };
  },
  watch: {
    isEditing(value) {
      if (value) {
        // this.$nextTick(() => this.$refs.input.focus());
      }
    },
  },
  mounted() {
    // if (this.isEditing) this.$refs.input.focus();
  },
  methods: {
    keyupEnter(event) {
      this.$emit('updateLabel', event.target.value);
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
input {
  max-height: 20px;
  padding: 0px;
  margin: 0px;
}
</style>
