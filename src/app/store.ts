import { configureStore } from "@reduxjs/toolkit";
import resultReducer from "../features/todos/todoSlice";

export const store = configureStore({
  reducer: {
    todos: resultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
