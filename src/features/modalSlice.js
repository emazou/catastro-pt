import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenModal: false,
    isOpenEditModal: false,
    isOpenNewPropietarioModal: false,
    isOpenNewConstruccionModal: false,
    isOpenNewTerrenoModal: false,
    isOpenEditConstruccionModal: false,
    isOpenEditTerrenoModal: false
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
    newConstruccionOpenModal: (state) => {
      state.isOpenNewConstruccionModal = !state.isOpenNewConstruccionModal;
    },
    editConstruccionOpenModal: (state) => {
      state.isOpenEditConstruccionModal = !state.isOpenEditConstruccionModal;
    },
    newTerrenoOpenModal: (state) => {
      state.isOpenNewTerrenoModal = !state.isOpenNewTerrenoModal;
    },
    editTerrenoOpenModal: (state) => {
      state.isOpenEditTerrenoModal = !state.isOpenEditTerrenoModal;
    },
  },
});

export const { newPredioOpenModal, editOpenModal, newPropietarioOpenModal, newConstruccionOpenModal, editConstruccionOpenModal, newTerrenoOpenModal, editTerrenoOpenModal } = modalSlice.actions

export default modalSlice.reducer