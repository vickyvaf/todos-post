import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import TodoPage from "../features/todos/TodoPage";
import PostsPage from "../features/posts/PostsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todos" replace />,
      },
      {
        path: "todos",
        element: <TodoPage />,
      },
      {
        path: "posts",
        element: <PostsPage />,
      },
    ],
  },
]);
