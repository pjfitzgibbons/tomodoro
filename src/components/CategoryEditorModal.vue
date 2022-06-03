<template>
  <button id="show-modal" @click="showModal = true">Show Modal</button>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal">
      <template #header>
        <h3>Edit Categories</h3>
      </template>
      <template #body>
        <ul>
          <li v-for="category in categories.sorted" :key="category._id">
            <input type="text" :value="category.name" />
          </li>
        </ul>
      </template>
      <template #footer>
        <button
            class="modal-default-button border-blue-300 border rounded-lg px-1 my-1"
            @click="showModal = false"
        >Close
        </button>
      </template>
    </modal>
  </Teleport>
</template>


<script>
import Modal from './Modal.vue'
import {useCategoryStore} from "../stores/category";
const categories = useCategoryStore()

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
      categories,
    }
  }
}
</script>

<style>
@tailwind components;
@layer components {
  .modal-container {
    @apply rounded-xl p-0 overflow-hidden
  }
  .modal-header {
    @apply bg-gray-300 text-center w-full overflow-clip
  }

  .modal-body {
    @apply px-3
  }

  .modal-footer {
    @apply px-3
  }
}

</style>
