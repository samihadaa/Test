<template>
  <div class="container mx-auto p-4">
    <!-- Search Bar -->
    <SearchBar :search="search" @searchUpdated="onSearchUpdated" />

    <!-- Filters -->
    <Filters
      :categories="categories"
      :minPrice="minPrice.toString()"
      :maxPrice="maxPrice.toString()"
      :selectedCategory="selectedCategory"
      @filtersUpdated="onFiltersUpdated"
    />

    <!-- Products List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :isAdmin="role === 'admin'"
        @updateProduct="updateProduct"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useAuthStore } from "./stores/auth";
import debounce from "./utils/debounce";

// Components
import SearchBar from "./components/SearchBar.vue";
import Filters from "./components/Filters.vue";
import ProductCard from "./components/ProductCard.vue";

// GraphQL Queries and Mutations
import { GET_PRODUCTS, GET_CATEGORIES } from "./graphql/queries";
import { UPDATE_PRODUCT_NAME } from "./graphql/mutations";

// Role and Data
const { role } = useAuthStore();
const search = ref("");
const minPrice = ref("");
const maxPrice = ref("");
const selectedCategory = ref("");
const categories = ref([]);

// Product Query
const { result: productResult, refetch: refetchProducts } = useQuery(
  GET_PRODUCTS,
  computed(() => ({
    search: search.value,
    minPrice: minPrice.value ? parseFloat(minPrice.value) : null,
    maxPrice: maxPrice.value ? parseFloat(maxPrice.value) : null,
    categoryId: selectedCategory.value || null,
  }))
);

// Category Query
const { result: categoryResult } = useQuery(GET_CATEGORIES);

computed(() => {
  if (categoryResult.value) {
    categories.value = categoryResult.value.categories;
  }
});

// Mutation for updating the product name
const { mutate } = useMutation(UPDATE_PRODUCT_NAME);

// Debounced search
const debouncedSearch = debounce(() => refetchProducts(), 300);

// Event Handlers
const onSearchUpdated = (value) => {
  search.value = value;
  debouncedSearch();
};

const onFiltersUpdated = ({
  minPrice: min,
  maxPrice: max,
  selectedCategory: category,
}) => {
  minPrice.value = min;
  maxPrice.value = max;
  selectedCategory.value = category;
  refetchProducts();
};

const updateProduct = (product) => {
  mutate({ id: product.id, name: product.name })
    .then(() => {
      console.log("Product updated successfully");
    })
    .catch(console.error);
};

// Filtered products
const filteredProducts = computed(() => productResult.value?.products || []);
</script>
