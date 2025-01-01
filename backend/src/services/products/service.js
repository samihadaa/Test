const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Start the server
async function startServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      console.log("Authorization header at subgraph:", token);  // Log token at subgraph
      return {
        user: token === "Bearer admin" ? { role: "admin" } : { role: "user" },
      };
    },
  });

  console.log(`Products Service running at ${url}`);
}

startServer();
