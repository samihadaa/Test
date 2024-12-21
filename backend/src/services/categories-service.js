const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { gql } = require("graphql-tag");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Furniture" },
];

const typeDefs = gql`
  type Category @key(fields: "id") {
    id: ID!
    name: String!
  }

  extend type Query {
    categories: [Category!]!
  }
`;

const resolvers = {
  Query: {
    categories: () => categories,
  },
  Category: {
    __resolveReference: (category) =>
      categories.find((c) => c.id === category.id),
  },
};

async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
  });

  console.log(`Categories Service running at ${url}`);
}

startServer();
