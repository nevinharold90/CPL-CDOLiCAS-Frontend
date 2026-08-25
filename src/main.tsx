// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./admin/components/Layout";
import Login from "./Login";
import Dashboard from "./admin/Routes/Dashboard";
import BookInformation from "./admin/Routes/BookInformation";
import Maintenance from "./admin/Routes/Maintenance";
import Members from "./admin/Routes/Members";
import BookList from "./admin/Routes/BookList";
import BookRegister from "./admin/Routes/sub-route/Book/BookRegister";

import EventsPage from "./public-client/Routes/EventPage";
import ClientHomePage from "./public-client/Routes/Homepage";
import CatalogPage from "./public-client/Routes/CatalogPage";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* ========== PUBLIC ROUTES (no admin sidebar) ========== */}
        <Route path="/" element={<ClientHomePage />} />
        <Route path="/home" element={<ClientHomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<CatalogPage />} />

        {/* ========== ADMIN ROUTES (with sidebar) ========== */}
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