import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome6, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../constants/style";
import { dark, light } from "../constants/colors";
import useAuth from "../hooks/useAuth";

const AuthCard = () => {
  const { Login, Register, error, setError, isLoading } = useAuth();
  const [signup, setSignup] = useState(false);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = () => {
    Login(authData);
  };
  const handleSignup = () => {
    if (authData.password === authData.confirmPassword) {
      Register(authData);
      return;
    }
    setError({ ...authError, password: "Password do not match" });
  };
  return (
    <KeyboardAvoidingView style={styles.authCard}>
      <Text style={styles.authHeader}>{signup ? "Signup" : "Login"}</Text>
      {error.username && (
        <Text
          style={{
            color: "crimson",
            fontFamily: "interSemiBold",
            fontSize: 12,
            marginBottom: -5,
            alignSelf: "flex-start",
          }}
        >
          {error.username}
        </Text>
      )}
      <View style={styles.authInputwrapper}>
        <FontAwesome6 name="user-large" size={20} color={light.secondaryBg} />
        <TextInput
          style={styles.authInput}
          placeholder="Username"
          placeholderTextColor={light.primaryIcon}
          value={authData.username}
          onChangeText={(val) => {
            setAuthData({ ...authData, username: val });
            setError({ ...error, username: null });
          }}
        />
      </View>
      {signup && error.email && (
        <Text
          style={{
            color: "crimson",
            fontFamily: "interSemiBold",
            fontSize: 12,
            marginBottom: -5,
            alignSelf: "flex-start",
          }}
        >
          {error.email}
        </Text>
      )}
      {signup && (
        <View style={styles.authInputwrapper}>
          <MaterialIcons name="email" size={20} color={light.secondaryBg} />
          <TextInput
            style={styles.authInput}
            placeholder="Email"
            placeholderTextColor={light.primaryIcon}
            value={authData.email}
            onChangeText={(val) => {
              setAuthData({ ...authData, email: val });
              setError({ ...error, email: null });
            }}
          />
        </View>
      )}
      {error.password && (
        <Text
          style={{
            color: "crimson",
            fontFamily: "interSemiBold",
            fontSize: 12,
            marginBottom: -5,
            alignSelf: "flex-start",
          }}
        >
          {error.password}
        </Text>
      )}
      <View style={styles.authInputwrapper}>
        <FontAwesome name="lock" size={20} color={light.secondaryBg} />
        <TextInput
          style={styles.authInput}
          placeholder="Password"
          placeholderTextColor={light.primaryIcon}
          secureTextEntry
          value={authData.password}
          onChangeText={(val) => {
            setAuthData({ ...authData, password: val });
            setError({ ...error, password: null });
          }}
        />
      </View>

      {signup && (
        <View style={styles.authInputwrapper}>
          <FontAwesome name="lock" size={20} color={light.secondaryBg} />
          <TextInput
            style={styles.authInput}
            placeholder="Confirm Password"
            placeholderTextColor={light.primaryIcon}
            secureTextEntry
            value={authData.confirmPassword}
            onChangeText={(val) => {
              setAuthData({ ...authData, confirmPassword: val });
              setError({ ...error, password: null });
            }}
          />
        </View>
      )}
      {isLoading && (
        <TouchableOpacity
          disabled={isLoading}
          style={isLoading ? styles.loadingAuthAction : styles.authAction}
          onPress={signup ? handleSignup : handleLogin}
        >
          <ActivityIndicator size={24} color={dark.primaryBg} />
        </TouchableOpacity>
      )}
      {!isLoading && (
        <TouchableOpacity
          style={isLoading ? styles.loadingAuthAction : styles.authAction}
          onPress={signup ? handleSignup : handleLogin}
        >
          <Text style={styles.authActionText}>
            {signup ? "Signup" : "Login"}
          </Text>
          <MaterialIcons name="login" size={24} color={light.primaryIcon} />
        </TouchableOpacity>
      )}
      <View style={styles.authQuery}>
        <Text style={styles.authQuerytext}>
          {signup ? "Already have an account?" : "Don't have account yet?"}
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          style={styles.toggler}
          onPress={() => setSignup((prev) => !prev)}
        >
          <Text style={styles.togglerText}>{signup ? "Login" : "Signup"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthCard;
