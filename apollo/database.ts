import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

// todos 物件，直接存在記憶體內
const todos: Todo[] = [
  { id: uuidv4(), text: "Foo", completed: false },
  { id: uuidv4(), text: "Bar", completed: true },
];

/**
 * Database class
 * 快速 expose 幾個 method 供 ApolloServer 存取，用來簡單模擬 DB 的 CRUD
 */
class Database {
  /**
   * read
   */
  get data() {
    return todos;
  }

  /**
   * add
   */
  add(text: string) {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  }
  /**
   * toggle
   */
  toggle(todo: Todo) {
    if (todo) {
      todo.completed = !todo.completed;
    }
    return todo;
  }
  /**
   * delete
   */
  delete(index: number) {
    if (index !== -1) {
      const deletedTodo = todos.splice(index, 1);
      return deletedTodo[0] as Todo;
    }
  }
}

/** create singletone db instance, then return */
const dbInstance = new Database();
export default dbInstance;
