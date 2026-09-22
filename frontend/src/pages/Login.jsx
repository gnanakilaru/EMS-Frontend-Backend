import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import { login } from "../features/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) =>
      state.auth.isAuthenticated
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Enter email and password"
      );

      return;
    }

    dispatch(
      login({
        name: "Admin",
        email,
      })
    );

    navigate("/dashboard", {
      replace: true,
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            EH
          </div>

          <h1>Employee Hub</h1>

          <p>
            Employee Management System
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
            />
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            className="primary-button login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;