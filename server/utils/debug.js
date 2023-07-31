const dayjs = require("dayjs");

let todosRef;

/**
 * _getTimestamp
 * @private
 */
function _getTimestamp() {
  return dayjs().format("YYYY-MM-DD hh:mm:ss");
}

/**
 * _logTodos
 * @private
 */
function _logTodos(timestamp) {
  if (Array.isArray(todosRef)) {
    console.log(`[${timestamp}] current todos:`);
    console.log(`[${timestamp}] [`);
    todosRef.forEach((todo) =>
      console.log(`[${timestamp}] \t${JSON.stringify(todo)}`)
    );
    console.log(`[${timestamp}] ]`);
    return;
  }
}

/**
 * exports
 */
module.exports = {
  /** bind todos object reference */
  bindTodos: (todos) => {
    todosRef = todos;
  },
  /**
   *
   */
  logTodos: () => {
    const ts = _getTimestamp();
    _logTodos(ts);
  },

  /** debug logger for mutation: addTodo */
  addTodo: (newTodo) => {
    const ts = _getTimestamp();
    console.log(`[${ts}] Mutation: ➕ addTodo - ${JSON.stringify(newTodo)}`);
    _logTodos(ts);
  },
  /** debug logger for mutation: toggleTodo */
  toggleTodo: (id) => {
    const ts = _getTimestamp();
    console.log(`[${ts}] Mutation: ✅ toggleTodo - id: ${id}`);
    _logTodos(ts);
  },
  /** debug logger for mutation: deleteTodo */
  deleteTodo: (id) => {
    const ts = _getTimestamp();
    console.log(`[${ts}] Mutation: ❌ deleteTodo  - id: ${id}`);
    _logTodos(ts);
  },
};
