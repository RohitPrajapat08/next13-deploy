import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux_store/store";
import { fetch2, fetch4 } from "../commonApis/withfetch";

// Define a type for the slice state
interface SignupState {
  getsignData: any;
  pending: boolean;
  error: boolean;
  value: number;
  status: boolean;
  userName: string;
  email: string;
  image: any;
  description: any;
  url: any;
  facebook: any;
  insta: any;
  linkedin: any;
  twitter: any;
  threads: any;
  [key: string]: any;
}

// Define the initial state using that type
const initialState: SignupState = {
  getsignData: "",
  status: false,
  pending: false,
  error: false,
  value: 0,
  userName: "",
  email: "",
  image: "",
  description: "",
  url: "",
  facebook: "",
  insta: "",
  linkedin: "",
  twitter: "",
  threads: "",
};

export const signupApi = createAsyncThunk("signupApi", async (body: any) => {
  const result = await fetch2(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/usersignup`,
    body
  );
  console.log(result, "signupApi");

  return result;
});

export const signupSlice = createSlice({
  name: "signup",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signupcaptureFields(state = initialState, action) {
      console.log(action, "signupcaptureFields");
      const keys = Object.keys(action.payload);
      keys.forEach((item) => {
        state[item] = action.payload[item];
      });
      console.log(state, "statepayloadHome");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupApi.pending, (state) => {
        state.pending = true;
      })
      .addCase(signupApi.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.status = payload.status;
        state.getblogData = payload;
        console.log(payload, "payloadHome");
      })
      .addCase(signupApi.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { signupcaptureFields } = signupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const signupFields = (state: RootState) => state.signupReducer;
export const getblogdata = (state: RootState) =>
  state.signupReducer.getsignData;

export default signupSlice.reducer;
