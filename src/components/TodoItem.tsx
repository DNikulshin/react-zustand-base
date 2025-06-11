import { completeTodo, deleteTodo, type ITodo } from "../store/useTodoStore";

export const TodoItem = ({ todo, completed, id }: ITodo) => {
  return (
    <div className="w-full flex items-center justify-center gap-4">
      <div>{todo}</div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => completeTodo(id)}
        className="cursor-pointer"
      />

      <button
        className="cursor-pointer text-red-500"
        onClick={() => deleteTodo(id)}
      >
        x
      </button>
    </div>
  );
};
