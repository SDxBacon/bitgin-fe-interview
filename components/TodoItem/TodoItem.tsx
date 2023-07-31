import { Delete } from "@mui/icons-material";
import { Box, Checkbox, IconButton } from "@mui/material";
import { Todo } from "../../pages";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: Todo["id"]) => void;
  onDeleteTodo: (id: Todo["id"]) => void;
};

/**
 * TodoItem component
 */
const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginY={1}
      padding={1}
      bgcolor={todo.completed ? "lightgrey" : "white"}
    >
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
        />
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
        </span>
      </Box>
      <IconButton onClick={() => onDeleteTodo(todo.id)}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
