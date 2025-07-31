import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from 'sonner';
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from './tamagui.config';
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TamaguiProvider config={tamaguiConfig} defaultTheme="retro">
      <App />
      <Toaster />
    </TamaguiProvider>
  </StrictMode>
);
