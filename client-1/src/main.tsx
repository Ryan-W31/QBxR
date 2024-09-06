import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { setupStore } from "./app/store.ts";
import { Toaster } from "@/components/ui/toaster.tsx";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Toaster />
      </Router>
    </Provider>
  </StrictMode>
);
