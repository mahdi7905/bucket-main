import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default Layout = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Redirect href="(app)" />;
  }
  if (!user) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }
};
