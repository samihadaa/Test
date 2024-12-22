// src/services/products/resolvers.js
const { getProducts, updateProductName } = require("./data");

const resolvers = {
  Product: {
    category: (product) => ({ __typename: "Category", id: product.categoryId }),
  },
  Query: {
    products: (
      _,
      { search = "", minPrice = null, maxPrice = null, categoryId = null },
      context
    ) => {
      const { role } = context;
      return getProducts({ search, minPrice, maxPrice, categoryId, role });
    },
  },
  Mutation: {
    updateProductName: (_, { id, name }, context) => {
      const { role } = context;
      if (role !== "admin") throw new Error("Forbidden");
      return updateProductName(id, name);
    },
  },
};

module.exports = resolvers;
