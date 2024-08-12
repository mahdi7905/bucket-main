import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({ type: "SET_USER", payload: user });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${user.user.token}`;
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
