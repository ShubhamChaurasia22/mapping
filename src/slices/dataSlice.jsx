import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: [],
  fileUploaded: false,
  fileName: "",
  showDataModal: false,
  savedData: [],
  opponentsData: [],
  showTable: false,
  showOpponentModal: false,
  showUrls: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUrls: (state, action) => {
      state.urls = action.payload;
    },
    setFileUploaded: (state, action) => {
      state.fileUploaded = action.payload;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setShowDataModal: (state, action) => {
      state.showDataModal = action.payload;
    },
    addSavedData: (state, action) => {
      state.savedData.push(action.payload);
    },
    addOpponentData: (state, action) => {
      state.opponentsData.push(action.payload);
    },
    toggleShowTable: (state) => {
      state.showTable = !state.showTable;
    },
    setShowOpponentModal: (state, action) => {
      state.showOpponentModal = action.payload;
    },
    setShowUrls: (state, action) => {
      state.showUrls = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setUrls,
  setFileUploaded,
  setFileName,
  setShowDataModal,
  addSavedData,
  addOpponentData,
  toggleShowTable,
  setShowOpponentModal,
  setShowUrls,
  reset,
} = dataSlice.actions;

export default dataSlice.reducer;
