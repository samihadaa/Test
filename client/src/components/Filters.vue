<template>
  <div class="flex flex-col space-y-4">
    <!-- Loading State -->
    <div v-if="loading">Loading categories...</div>

    <!-- Category Dropdown -->
    <select v-else v-model="selected" @change="emitFilters">
      <option value="">All Categories</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <!-- Price Filters -->
    <input
      v-model="localMinPrice"
      type="number"
      placeholder="Min Price"
      @input="emitFilters"
    />
    <input
      v-model="localMaxPrice"
      type="number"
      placeholder="Max Price"
      @input="emitFilters"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { gql } from '@apollo/client/core';
import { useQuery } from '@vue/apollo-composable';

const props = defineProps({
  minPrice: String,
  maxPrice: String,
  selectedCategory: String,
});

const emit = defineEmits(['filtersUpdated']);

const selected = ref(props.selectedCategory || '');
const localMinPrice = ref(props.minPrice || '');
const localMaxPrice = ref(props.maxPrice || '');
const categories = ref([]);
const loading = ref(true);  // Loading state

// GraphQL Query for Categories
const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;

// Fetch categories
const { result, loading: queryLoading } = useQuery(GET_CATEGORIES);

watch(
  () => result.value,
  (newResult) => {
    if (newResult) {
      categories.value = newResult.categories;
      loading.value = false;
    }
  },
  { immediate: true }
);

watch(
  () => [props.minPrice, props.maxPrice, props.selectedCategory],
  ([newMin, newMax, newCat]) => {
    localMinPrice.value = newMin;
    localMaxPrice.value = newMax;
    selected.value = newCat;
  }
);

const emitFilters = () => {
  emit('filtersUpdated', {
    minPrice: localMinPrice.value,
    maxPrice: localMaxPrice.value,
    selectedCategory: selected.value,
  });
};
</script>

<style scoped>
select, input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
