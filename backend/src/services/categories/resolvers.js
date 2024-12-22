const { getCategories } = require("./data");

const resolvers = {
  Query: {
    categories: () => getCategories(),
  },
  Category: {
    __resolveReference: (category) => getCategories().find((c) => c.id === category.id),
  },
};

module.exports = resolvers;
