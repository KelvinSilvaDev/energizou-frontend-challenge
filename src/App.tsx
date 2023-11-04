
import { Outlet } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
