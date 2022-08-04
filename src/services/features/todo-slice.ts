import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  content: string;
  active: boolean;
}

const todoSlice = createSlice({
  name: "todo",
  initialState: (): { todos: Todo[] } => {
    const items = localStorage.getItem("todos");
    let todos: Todo[] = [];
    if (items) {
      todos = JSON.parse(items);
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    return { todos };
  },
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state.todos));
      },
      prepare: (newTodo: Todo) => {
        newTodo.id = nanoid();
        return { payload: newTodo };
      },
    },

    completeTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.active = false;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter((x) => x.active);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    updateTodo: (state, action: PayloadAction<{ todo: Todo; content: string }>) => {
      const todoUpdated = state.todos.find((item) => item.id === action.payload.todo.id);
      if (todoUpdated) {
        todoUpdated.content = action.payload.content;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
  },
});

export const todoReducer = todoSlice.reducer;

export const { addTodo, completeTodo, updateTodo, clearCompleted } = todoSlice.actions;
