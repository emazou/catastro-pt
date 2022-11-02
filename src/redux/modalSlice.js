
import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenModal: false,
    isOpenEditModal: false
  },
  reducers: {
    newPredioOpenModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
    },
    editPredioOpenModal: (state) => {
      state.isOpenEditModal = !state.isOpenEditModal;
    },
  },
});

export const { newPredioOpenModal, editPredioOpenModal } = modalSlice.actions

export default modalSlice.reducer