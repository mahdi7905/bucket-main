import { View, Text } from "react-native";
import React from "react";
import AuthCard from "../../components/Auth";
import { styles } from "../../constants/style";

const Auth = () => {
  return (
    <View style={styles.authContainer}>
      <AuthCard />
    </View>
  );
};

export default Auth;
