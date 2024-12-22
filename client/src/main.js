// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import '../src/assets/style.css';
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './apollo.js';

// Import Pinia
import { createPinia } from 'pinia';

// Create a new Vue app
const app = createApp(App);

// Create and use Pinia
const pinia = createPinia();
app.use(pinia);

// Provide Apollo Client globally
provideApolloClient(apolloClient);

// Mount the app
app.mount('#app');
