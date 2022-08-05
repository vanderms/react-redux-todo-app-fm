import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string | null;
  content: string;
  active: boolean;
}

interface TodoState {
  todos: Todo[];
  current: Todo;
}

const EmptyTodo: Todo = {
  id: null,
  content: "",
  active: true,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: (): TodoState => {
    const items = localStorage.getItem("todos");
    let todos: Todo[] = [];
    if (items) {
      todos = JSON.parse(items);
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    return { todos, current: { ...EmptyTodo } };
  },
  reducers: {
    updateTodos: {
      reducer: (state, action: PayloadAction<Todo>) => {
        const item = state.todos.find((x) => x.id === action.payload.id);
        if (item) {
          item.content = action.payload.content;
        } else {
          state.todos.unshift(action.payload);
        }
        localStorage.setItem("todos", JSON.stringify(state.todos));
        state.current = { ...EmptyTodo };
      },
      prepare: (newTodo: Todo) => {
        if (newTodo.id === null) {
          newTodo.id = nanoid();
        }
        return { payload: newTodo };
      },
    },

    toggleActive: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.active = !todo.active;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },

    setToUpdate: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((x) => x.id !== action.payload.id);
      state.current = { ...action.payload };
      console.log(state.todos);
    },

    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((x) => x.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    reorderTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter((x) => x.active);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const todoReducer = todoSlice.reducer;

export const {
  updateTodos,
  toggleActive,
  removeTodo,
  clearCompleted,
  reorderTodos,
  setToUpdate,
} = todoSlice.actions;
