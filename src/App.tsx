import { AddTodoForm } from "./components/add-todo-form";
import { Header } from "./components/header";
import { TodoList } from "./components/todo-list";
import { useAppSelector } from "./services/hooks/app-hooks";

function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <main data-theme={mode} className="min-h-screen bg-neutral-100">
      <Header />
      <AddTodoForm />
      <TodoList />
      <p className="mt-[6.5rem] xl:mt-[3.0625rem] text-neutral-500 text-[0.875rem] leading-[1] text-center">
        Drag and drop to reorder the list
      </p>
    </main>
  );
}

export default App;
