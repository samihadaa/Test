<template>
  <div class="p-4 border rounded">
    <div class="flex justify-between">
      <div>
        <p class="font-bold">{{ product.name }}</p>
        <p class="text-gray-500">Price: ${{ product.price }}</p>
      </div>
      <!-- Edit Button -->
      <button
        v-if="isAdmin"
        @click="startEditing"
        class="text-blue-500 hover:text-blue-700"
      >
        Edit
      </button>
    </div>
    <div v-if="isEditing">
      <input
        v-model="localName"
        type="text"
        class="border p-2 mt-2"
        @blur="saveChanges"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props and Emits
const props = defineProps({
  product: Object,
  isAdmin: Boolean,
});

const emit = defineEmits(['editProduct', 'updateProduct']);

// Local State
const isEditing = ref(false);
const localName = ref(props.product.name);

// Edit Product
const startEditing = () => {
  isEditing.value = true;
};

// Save Changes
const saveChanges = () => {
  isEditing.value = false;
  if (localName.value !== props.product.name) {
    emit('updateProduct', { ...props.product, name: localName.value });
  }
};
</script>
