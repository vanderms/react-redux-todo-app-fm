import { Header } from "./components/sections/header";
import { useAppSelector } from "./services/hooks/app-hooks";

function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <main data-theme={mode} className="min-h-screen bg-white">
      <Header />
    </main>
  );
}

export default App;
