import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenModal: false,
    isOpenEditModal: false,
    isOpenNewPropietarioModal: false
  },
  reducers: {
    newPredioOpenModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
    },
    editOpenModal: (state) => {
      state.isOpenEditModal = !state.isOpenEditModal;
    },
    newPropietarioOpenModal: (state) => {
      state.isOpenNewPropietarioModal = !state.isOpenNewPropietarioModal;
    },
  },
});

export const { newPredioOpenModal, editOpenModal, newPropietarioOpenModal } = modalSlice.actions

export default modalSlice.reducer