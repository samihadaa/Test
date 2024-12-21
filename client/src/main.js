// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import '../src/assets/style.css';
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './apollo.js';

// Provide Apollo Client globally
provideApolloClient(apolloClient);

createApp(App).mount('#app');
