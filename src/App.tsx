import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="h-screen flex flex-col items-center pag-4 py-4">
      <h1 className="text-3xl">Zustand Example Todo</h1>
      <TodoList />
    </div>
  );
}

export default App;
