import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";
import WhatsAppSettingsPage from "./pages/whatsappsettingspage";

export default function App() {
  return (
    <AppProvider i18n={{}}>
      <WhatsAppSettingsPage />
    </AppProvider>
  );
}
