// queries.js
import { gql } from "@apollo/client/core";

export const GET_PRODUCTS = gql`
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

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;
