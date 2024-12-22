# Project Overview:

- This project implements a microservices architecture using Apollo GraphQL, where a Products, categories Services and a Gateway work together
- Data Fetching and editing permissions are role based
- The front end is built with Vue 3, Tailwind css and pinia for gobal storage

# Setup Instructions:

- Clone the project from the repositery

- cd to backend and npm install

- cd to client and npm install

- Open bash and run this services :

    node src/services/products/service.js
    node src/services/categories/service.js
    node src/gateway/gateway.js

-Finally cd to client and run npm run dev

# Usage:

- Use filters prices and debounce search

- change the role in the store/auth.js , and the edit button will appear and disappear based on role and authorization header will change also

# Notes:

- I found a problem with Apollo Server Auth : The auth worked great at first with graphql-yoga, but when i changed the logic 
to make gateway with Apollo server and tried to send context from the gateway to all subgraphs, it doesn't work
updating product name mutation and sending rounded prices work fine if you change manuallly from the backend role