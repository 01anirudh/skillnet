import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./root-reducer";
import { createLogger } from 'redux-logger';

let middleware = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middleware = [...middleware, loggerMiddleware];
}


const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
