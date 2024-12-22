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

const props = defineProps({
  search: String,
});

const emit = defineEmits(['searchUpdated']);

const localSearch = ref(props.search);

const onInput = () => {
  emit('searchUpdated', localSearch.value);
};

watch(() => props.search, (newValue) => {
  localSearch.value = newValue;
});
</script>
