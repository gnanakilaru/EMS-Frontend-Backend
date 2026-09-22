import { configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "./storage";

import employeeReducer from "../features/employeeSlice";
import themeReducer from "../features/themeSlice";

const themePersistConfig = {
  key: "theme",
  storage,
};

const persistedThemeReducer =
  persistReducer(
    themePersistConfig,
    themeReducer
  );

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    theme: persistedThemeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor =
  persistStore(store);