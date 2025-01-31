import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameContextProvider } from "./Game";
import App from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GameContextProvider>
			<App />
		</GameContextProvider>
	</StrictMode>,
);
