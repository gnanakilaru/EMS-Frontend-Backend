import { useEffect } from "react";
import { useSelector } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const theme = useSelector(
    (state) => state.theme.mode
  );

  useEffect(() => {
    document.body.className =
      theme === "dark"
        ? "dark-theme"
        : "";
  }, [theme]);

  return <AppRoutes />;
}

export default App;