import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    tokenValue: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.tokenValue = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;
