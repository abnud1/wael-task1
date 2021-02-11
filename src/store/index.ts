import { combineReducers, configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./issues";

const rootReducer = combineReducers({
  issues: issuesReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
