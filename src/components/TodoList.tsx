import {
  fetchTodos,
  useTodos,
  useIsLoading,
  completeTodo,
  deleteTodo,
} from "../store/useTodoStore";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const todos = useTodos();
  const isLoading = useIsLoading();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full px-2 py-2 flex flex-col items-center gap-4">
      <h3 className="text-2xl font-bold"> TodoList</h3>
      <button
        className="bg-green-500/85 px-2 py-1 rounded-md cursor-pointer"
        onClick={fetchTodos}
      >
        Load Todos from api - (https://dummyjson.com)
      </button>
      <div className="w-full not-first:flex flex-col items-center gap-4">
        {todos &&
          todos.map(todo => <TodoItem {...todo} key={todo.id}/>)}
      </div>
    </div>
  );
};
