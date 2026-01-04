/*
Componente principal com as rotas:
 / → IndexPage (página inicial)
 /bands → BandsPage (página — incompleta — das bandas)
 /songs/:id → SongPage (faixas isoladas)
 /search → SearchPage (busca spotify)
 (inexistente)  → ErrorPage (404)

 */

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndexPage from "./pages/IndexPage";
import BandsPage from "./pages/BandsPage";
import SongPage from "./pages/SongPage";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/bands" element={<BandsPage />} />
          <Route path="/songs/:id" element={<SongPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
