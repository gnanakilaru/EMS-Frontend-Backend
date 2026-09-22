import {
  useDispatch,
  useSelector,
} from "react-redux";

import { toggleTheme } from "../features/themeSlice";

function Navbar() {
  const dispatch = useDispatch();

  const theme = useSelector(
    (state) => state.theme.mode
  );

  return (
    <header className="navbar">
      <div>
        <h2>Employee Hub</h2>
      </div>

      <div className="navbar-actions">
        <button
          className="icon-button"
          onClick={() =>
            dispatch(toggleTheme())
          }
          title="Toggle theme"
        >
          {theme === "light"
            ? "🌙"
            : "☀️"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;