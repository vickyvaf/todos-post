import todoReducer, {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
} from "../features/todos/todoSlice";

describe("todo reducer", () => {
  const initialState = {
    items: [],
    filter: "all" as const,
  };

  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
      filter: "all",
    });
  });

  it("should handle adding a todo", () => {
    const actual = todoReducer(initialState, addTodo("Run tests"));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0].text).toEqual("Run tests");
    expect(actual.items[0].completed).toEqual(false);
    expect(actual.items[0].id).toBeDefined();
  });

  it("should handle toggling a todo", () => {
    const startState = {
      items: [
        { id: "1", text: "Run tests", completed: false, createdAt: Date.now() },
      ],
      filter: "all" as const,
    };
    const actual = todoReducer(startState, toggleTodo("1"));
    expect(actual.items[0].completed).toEqual(true);
  });

  it("should handle deleting a todo", () => {
    const startState = {
      items: [
        { id: "1", text: "Run tests", completed: false, createdAt: Date.now() },
      ],
      filter: "all" as const,
    };
    const actual = todoReducer(startState, deleteTodo("1"));
    expect(actual.items.length).toEqual(0);
  });

  it("should handle setting filter", () => {
    const actual = todoReducer(initialState, setFilter("completed"));
    expect(actual.filter).toEqual("completed");
  });
});
