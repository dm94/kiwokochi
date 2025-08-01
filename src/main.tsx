import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TamaguiProvider } from "@tamagui/core";
import tamaguiConfig from "./tamagui.config";
import App from "./App";
import "./index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TamaguiProvider config={tamaguiConfig} defaultTheme="retro">
      <App />
    </TamaguiProvider>
  </StrictMode>
);
