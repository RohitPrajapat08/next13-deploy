import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../redux_store/store";
import { apiGetFetch } from "../commonApis/withfetch";

// Define a type for the slice state
interface getartseriesState {
  getartseriesData: any;
  pending: boolean;
  error: boolean;
  value: number;
  status: boolean;
  [key: string]: any;
}

// Define the initial state using that type
const initialState: getartseriesState = {
  getartseriesData: "",
  status: false,
  pending: false,
  error: false,
  value: 0,
};

export const artseriesget: any = createAsyncThunk("artseriesget", async () => {
  const result = await apiGetFetch(`articleseriesget?type=Gardner`, "get");
  return result;
});

export const artseriesGSlice = createSlice({
  name: "artseriesg",
  initialState,
  reducers: {
    ArtSeriesFields(state = initialState, action) {
      const keys = Object.keys(action.payload);
      keys.forEach((item) => {
        state[item] = action.payload[item];
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(artseriesget.pending, (state) => {
        state.pending = true;
      })
      .addCase(artseriesget.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.status = payload.status;
        state.getartseriesData = payload.result;
        // console.log(payload, " getartseriesData");
      })
      .addCase(artseriesget.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { ArtSeriesFields } = artseriesGSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const artiFields = (state: RootState) => state.GetArtseriesdataReducer;
export const apigetartseriesData = (state: RootState) =>
  state.GetArtseriesdataReducer.getartseriesData;

export default artseriesGSlice.reducer;
