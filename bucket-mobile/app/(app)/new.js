import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../../constants/style";
import { useTheme } from "../../context/darkModeContext";
import { dark, light } from "../../constants/colors";
import { BucketContext } from "../../context/bucketContext";

const New = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { dispatch } = useContext(BucketContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
    expectedFinishDate: new Date(),
    steps: [],
  });
  const [formError, setFormError] = useState({
    title: null,
    tobedoneAt: null,
    step: null,
  });
  const [inputValues, setInputValue] = useState([]);
  const handleStep = (id, newValue) => {
    setInputValue((prevStepValue) =>
      prevStepValue.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
    setTask({ ...task, steps: inputValues?.map((value) => value.value) });
  };

  const handleRemove = (step) => {
    setInputValue(inputValues.filter((x) => x.id !== step.id));
    setTask({ ...task, steps: inputValues?.map((value) => value.value) });
  };

  const create = async () => {
    try {
      const { data } = await axios.post(
        "http://172.20.10.13:4000/api/bucket/new-bucket",
        task
      );
      dispatch({ type: "NEW_BUCKET", payload: data });
      setTask({
        title: "",
        description: "",
        expectedFinishDate: new Date(),
        steps: [],
      });
      setFormError({
        title: null,
        tobedoneAt: null,
        step: null,
      });
      setInputValue([]);
      router.replace("/");
    } catch (error) {
      const { data } = error.response;
      setFormError(data);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        flex: 1,
      }}
      style={[
        styles.mainContainer,
        styles.new,
        { backgroundColor: theme == "dark" ? dark.primaryBg : light.primaryBg },
      ]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={[
            styles.newCard,
            {
              backgroundColor:
                theme == "dark" ? dark.primaryCard : light.primaryCard,
            },
          ]}
        >
          <Text
            style={[
              styles.newHeader,
              {
                color:
                  theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
              },
            ]}
          >
            New Bucket
          </Text>
          {formError.title && formError.title !== "" && (
            <Text
              style={{
                alignSelf: "flex-start",
                marginBottom: -5,
                fontFamily: "interMedium",
                fontSize: 11,
                color: "crimson",
              }}
            >
              {formError.title}
            </Text>
          )}
          <TextInput
            value={task.title}
            onChangeText={(val) => {
              setTask({ ...task, title: val });
              setFormError({ ...formError, title: null });
            }}
            style={[
              styles.title,
              {
                color:
                  theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
                borderColor:
                  theme == "dark" ? dark.inputBorder : light.inputBorder,
              },
            ]}
            placeholder="Bucket title"
            placeholderTextColor={
              theme == "dark" ? dark.secondaryIcon : light.secondaryIcon
            }
          />
          <TextInput
            value={task.description}
            onChangeText={(val) => setTask({ ...task, description: val })}
            multiline
            style={[
              styles.des,
              {
                color:
                  theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
                borderColor:
                  theme == "dark" ? dark.inputBorder : light.inputBorder,
              },
            ]}
            placeholder="Description"
            placeholderTextColor={
              theme == "dark" ? dark.secondaryIcon : light.secondaryIcon
            }
          />
          {formError.tobedoneAt && formError.tobedoneAt !== "" && (
            <Text
              style={{
                alignSelf: "flex-start",
                marginBottom: -5,
                fontFamily: "interMedium",
                fontSize: 11,
                color: "crimson",
              }}
            >
              {formError.tobedoneAt}
            </Text>
          )}
          <View
            style={[
              styles.newDate,
              {
                backgroundColor:
                  theme == "dark" ? dark.secondaryBg : light.secondaryBg,
              },
            ]}
          >
            <Text
              style={[
                styles.doneDate,
                {
                  color:
                    theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
                },
              ]}
            >
              To be done at:
            </Text>
            <DateTimePicker
              mode="date"
              value={task.expectedFinishDate}
              onChange={(event, selectedDate) => {
                setTask({ ...task, expectedFinishDate: selectedDate });
                setFormError({ ...formError, tobedoneAt: null });
              }}
            />
          </View>
          <View style={styles.addStepArea}>
            <Text
              style={[
                styles.addStepHeader,
                {
                  color:
                    theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
                },
              ]}
            >
              Steps
            </Text>
            <Pressable
              onPress={() =>
                setInputValue([
                  ...inputValues,
                  inputValues.length === 0
                    ? { id: inputValues.length + 1, value: "" }
                    : {
                        id: inputValues[inputValues.length - 1].id + 1,
                        value: "",
                      },
                ])
              }
              style={[
                styles.addStepBtn,
                {
                  backgroundColor:
                    theme == "dark" ? dark.secondaryBg : light.secondaryBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.addStepText,
                  {
                    color:
                      theme == "dark"
                        ? dark.secondaryIcon
                        : light.secondaryIcon,
                  },
                ]}
              >
                Add Step
              </Text>
              <MaterialIcons
                name="add-to-queue"
                size={24}
                color={
                  theme == "dark" ? dark.secondaryIcon : light.secondaryIcon
                }
              />
            </Pressable>
            {formError.step && formError.step !== "" && (
              <Text
                style={{
                  alignSelf: "flex-start",
                  marginBottom: -5,
                  fontFamily: "interMedium",
                  fontSize: 11,
                  color: "crimson",
                }}
              >
                {formError.step}
              </Text>
            )}
            {inputValues.map((step) => (
              <View style={styles.stepForm} key={step?.id}>
                <TextInput
                  multiline
                  value={step?.value}
                  onChangeText={(val) => {
                    handleStep(step.id, val);
                    setFormError({ ...formError, step: null });
                  }}
                  style={[
                    styles.step,
                    {
                      color:
                        theme == "dark"
                          ? dark.secondaryIcon
                          : light.secondaryIcon,
                      borderColor:
                        theme == "dark" ? dark.inputBorder : light.inputBorder,
                    },
                  ]}
                  placeholder="Step"
                  placeholderTextColor={
                    theme == "dark" ? dark.secondaryIcon : light.secondaryIcon
                  }
                />
                <TouchableOpacity onPress={() => handleRemove(step)}>
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color={
                      theme == "dark" ? dark.secondaryIcon : light.secondaryIcon
                    }
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={create}
            style={[
              styles.createBtn,
              {
                backgroundColor:
                  theme == "dark" ? dark.secondaryBg : light.secondaryBg,
              },
            ]}
          >
            <Text
              style={[
                styles.addStepText,
                {
                  color:
                    theme == "dark" ? dark.secondaryIcon : light.secondaryIcon,
                },
              ]}
            >
              Create
            </Text>
            <MaterialIcons
              name="create"
              size={24}
              color={theme == "dark" ? dark.secondaryIcon : light.secondaryIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default New;
