import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { provideApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "./stores/auth"; // Import the Pinia store

const httpLink = createHttpLink({
  uri: "http://localhost:4000/", // Your GraphQL server URL
});

// Add Authorization Header
const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore(); // Access the Pinia store
  const token = authStore.role; // Get the token from the store

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client Setup
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Provide the Apollo Client globally
provideApolloClient(apolloClient);

export { apolloClient };
