import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface ITodo {
  userId: number;
  id: number;
  todo: string;
  completed: boolean;
}

interface IInitialState {
  todos: ITodo[];
  isLoading: boolean;
}

interface IActions {
  fetchTodos: () => Promise<void>;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

interface ITodoState extends IInitialState, IActions {}

const initialState: IInitialState = {
  todos: [],
  isLoading: false,
};

const todoStore: StateCreator<
  ITodoState,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  ...initialState,
  fetchTodos: async () => {
    try {
      set({ isLoading: true }, false, "fetchTodos");
      const response = await fetch("https://dummyjson.com/todos?limit=10");

      const data = await response.json();
      set({ todos: data.todos }, false, "fetchTodos/success");
    } catch (error) {
      console.log("Error fething todos: ", error);
      set({ todos: [] }, false, "fetchTodos/failed");
    } finally {
      set({ isLoading: false }, false, "fetchTodos/finally");
    }
  },
  completeTodo: (id: number) => {
    set(
      (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }),
      false,
      "completeTodo"
    );
  },
  deleteTodo: (id: number) => {
    set(
      () => {
        const todos = get().todos;
        return { todos: todos.filter((todo) => todo.id != id) };
      },
      false,
      "deleteTodo"
    );
  },
});

const useTodoStore = create<ITodoState>()(
  devtools(
    persist(todoStore, {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
    })
  )
);

export const useTodos = () => useTodoStore((state) => state.todos);
export const useIsLoading = () => useTodoStore((state) => state.isLoading);

export const fetchTodos = () => useTodoStore.getState().fetchTodos();
export const completeTodo = (id: number) =>
  useTodoStore.getState().completeTodo(id);
export const deleteTodo = (id: number) =>
  useTodoStore.getState().deleteTodo(id);
