import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { styles } from "../../constants/style";
import { useTheme } from "../../context/darkModeContext";
import { dark, light } from "../../constants/colors";
import Card from "../../components/Card";
import { BucketContext } from "../../context/bucketContext";

const Accomplished = () => {
  const { theme } = useTheme();
  const { bucket } = useContext(BucketContext);
  const accomplished = bucket.filter((item) => item.meter === 100);
  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme == "dark" ? dark.primaryBg : light.primaryBg },
      ]}
    >
      {accomplished.length === 0 && (
        <Text
          style={{
            fontFamily: "interMedium",
            fontSize: 15,
            color: theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
            textAlign: "center",
          }}
        >
          You have no accomplished tasks
        </Text>
      )}
      {accomplished.length > 0 && (
        <FlatList
          data={accomplished}
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

export default Accomplished;
