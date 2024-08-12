import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const BucketContext = createContext();

const BucketReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUCKET":
      return [...action.payload];
    case "NEW_BUCKET":
      return [action.payload, ...state];
    case "REMOVE_BUCKET":
      return state.filter((bucket) => bucket._id !== action.payload);
    case "EDIT_BUCKET":
      return state.map((bucket) => {
        if (bucket._id === action.payload._id) {
          return action.payload;
        }
        return bucket;
      });
    default:
      return state;
  }
};

const BucketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BucketReducer, []);
  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const { data } = await axios.get(
          "http://172.20.10.13:4000/api/bucket/"
        );
        dispatch({ type: "SET_BUCKET", payload: data });
      } catch (error) {
        console.log("bucket context", error);
      }
    };
    fetchBuckets();
  }, []);
  return (
    <BucketContext.Provider value={{ bucket: state, dispatch }}>
      {children}
    </BucketContext.Provider>
  );
};

export default BucketContextProvider;
