import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./style/global.css";
import "./style/element.css";
// import App from "./App.tsx";
import App from "./app/App-new.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
