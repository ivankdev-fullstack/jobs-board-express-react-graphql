# Description

Jobs board is a fullstack application with user authentification to view jobs created with using graphql technology.

## Techonologies used

- **Express.js:** A minimal and flexible Node.js web framework that simplifies building APIs and web applications with middleware support.

- **TypeScript:** A statically typed superset of JavaScript that enhances code quality, maintainability, and developer experience.

- **Knex.js:** A SQL query builder for Node.js that provides an intuitive API for managing database interactions with support for migrations and multiple database dialects.

- **JWT:** A compact, URL-safe token format used for securely transmitting authentication and authorization data between parties.

- **React 18:** The latest version of the React library with features like automatic batching, concurrent rendering, and improved server-side rendering for better performance.

- **GraphQL:** A query language and runtime for APIs that allows clients to request only the data they need, improving efficiency and flexibility in data fetching.

- **Apollo:** A GraphQL implementation that provides client and server tools for building scalable, real-time applications with advanced caching, state management, and schema stitching.

## Installation & Configuration

Install npm packages for `backend` and `frontend` directories and run codegen to generated blocks of code to manage with database entities.

```bash
$ npm install && npm run codegen
```

Fill up `.env` files.

`backend`:

```bash
# APP
PORT=3333
```

`frontend`:

```bash
# APP
VITE_PORT=3000
VITE_API_URL='http://localhost:3333'

# AUTH
VITE_ACCESS_TOKEN_KEY=
```

## Running the app

```bash
$ npm run dev # same for both directories
```
