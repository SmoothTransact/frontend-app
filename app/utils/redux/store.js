// configureStore.js
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import userReducer from "./userSlice";
// import clientReducer from "./clientSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "smoothTransactState",
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   user: userReducer,
//   clients: clientReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

// export let persistor = persistStore(store);

// configureStore.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import clientReducer from "./clientSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "../rtk/apiSlice";

const persistConfig = {
  key: "smoothTransactState",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  clients: clientReducer,
  [api.reducerPath]: api.reducer, // Add the api.reducer to the rootReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export let persistor = persistStore(store);
