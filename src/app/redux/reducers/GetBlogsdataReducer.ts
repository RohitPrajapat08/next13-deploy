import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux_store/store";
import { apiGetFetch } from "../commonApis/withfetch";

// Define a type for the slice state
interface getblogState {
  getblogData: any;
  pending: boolean;
  error: boolean;
  value: number;
  status: boolean;
  [key: string]: any;
}

// Define the initial state using that type
const initialState: getblogState = {
  getblogData: "",
  status: false,
  pending: false,
  error: false,
  value: 0,
  articleSeriesListCount: 0,

  apiSeriesData: [],
  series: [],
  removeSeriesListCount: 0,
  lifecycleType: "",
};

export const articleSeriesList = createAsyncThunk("blogget", async () => {
  const result = await apiGetFetch(`blogsget`, "get");
  // console.log(result, "blogget");

  return result;
});

export const blogsSlice = createSlice({
  name: "blogs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    BlogcaptureFields(state = initialState, action) {
      // console.log(action, "blogscaptureFields");
      const keys = Object.keys(action.payload);
      keys.forEach((item) => {
        state[item] = action.payload[item];
      });
      // console.log(state, "statepayloadHome");
    },
    specificBlog(state = initialState, action) {
      state.specificBlog = action.payload.specificBlog;
    },
    articleSeriesData(state = initialState, action) {
      state.series = action.payload.series;
    },
    updateArticleSeries(state = initialState, action) {
      state.apiSeriesData = action.payload.apiSeriesData;
      if (action.payload.type === "remove") {
        state.removeSeriesListCount += 1;
      }
      state.lifecycleType = action.payload.type;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(articleSeriesList.pending, (state) => {
        state.pending = true;
      })
      .addCase(articleSeriesList.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload

        const articleTitleOptions = payload?.result?.map((item) => ({
          label: item?.articleTitle,
          value: item?._id,
        }));

        state.pending = false;
        state.articleSeriesListCount += 1;
        state.apiSeriesData = articleTitleOptions;
        state.status = payload.status;
        state.getblogData = payload.result;
        // console.log(payload, "getblogData");
      })
      .addCase(articleSeriesList.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const {
  BlogcaptureFields,
  specificBlog,
  articleSeriesData,
  updateArticleSeries,
} = blogsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const blogFields = (state: RootState) => state.GetBlogsdataReducer;
export const blogDetails = (state: RootState) =>
  state.GetBlogsdataReducer.specificBlog;

export const apigetBlogData = (state: RootState) =>
  state.GetBlogsdataReducer.getblogData;

export const apiArticleSeries = (state: RootState) => state.GetBlogsdataReducer;

export default blogsSlice.reducer;
