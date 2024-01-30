import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux_store/store";
import { fetch2, fetch4 } from "../commonApis/withfetch";

// Define a type for the slice state
export interface AddArticlesState {
  Articlesdata?: any;
  pending?: boolean;
  error?: boolean;
  value?: number;
  status?: string;
  authorName?: string;
  authorimage?: FileList | null;
  banner?: FileList | null;
  authordescription?: string;
  title?: string;
  subject?: string;
  articledescription?: string;
  Insights?: string;
  innerWords?: string;
  Science?: string;
  description?: string;
  tags?: string;
  priority?: string;
  [key: string]: any;
}

// Define the initial state using that type
const initialState: AddArticlesState = {
  Articlesdata: "",
  status: "",
  pending: false,
  error: false,
  value: 0,
  authorName: "",
  authordescription: "",
  authorimage: null,
  banner: null,
  title: "",
  subject: "",
  articledescription: "",
  Insights: "",
  innerWords: "",
  Science: "",
  description: "",
  priority: "",
  tags: "",
};

export const articlesApi = createAsyncThunk(
  "articlesApi",
  async (body: any) => {
    const result = await fetch2(
      `${process.env.NEXT_PUBLIC_APP_BASEURL}/createblog`,
      {
        ...body,
      }
    );
    console.log(result, "articlesApi");

    return result;
  }
);

export const articlesSlice = createSlice({
  name: "articlesSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    ArticlesCaptureFields(
      state = initialState,
      action: PayloadAction<AddArticlesState>
    ) {
      console.log(action, "captureFields");
      const keys = Object.keys(action.payload);
      keys.forEach((item) => {
        state[item] = action.payload[item];
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(articlesApi.pending, (state) => {
        state.pending = true;
      })
      .addCase(articlesApi.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.status = payload.status;
        state.data = payload;
        console.log(payload, "payloadHome");
      })
      .addCase(articlesApi.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { ArticlesCaptureFields } = articlesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const ArticlesregistrationFields = (state: RootState) =>
  state.addArticlesReducer;
export const apiDataArticles = (state: RootState) =>
  state.addArticlesReducer.Articlesdata;

export default articlesSlice.reducer;
