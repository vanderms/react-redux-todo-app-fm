import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../features/theme-slice";
import { todoReducer } from "../features/todo-slice";
// ...

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
