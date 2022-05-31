<template>
  <div class="text-center">
    <div
      v-show="!isEditing"
      class="font-bold text-center mb-5"
      @click="isEditing = !isEditing"
    >
      {{ label || '_blank_' }}
    </div>
    <input
      v-show="isEditing"
      ref="input"
      class="form-input text-center"
      :value="label"
      @keyup.enter="keyupEnter"
      @keyup.esc="isEditing = false"
    />
  </div>
</template>

<script>
export default {
  name: 'EditableLabel',
  props: ['label'],
  emits: ['updateLabel'],
  data() {
    return {
      isEditing: this.label == '',
    };
  },
  watch: {
    isEditing(value) {
      if (value) {
        this.$nextTick(() => this.$refs.input.focus());
      }
    },
  },
  mounted() {
    if (this.isEditing) this.$refs.input.focus();
  },
  methods: {
    keyupEnter(event) {
      this.$emit('updateLabel', event.target.value);
      this.isEditing = false;
    },
  },
};
</script>

<style scoped></style>
