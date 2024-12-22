const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { authMiddleware } = require("../utils/auth.js"); // Import auth middleware

// IntrospectAndCompose allows introspecting and composing schemas from remote services
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "products", url: "http://localhost:4001/graphql" },
      { name: "categories", url: "http://localhost:4002/graphql" }
    ],
  }),
});

async function startServer() {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req }) => authMiddleware(req),  // Use the auth middleware for authentication
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Gateway running at ${url}`);
}

startServer();
