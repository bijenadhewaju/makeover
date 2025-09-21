import { ImageOff } from "lucide-react";
import React from "react";
import { Routes, Route } from "react-router-dom";

// ---- Component Imports ----
import Header from "./components/Header";

// ---- Page Imports ----
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header/>
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
