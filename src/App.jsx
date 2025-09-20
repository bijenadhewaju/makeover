import { ImageOff } from "lucide-react";
import React from "react";
import { Routes, Route } from "react-router-dom";

// ---- Component Imports ----
import Navbar from "./components/Navbar";

// ---- Page Imports ----
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
