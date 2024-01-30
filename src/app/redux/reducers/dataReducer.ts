import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux_store/store";

// Define a type for the slice state
interface localDataState {
  [key: string]: any;
}

// Define the initial state using that type
const initialState: localDataState = {};

export const localDataSlice = createSlice({
  name: "localDataStore",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    blogPageDataCapture(state = initialState, action) {
      console.log(action.payload, localStorage, "action.payload.blogId");
      if (action.payload.blogId === "") {
        state.blogId = localStorage.getItem("blogId");
        state.search = localStorage.getItem("search") ?? "";
      } else {
        const keys = Object.keys(action.payload);
        keys.forEach((item) => {
          state[item] = action.payload[item];
        });
      }
    },
    removeLocalStorageKey(state = initialState, action) {
      localStorage.removeItem(action.payload);
    },
  },
});

export const { blogPageDataCapture, removeLocalStorageKey } =
  localDataSlice.actions;

export const localDataFields = (state: RootState) => state.dataReducer;

export default localDataSlice.reducer;
