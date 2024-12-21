// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

// Apollo Client Setup
const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

// Provide the Apollo Client globally
provideApolloClient(apolloClient);

export { apolloClient };
