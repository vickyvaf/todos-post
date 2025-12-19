import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { addTodo, deleteTodo, toggleTodo, setFilter } from "./todoSlice";
import { Trash2, CheckCircle, Circle, Plus } from "lucide-react";
import clsx from "clsx";

export default function TodoPage() {
  const [text, setText] = useState("");
  const { items, filter } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText("");
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          {(["all", "pending", "completed"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => dispatch(setFilter(f))}
              className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize",
                filter === f
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </form>

      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No tasks found</p>
          </div>
        ) : (
          filteredItems.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 group transition-all hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => dispatch(toggleTodo(todo.id))}
                className={clsx(
                  "flex-shrink-0 transition-colors",
                  todo.completed
                    ? "text-green-500"
                    : "text-gray-300 hover:text-green-500"
                )}
              >
                {todo.completed ? (
                  <CheckCircle size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </button>

              <span
                className={clsx(
                  "flex-1 text-lg transition-all",
                  todo.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                )}
              >
                {todo.text}
              </span>

              <button
                type="button"
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
