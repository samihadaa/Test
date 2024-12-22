const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float!
    categoryId: ID!
    category: Category @requires(fields: "categoryId")
  }

  extend type Category @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    products(
      search: String
      minPrice: Float
      maxPrice: Float
      categoryId: ID
    ): [Product!]!
  }

  type Mutation {
    updateProductName(id: ID!, name: String!): Product!
  }
`;

module.exports = typeDefs;
