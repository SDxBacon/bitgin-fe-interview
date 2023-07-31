import { Box, Typography, Paper } from "@mui/material";
import { useQuery, useMutation, gql } from "@apollo/client";

import TodoForm from "../components/TodoForm/TodoForm";
import TodoItem from "../components/TodoItem/TodoItem";
import BackdropLoading from "../components/BackdropLoading/BackdropLoading";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type TData = {
  todos: Todo[];
};

const GET_TODOS = gql`
  query {
    todos {
      id
      text
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

/**
 * TodoApp component
 */
const TodoApp = () => {
  const { loading, error, data } = useQuery<TData>(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleAddTodo = (text: string) => {
    if (text.trim() !== "") {
      addTodo({ variables: { text } });
    }
  };

  const handleToggleTodo = (id: Todo["id"]) => {
    toggleTodo({ variables: { id } });
  };

  const handleDeleteTodo = (id: Todo["id"]) => {
    deleteTodo({ variables: { id } });
  };

  /**
   * renderer
   */
  if (loading) return <BackdropLoading />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Box maxWidth={400} mx="auto" padding={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Next.js + GraphQL + MUI Todo List
      </Typography>

      {/* TodoForm */}
      <Paper component={TodoForm} onSubmit={handleAddTodo} />

      {
        /**
         * TodoList
         */
        data.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ))
      }
    </Box>
  );
};

export default TodoApp;
