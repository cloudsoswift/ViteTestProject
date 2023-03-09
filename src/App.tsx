import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import { QueryPage } from "./pages/QueryPage";
import { RecoilPage } from "./pages/RecoilPage";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="app">
      <HomePage />
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/query" element={<QueryPage />} />
        <Route path="/recoil" element={<RecoilPage />} />
      </Routes>
    </div>
  );
}

export default App;
