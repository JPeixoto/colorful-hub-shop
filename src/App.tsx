import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryProvider } from "@/hooks/use-country";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const App = () => (
  <HelmetProvider>
    <CountryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </CountryProvider>
  </HelmetProvider>
);

export default App;
