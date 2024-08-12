import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useRouter } from "expo-router";
import axios from "axios";

import * as SecureStore from "expo-secure-store";

const useAuth = () => {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIaLoading] = useState(false);
  const [error, setError] = useState({
    username: null,
    password: null,
    email: null,
  });
  const Login = async (authData) => {
    setIaLoading(true);
    if (!authData.username || authData.username === "") {
      setError({ ...error, username: "Username is required" });
      setIaLoading(false);
      return;
    }
    if (!authData.password || authData.password === "") {
      setError({ ...error, password: "Password is required" });
      setIaLoading(false);
      return;
    }
    try {
      setIaLoading(true);
      const { data } = await axios.post(
        "http://172.20.10.13:4000/api/auth/login",
        authData
      );
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      dispatch({ type: "SET_USER", payload: data });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.user.token}`;
      router.replace("(app)");
      setIaLoading(false);
    } catch (err) {
      setIaLoading(true);
      const { error } = err.response.data;
      setError({
        ...error,
        username: error.username,
        password: error.password,
      });
      setIaLoading(false);
    }
  };
  const Register = async (authData) => {
    try {
      setIaLoading(true);
      const { data } = await axios.post(
        "http://172.20.10.13:4000/api/auth/register",
        authData
      );
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      dispatch({ type: "SET_USER", payload: data });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.user.token}`;
      router.replace("(app)");
      setIaLoading(false);
    } catch (err) {
      const { error } = err.response.data;
      setError({
        ...error,
        username: error.username,
        password: error.password,
        email: error.email,
      });
      setIaLoading(false);
    }
  };
  const Logout = async () => {
    await SecureStore.deleteItemAsync("user");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({ type: "LOGOUT" });
  };
  return { Login, Register, Logout, error, setError, isLoading };
};

export default useAuth;
