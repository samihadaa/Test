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
        @editProduct="editProduct"
        @updateProduct="updateProduct"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import debounce from "./utils/debounce";

// Components
import SearchBar from "./components/SearchBar.vue";
import Filters from "./components/Filters.vue";
import ProductCard from "./components/ProductCard.vue";

// Role and Data
const role = "admin"; // Simulated role. Replace with actual logic.
const search = ref("");
const minPrice = ref("");
const maxPrice = ref("");
const selectedCategory = ref("");
const categories = ref([]); // Categories list

// GraphQL Queries and Mutations
const GET_PRODUCTS = gql`
  query getProducts(
    $search: String
    $minPrice: Float
    $maxPrice: Float
    $categoryId: ID
  ) {
    products(
      search: $search
      minPrice: $minPrice
      maxPrice: $maxPrice
      categoryId: $categoryId
    ) {
      id
      name
      price
      category {
        id
        name
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;

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

// Watch for category result and set it to categories list
computed(() => {
  if (categoryResult.value) {
    categories.value = categoryResult.value.categories;
  }
  console.log("categoryResult.value :>> ", categoryResult.value);
  console.log("categories.value :>> ", categories.value);
});

// Mutation for updating the product name
const UPDATE_PRODUCT_NAME = gql`
  mutation updateProductName($id: ID!, $name: String!) {
    updateProductName(id: $id, name: $name) {
      id
      name
    }
  }
`;
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

const editProduct = (productId) => {
  console.log("Editing product:", productId);
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
