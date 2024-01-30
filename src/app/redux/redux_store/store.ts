import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import addArticlesReducer from "../reducers/addArticlesReducer";
import GetArtseriesdataReducer from "../reducers/GetArtseriesdataReducer";
import GetBlogsdataReducer from "../reducers/GetBlogsdataReducer";
import GetUserBlogsdataReducer from "../reducers/GetUserBlogsdataReducer";
import registration from "../reducers/registrationReducer";
import signupReducer from "../reducers/signupReducer";
import dataReducer from "../reducers/dataReducer";
export const store = configureStore({
  reducer: {
    registration: registration,
    signupReducer: signupReducer,
    addArticlesReducer: addArticlesReducer,
    GetBlogsdataReducer: GetBlogsdataReducer,
    GetArtseriesdataReducer: GetArtseriesdataReducer,
    GetUserBlogsdataReducer: GetUserBlogsdataReducer,
    dataReducer: dataReducer,
    // This is where we add reducers.
    // Since we don't have any yet, leave this empty
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
