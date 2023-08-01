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
  /** Mutation: addTodo */
  const [addTodo] = useMutation(ADD_TODO, {
    // 把伺服器回傳的新的 todo 物件，加進 cache 中
    update(cache, { data: { addTodo: newToDo } }) {
      cache.updateQuery({ query: GET_TODOS }, (data) => ({
        todos: data.todos.concat(newToDo),
      }));
    },
  });
  /** Mutation: toggleTodo */
  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    update(cache, { data: { toggleTodo } }) {
      // 如果 target.id 不存在，API會回傳 null
      if (!toggleTodo) return;

      cache.modify({
        fields: {
          todos(existingTodos = []) {
            // existingTodos 是空陣列，do nothing
            if (!existingTodos.length) return existingTodos;
            /**
             * 如果 existingTodos 有值 & Id 在列表中，更新 cache
             */
            const index = existingTodos.findIndex(
              (todo) => todo.id === toggleTodo?.id
            );
            if (index > -1) {
              // create newTodoRef
              const newTodoRef = cache.writeFragment({
                data: toggleTodo,
                fragment: gql`
                  fragment ToggledTodo on Todo {
                    id
                    completed
                  }
                `,
              });
              const nextTodos = [...existingTodos]; // swallow clone todos object
              nextTodos[index] = newTodoRef; // replace newTodoRef
              return [...existingTodos]; // return
            }

            return existingTodos;
          },
        },
      });
    },
  });
  /** Mutation: deleteTodo */
  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(cache, { data: { deleteTodo } }) {
      // 如果 target.id 不存在，API會回傳 null
      if (!deleteTodo) return;
      // 過濾出不含被刪除的 Todo 物件們，更新 cache
      cache.updateQuery({ query: GET_TODOS }, (data) => ({
        todos: data.todos.filter((t: Todo) => t.id !== deleteTodo.id),
      }));
    },
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

      {/**
       * TodoForm
       * 新增 TODO 項目的頁面元件
       */}
      <Paper component={TodoForm} onSubmit={handleAddTodo} />

      {
        /**
         * TodoList
         * 顯示 TODO 項目，用來 Toggle / Delete 的頁面元件
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
