const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { v4: uuidv4 } = require("uuid");
const debug = require("./utils/debug");

// todos 物件，直接存在記憶體內
const todos = [
  { id: uuidv4(), text: "Buy groceries", completed: false },
  { id: uuidv4(), text: "Walk the dog", completed: true },
];

// bind todos object into debugger
debug.bindTodos(todos);

// graphql typeDefs
const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: ID!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

// graphql resolvers
const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_, { text }) => {
      const newTodo = {
        id: uuidv4(),
        text,
        completed: false,
      };
      todos.push(newTodo);
      debug.addTodo(newTodo);
      return newTodo;
    },
    toggleTodo: (_, { id }) => {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        debug.toggleTodo(id);
        return todo;
      }
      return null;
    },
    deleteTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        debug.deleteTodo(id);
        return deletedTodo[0];
      }
      return null;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

/**
 * start server fn
 */
(async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    debug.logTodos();
  });
})();
