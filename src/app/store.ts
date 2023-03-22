import {
  AnyAction,
  combineReducers,
  configureStore,
  Dispatch,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import profileReducer from "../features/profile/ProfileSlice";
import inventoryReducer from "../features/inventory/InventorySlice";

const rootReducer = combineReducers({
  profile: profileReducer,
  inventory: inventoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
  RootState,
  null | undefined,
  AnyAction
> &
  Dispatch<AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
