import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Self-hosted fonts — bundled by Vite, no network request, no FOUT
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
