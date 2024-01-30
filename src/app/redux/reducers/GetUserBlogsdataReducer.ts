import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux_store/store";
import { apiGetFetch } from "../commonApis/withfetch";

// Define a type for the slice state
interface getuserblogState {
  getuserblogData: any;
  pending: boolean;
  error: boolean;
  value: number;
  status: boolean;
  [key: string]: any;
}

// Define the initial state using that type
const initialState: getuserblogState = {
  getuserblogData: "",
  status: false,
  pending: false,
  error: false,
  value: 0,
};

export const userblogget = createAsyncThunk(
  "userblogget",
  async (body: string) => {
    const result = await apiGetFetch(`blogsget?id=${body}`, "get");
    // console.log(result, "userblogget");

    return result;
  }
);

export const userblogsSlice = createSlice({
  name: "blogs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    UserBlogcaptureFields(state = initialState, action) {
      // console.log(action, "blogscaptureFields");
      const keys = Object.keys(action.payload);
      keys.forEach((item) => {
        state[item] = action.payload[item];
      });
      // console.log(state, "statepayloadHome");
    },
    // specificBlog(state = initialState, action) {
    //   state.specificBlog = action.payload.specificBlog;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userblogget.pending, (state) => {
        state.pending = true;
      })
      .addCase(userblogget.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.status = payload.status;
        state.getuserblogData = payload.result;
        // console.log(payload, "getuserblogData");
      })
      .addCase(userblogget.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { UserBlogcaptureFields } = userblogsSlice.actions;
// export const { UserBlogcaptureFields, specificBlog } = userblogsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userblogFields = (state: RootState) =>
  state.GetUserBlogsdataReducer;
// export const userblogDetails = (state: RootState) =>
//   state.GetUserBlogsdataReducer.specificBlog;

export const apigetuserblogData = (state: RootState) =>
  state.GetUserBlogsdataReducer.getuserblogData;

export default userblogsSlice.reducer;
