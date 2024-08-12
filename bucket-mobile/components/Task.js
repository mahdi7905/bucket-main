import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/darkModeContext";
import { light, dark } from "../constants/colors";
import { BucketContext } from "../context/bucketContext";

const Task = ({ task, item_id }) => {
  const { theme } = useTheme();
  const { dispatch } = useContext(BucketContext);
  const time = new Date(task.finishedAt);

  const removeTask = async () => {
    try {
      const { data } = await axios.post(
        "http://172.20.10.13:4000/api/bucket/delete-task",
        { item_id, task_id: task._id }
      );
      dispatch({ type: "EDIT_BUCKET", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  const taskDone = async () => {
    try {
      const { data } = await axios.post(
        "http://172.20.10.13:4000/api/bucket/task-done",
        { item_id, task_id: task._id }
      );
      dispatch({ type: "EDIT_BUCKET", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  const taskStyle = StyleSheet.create({
    taskWrapper: {
      backgroundColor:
        theme == "dark" ? dark.secondaryCard : light.secondaryCard,
      padding: 5,
      borderRadius: 2,
    },
    taskArea: {
      flexDirection: "row",
      gap: 10,
    },
    task: {
      flex: 3,
      fontFamily: "interMedium",
      color: theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
      fontSize: 13,
    },
    taskActions: {
      flexDirection: "row",
      gap: 5,
    },
    taskActionBtn: {
      backgroundColor: dark.bin,
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      borderRadius: 5,
    },
    taskDate: {
      color: theme == "dark" ? dark.primaryIcon : light.primaryIcon,
      fontFamily: "interBold",
      fontSize: 12,
      fontStyle: "italic",
    },
  });
  return (
    <View style={taskStyle.taskWrapper}>
      <View style={taskStyle.taskArea}>
        <Text style={taskStyle.task}>{task.step}</Text>
        {!task.done && (
          <View style={taskStyle.taskActions}>
            <TouchableOpacity
              style={taskStyle.taskActionBtn}
              onPress={taskDone}
            >
              <MaterialIcons name="done" size={24} color={dark.secondaryBg} />
            </TouchableOpacity>
            <TouchableOpacity
              style={taskStyle.taskActionBtn}
              onPress={removeTask}
            >
              <MaterialIcons name="remove" size={24} color={dark.secondaryBg} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {task.finishedAt && (
        <Text style={taskStyle.taskDate}>
          Finished at: {time.getDay()}-{time.getMonth()}-{time.getFullYear()} at{" "}
          {time.getHours()}:{time.getMinutes()}
        </Text>
      )}
    </View>
  );
};

export default Task;
