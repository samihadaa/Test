const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "products", url: "http://localhost:4001/graphql" },
    { name: "categories", url: "http://localhost:4002/graphql" },
  ],
});

async function startServer() {
  const server = new ApolloServer({ gateway, subscriptions: false });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Gateway running at ${url}`);
}

startServer();
