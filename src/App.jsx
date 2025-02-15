import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/loader/loader";
import Desktop from "./pages/desktop/Desktop";
import { WindowManagerProvider } from "./contexts/WindowManagerContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <WindowManagerProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/loader" />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/desktop" element={<Desktop />} />
          </Routes>
        </WindowManagerProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
