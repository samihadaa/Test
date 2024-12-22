const { getProducts, updateProductName } = require("./data");

const resolvers = {
  Product: {
    category: (product) => ({
      __typename: "Category",
      id: product.categoryId,
    }),
  },
  Query: {
    products: (
      _,
      { search = "", minPrice = null, maxPrice = null, categoryId = null },
      context
    ) => {
      const user = context.user || { role: "user" };  
      return getProducts({ search, minPrice, maxPrice, categoryId, role: user.role });
    },
  },
  Mutation: {
    updateProductName: (_, { id, name }, context) => {
      const user = context.user || { role: "user" };  
      if (user.role != "admin") {
        throw new Error("Forbidden: Insufficient permissions");
      }
      return updateProductName(id, name);
    },
  },
};

module.exports = resolvers;
