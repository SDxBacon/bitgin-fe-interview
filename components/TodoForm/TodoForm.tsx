import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

type TodoFormProps = {
  onSubmit: (text: string) => void;
};

/**
 * TodoForm component
 */
const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) return;
    if (onSubmit) onSubmit(text);
    setText("");
  };

  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      marginBottom="16px"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { flexGrow: 1, marginRight: "16px" } }}
    >
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        label="New todo"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;
