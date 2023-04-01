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
import skillsReducer from "../features/skills/SkillsSlice";
import jobReducer from "../features/jobs/JobSlice";
import investmentsReducer from "../features/investments/InvestmentsSlice";
import skilltreeReducer from "../features/meta/skilltree/SkillTreeSlice";

const rootReducer = combineReducers({
  profile: profileReducer,
  inventory: inventoryReducer,
  skills: skillsReducer,
  job: jobReducer,
  investments: investmentsReducer,
  skilltree: skilltreeReducer,
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
