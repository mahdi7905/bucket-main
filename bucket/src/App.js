import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Accomplished from "./pages/accomplishe/Accomplished";
import Pending from "./pages/pending/Pending";
import New from "./pages/new/New";
import Tab from "./components/tab/Tab";
import Auth from "./pages/auth/Auth";
import { useTheme } from "./context/darkModeContext";
import RequireAuth from "./helpers/RequireAuth";
import { AuthContext } from "./context/authContext";

function App() {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  console.log(theme);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <main className="">
      <Navbar />
      {user && <Tab />}
      <section className="main-container">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/accomplished"
            element={
              <RequireAuth>
                <Accomplished />
              </RequireAuth>
            }
          />
          <Route
            path="/pending"
            element={
              <RequireAuth>
                <Pending />
              </RequireAuth>
            }
          />
          <Route
            path="/new"
            element={
              <RequireAuth>
                <New />
              </RequireAuth>
            }
          />
          <Route path="/auth" element={!user ? <Auth /> : <Home />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
