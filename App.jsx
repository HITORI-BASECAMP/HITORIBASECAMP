import { useState, useEffect } from "react";
import LP from "./lp_hitoribesecamp.jsx";
import DiagnosticApp from "./solo_life_skill_check_app_v6.jsx";
import LegalPages from "./legal_pages.jsx";

function navigate(hash) {
  window.location.hash = hash;
  window.scrollTo(0, 0);
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (hash === "#diagnostic") return <DiagnosticApp onBack={() => navigate("")} />;
  if (hash === "#legal" || hash === "#legal-terms" || hash === "#legal-privacy") return <LegalPages initialTab={hash} onBack={() => navigate("")} />;
  return <LP onNavigate={navigate} />;
}
