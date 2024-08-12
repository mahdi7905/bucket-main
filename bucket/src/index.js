import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/darkModeContext";
import AuthContextProvider from "./context/authContext";
import BucketContextProvider from "./context/bucketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <BrowserRouter>
          <BucketContextProvider>
            <App />
          </BucketContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
