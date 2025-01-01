const { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.user) {
      request.http.headers.set(
        "authorization",
        context.user.role === "admin" ? "Bearer admin" : "Bearer user"
      );
    }
  }
} const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "products", url: "http://localhost:4001/graphql" },
      { name: "categories", url: "http://localhost:4002/graphql" },
    ],
  }),
  buildService({ url }) {
    return new AuthenticatedDataSource({
      url
    });
  },
});

async function startServer() {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const user = token === "Bearer admin" ? { role: "admin" } : { role: "user" };
      return { user };
    },
  });

  console.log(`Gateway running at ${url}`);
}

startServer();
