<template>
  <div class="my-4">
    <input
      v-model="localSearch"
      type="text"
      placeholder="Search for products..."
      class="border p-2 w-full"
      @input="onInput"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props and Emits
const props = defineProps({
  search: String,
});

const emit = defineEmits(['searchUpdated']);

// Local State
const localSearch = ref(props.search);

// Emit updated search value
const onInput = () => {
  emit('searchUpdated', localSearch.value);
};

// Sync prop with local value
watch(() => props.search, (newValue) => {
  localSearch.value = newValue;
});
</script>
