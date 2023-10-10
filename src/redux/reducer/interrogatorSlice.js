import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allResponses: [],
}

const interrogatorSlice = createSlice({
  name: 'interrogator',
  initialState,
  reducers: {
   
  }
});

export const {
 
} = interrogatorSlice.actions;

export default interrogatorSlice.reducer;
