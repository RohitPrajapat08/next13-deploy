import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux_store/store";
import { fetch2, fetch4 } from "../commonApis/withfetch";

// Define a type for the slice state
interface RegistrationState {
  data: any;
  email: string;
  pending: boolean;
  message: string;
  error: boolean;
  value: number;
  name: string;
  status: boolean;
  [key: string]: any;
}

// Define the initial state using that type
const initialState: RegistrationState = {
  data: "",
  message: "",
  status: false,
  pending: false,
  error: false,
  value: 0,
  name: "",
  email: "",
};

export const astrorapidApi = createAsyncThunk(
  "astrorapidApi",
  async (body: any) => {
    const result = await fetch4(
      `${process.env.NEXT_PUBLIC_APP_BASEURL}/userlogin`,
      body
    );
    console.log(result, "astrorapidApi");

    return result;
  }
);

export const registrationSlice = createSlice({
  name: "registration",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    captureFields(state = initialState, action) {
      console.log(action, "captureFields");
      const keys = Object.keys(action.payload);
      keys.forEach((item) => {
        state[item] = action.payload[item];
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(astrorapidApi.pending, (state) => {
        state.pending = true;
      })
      .addCase(astrorapidApi.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.status = payload.status;
        state.message = payload.message;
        state.data = payload;
        console.log(payload, "payloadHome");
      })
      .addCase(astrorapidApi.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { captureFields } = registrationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const registrationFields = (state: RootState) => state.registration;
export const apiDataBirthChart = (state: RootState) => state.registration.data;

export default registrationSlice.reducer;
