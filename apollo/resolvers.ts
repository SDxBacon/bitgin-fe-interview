import db from "./database";

export const resolvers = {
  Query: {
    todos: () => db.data,
  },
  Mutation: {
    addTodo: (_, { text }) => {
      const newTodo = db.add(text);
      return newTodo;
    },
    toggleTodo: (_, { id }) => {
      const todo = db.data.find((todo) => todo.id === id);
      if (todo) {
        db.toggle(todo);
        return todo;
      }
      return null;
    },
    deleteTodo: (_, { id }) => {
      const index = db.data.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        return db.delete(index);
      }
      return null;
    },
  },
};
