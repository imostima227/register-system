import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import DataType from "../../app/type";

const initialState: DataType[] = [];

export const userdataSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    additem: (state, action) => {
      state.push(action.payload);
    },
    delitem: (state, action) => {
      state.forEach((element, index) => {
        if (element.id === action.payload) {
          state.splice(index, 1);
        }
      });
    },
    edititem: (state, action) => {
      let id = action.payload.id;
      state.forEach((element, index) => {
        if (element.id === id) {
          state[index] = action.payload;
        }
      });
      return state;
    },
    inititem: (state, action) => {
      return [...action.payload];
    },
    clearitem: (state) => {
      return [];
    },
  },
});

export const selectUserData = (state: RootState) => state.userdata;

export const { additem, delitem, edititem, inititem, clearitem } =
  userdataSlice.actions;

export default userdataSlice.reducer;
