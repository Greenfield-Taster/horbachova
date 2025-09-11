import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./locales/i18n.js";
import App from "./App.jsx";

function initApp() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Error initializing React app:", error);
  }
}

// Запускаем приложение после загрузки DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
