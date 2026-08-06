// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Login from "./Routes/Login";
import Dashboard from "./Routes/Dashboard";
import BookInformation from "./Routes/BookInformation";
import Maintenance from "./Routes/Maintenance";
import Members from "./Routes/Members";
import BookList from "./Routes/BookList";
import BookRegister from "./_test/BookRegister";

// ✅ Import Poppins with weights
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Login (no sidebar) */}
        <Route path="/" element={<Login />} />

        {/* Pages with sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-information" element={<BookInformation />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/members" element={<Members />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/book-list/book-registration" element={<BookRegister />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);