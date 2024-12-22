// src/server.js
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { authMiddleware } = require("../../utils/auth");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Start the server
async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    context: ({ req }) => authMiddleware(req),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`Products Service running at ${url}`);
}

startServer();
