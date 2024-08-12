import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { styles } from "../../constants/style";
import { useTheme } from "../../context/darkModeContext";
import { dark, light } from "../../constants/colors";
import Card from "../../components/Card";
import { BucketContext } from "../../context/bucketContext";

const Pending = () => {
  const { theme } = useTheme();
  const { bucket } = useContext(BucketContext);
  const pending = bucket.filter((item) => item.meter < 100);
  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme == "dark" ? dark.primaryBg : light.primaryBg },
      ]}
    >
      {pending.length === 0 && (
        <Text
          style={{
            fontFamily: "interMedium",
            fontSize: 15,
            color: theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
            textAlign: "center",
          }}
        >
          You have no pending task
        </Text>
      )}
      {pending.length > 0 && (
        <FlatList
          data={pending}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
          }}
        />
      )}
    </View>
  );
};

export default Pending;
