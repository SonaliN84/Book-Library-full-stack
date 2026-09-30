import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import bookReducer from './book-slice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    book: bookReducer
  },
});
export default store;