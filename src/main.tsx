import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Navbar></Navbar>
    <Hero></Hero>
  </StrictMode>,
);
