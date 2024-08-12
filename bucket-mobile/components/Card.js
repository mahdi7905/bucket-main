import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/darkModeContext";
import { light, dark } from "../constants/colors";
import Task from "./Task";
import { BucketContext } from "../context/bucketContext";

const Card = ({ item }) => {
  const { theme } = useTheme();
  const [showAddtask, setShowAddTask] = useState(false);
  const { dispatch } = useContext(BucketContext);
  const date = new Date(item.createdAt);
  const eDate = new Date(item.tobedoneAt);
  const fDate = new Date(item.doneAt);

  const deleteBucket = async () => {
    try {
      const { data } = await axios.post(
        "http://172.20.10.13:4000/api/bucket/delete-bucket",
        { _id: item._id }
      );
      console.log(data);
      dispatch({ type: "REMOVE_BUCKET", payload: data._id });
    } catch (error) {
      console.log(error.message);
    }
  };

  const style = StyleSheet.create({
    card: {
      backgroundColor: theme == "dark" ? dark.primaryCard : light.primaryCard,
      width: "100%",
      flexDirection: "column",
      padding: 10,
      borderRadius: 5,
      gap: 5,
    },
    titleArea: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardTitle: {
      flex: 5,
      fontFamily: "interBold",
      color: theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
      fontSize: 16,
    },
    meterArea: {
      flex: 3,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    meterWrapper: {
      width: "80%",
      height: 17,
      borderColor: light.meter,
      borderWidth: 1,
      borderRadius: 50,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    meterText: {
      fontSize: 10,
      fontFamily: "interSemiBold",
      color: theme == "dark" ? dark.primaryIcon : light.primaryIcon,
    },
    meter: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "50%",
      borderRadius: 50,
      backgroundColor: dark.meter,
    },
    dates: {
      fontFamily: "interBold",
      fontStyle: "italic",
      fontSize: 10,
      color: theme == "dark" ? dark.primaryIcon : light.primaryIcon,
    },
    descriptionArea: {
      padding: 5,
    },
    description: {
      color: theme == "dark" ? dark.primaryIcon : light.primaryIcon,
      fontFamily: "interRegular",
      fontSize: 13,
    },
    addStepArea: {
      alignItems: "center",
      gap: 10,
    },
    stepFormArea: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 5,
    },
    addBtn: {
      padding: 5,
      paddingHorizontal: 7,
      backgroundColor: theme == "dark" ? dark.secondaryBg : light.secondaryBg,
      borderRadius: 100,
    },
    addBtnText: {
      fontFamily: "interSemiBold",
      color: theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
      fontSize: 12,
    },
    addInput: {
      flex: 1,
      padding: 3,
      borderColor: theme == "dark" ? dark.inputBorder : light.inputBorder,
      borderWidth: 2,
      borderRadius: 5,
      height: 50,
      color: theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
      fontFamily: "interMedium",
      fontSize: 12,
    },
    addStep: {
      backgroundColor: dark.bin,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    },
    taskArea: {
      gap: 10,
      width: "100%",
    },
  });

  return (
    <View style={style.card}>
      <View style={style.titleArea}>
        <Text style={style.cardTitle}>{item.title}</Text>
        <View style={style.meterArea}>
          <View style={style.meterWrapper}>
            <View style={[style.meter, { width: `${item.meter}%` }]}></View>
            <Text style={style.meterText}>{item.meter}%</Text>
          </View>
          <TouchableOpacity style={style.binContainer} onPress={deleteBucket}>
            <MaterialIcons
              name="delete"
              size={24}
              color={theme == "dark" ? light.secondaryBg : dark.secondaryBg}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={style.dates}>
          Created at: {date.getDate()}-{date.getMonth()}-{date.getFullYear()} at{" "}
          {date.getHours()}:{date.getMinutes()}
        </Text>
        <Text style={style.dates}>
          Expected date of finish: {eDate.getDate()}-{eDate.getMonth()}-
          {eDate.getFullYear()}
        </Text>
        {item.doneAt && (
          <Text style={style.dates}>
            Finished at: {fDate.getDate()}-{fDate.getMonth()}-
            {fDate.getFullYear()} at {fDate.getHours()}:{fDate.getMinutes()}
          </Text>
        )}
      </View>
      <View style={style.descriptionArea}>
        <Text style={style.description}>{item.description}</Text>
      </View>
      <View style={style.addStepArea}>
        <TouchableOpacity
          style={style.addBtn}
          onPress={() => setShowAddTask((prev) => !prev)}
        >
          <Text style={style.addBtnText}>
            {showAddtask ? "Close" : "Add Step"}
          </Text>
        </TouchableOpacity>
        {showAddtask && (
          <View style={style.stepFormArea}>
            <TextInput
              style={style.addInput}
              placeholder="Type in a task"
              multiline
              placeholderTextColor={
                theme == "dark" ? dark.secondaryIcon : light.secondaryIcon
              }
            />
            <TouchableOpacity style={style.addStep}>
              <MaterialIcons name="add" size={24} color={dark.secondaryBg} />
            </TouchableOpacity>
          </View>
        )}
        <View style={style.taskArea}>
          {item.steps.map((step) => (
            <Task key={step._id} task={step} item_id={item._id} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Card;
