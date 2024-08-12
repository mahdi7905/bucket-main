import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { light, dark } from "../../constants/colors";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { AuthContext } from "../../context/authContext";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { useTheme } from "../../context/darkModeContext";
import { styles } from "../../constants/style";
import useAuth from "../../hooks/useAuth";
import BucketContextProvider from "../../context/bucketContext";

export default Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const { Logout } = useAuth();
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Redirect href="auth" />;
  }
  if (user) {
    return (
      <BucketContextProvider>
        <Tabs
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor:
                theme == "dark" ? dark.secondaryBg : light.secondaryBg,
            },
            headerShadowVisible: false,
            headerTitle: () => (
              <View
                style={{
                  flexDirection: "row",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "interBold",
                    fontSize: 25,
                    color:
                      theme == "light" ? light.primaryIcon : dark.primaryIcon,
                  }}
                >
                  Bucket
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={toggleTheme}>
                    {theme == "dark" && (
                      <MaterialIcons
                        name="light-mode"
                        size={30}
                        color={
                          theme == "dark" ? dark.primaryIcon : light.primaryIcon
                        }
                      />
                    )}
                    {theme == "light" && (
                      <MaterialIcons
                        name="dark-mode"
                        size={30}
                        color={
                          theme == "dark" ? dark.primaryIcon : light.primaryIcon
                        }
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={Logout}>
                    <MaterialIcons
                      name="logout"
                      size={25}
                      color={
                        theme == "dark" ? dark.primaryIcon : light.primaryIcon
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ),
            tabBarActiveTintColor:
              theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
            tabBarInactiveTintColor:
              theme == "dark" ? dark.primaryIcon : light.primaryIcon,
            tabBarLabelStyle: {
              fontFamily: "interExtraBold",
            },
            tabBarStyle: {
              backgroundColor:
                theme == "dark" ? dark.secondaryBg : light.secondaryBg,
              borderTopWidth: 0,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: "Bucket List",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  size={30}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="accomplished"
            options={{
              tabBarLabel: "Accomplished",
              tabBarIcon: ({ color }) => (
                <Octicons name="checklist" size={27} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="pending"
            options={{
              tabBarLabel: "Pending",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="pending-actions" size={30} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="new"
            options={{
              tabBarLabel: "New",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="add-task" size={30} color={color} />
              ),
            }}
          />
        </Tabs>
      </BucketContextProvider>
    );
  }
};
