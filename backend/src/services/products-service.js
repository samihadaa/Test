const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { gql } = require("graphql-tag");
const { buildSubgraphSchema } = require("@apollo/subgraph");

// Sample product data
const products = [
  {
    id: "1",
    name: "Product A",
    price: 100.5,
    categoryId: "1",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/05856ac7-0129-4395-bd6e-2fe2669025fb/custom-nike-dunk-low-by-you-su24.png",
  },
  {
    id: "2",
    name: "Product B",
    price: 200.0,
    categoryId: "2",
    image:
      "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw96b95243/nk/ac0/4/7/f/4/f/ac047f4f_ce27_4b18_94c4_1d1e77557f09.jpg?sw=700&sh=700&sm=fit&q=100&strip=false",
  },
  {
    id: "3",
    name: "Product C",
    price: 50.0,
    categoryId: "1",
    image:
      "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/1ce2d648-a532-4b4c-9bc7-d251341acd69/NIKE+AIR+MAX+SOLO.png",
  },
  {
    id: "4",
    name: "Product D",
    price: 300.0,
    categoryId: "2",
    image:
      "https://c.static-nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/g1ljiszo4qhthfpluzbt/123-joyride-cdp-apla-xa-xp.jpg",
  },
];

// GraphQL Schema Definition
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

// Resolver logic
const resolvers = {
  Product: {
    category: (product) => ({ __typename: "Category", id: product.categoryId }),
  },
  Query: {
    products: (
      _,
      { search = "", minPrice = null, maxPrice = null, categoryId = null }
    ) => {
      return products.filter((product) => {
        // Filter by search (name)
        const matchesSearch =
          !search || product.name.toLowerCase().includes(search.toLowerCase());

        // Filter by minPrice
        const matchesMinPrice = minPrice === null || product.price >= minPrice;

        // Filter by maxPrice
        const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;

        // Filter by categoryId
        const matchesCategory =
          categoryId === null || product.categoryId === categoryId;

        // Return products that match all criteria
        return (
          matchesSearch && matchesMinPrice && matchesMaxPrice && matchesCategory
        );
      });
    },
  },
  Mutation: {
    updateProductName: (_, { id, name }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");
      product.name = name;
      return product;
    },
  },
};

// Start the server
async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`Products Service running at ${url}`);
}

startServer();
