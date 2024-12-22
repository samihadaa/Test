import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { provideApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "./stores/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

// Add Authorization Header
const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore(); 
  const token = authStore.role; 

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

provideApolloClient(apolloClient);

export { apolloClient };
