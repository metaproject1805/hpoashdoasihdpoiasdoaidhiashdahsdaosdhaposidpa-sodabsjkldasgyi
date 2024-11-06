import { configureStore } from "@reduxjs/toolkit";
import { apiEndpoints } from "./apiRoutes/apiEndpoint";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Define your reducers here
      [apiEndpoints.reducerPath]: apiEndpoints.reducer,
      // Add other reducers here
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiEndpoints.middleware),
    // Add other middleware here
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootStore = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
