import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $category: String, $minPrice: Float, $maxPrice: Float) {
    products(search: $search, category: $category, minPrice: $minPrice, maxPrice: $maxPrice) {
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

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;
