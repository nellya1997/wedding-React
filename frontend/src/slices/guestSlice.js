import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchLoading = createAsyncThunk(
  'guest/fetchLoading',
  async () => {
    const res = await axios.get(routes.all);
    return res.data;
  },
);

const guestAdapter = createEntityAdapter({});

const guestSlice = createSlice({
  name: 'guest',
  initialState: guestAdapter.getInitialState({
    loadingStatus: 'idle', error: null,
  }),
  reducers: {
    addGuest: guestAdapter.addOne,
    removeGuest: guestAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoading.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchLoading.fulfilled, (state, { payload }) => {
        guestAdapter.addMany(state, payload);
        state.loadingStatus = 'finish';
        state.error = null;
      })
      .addCase(fetchLoading.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectors = guestAdapter.getSelectors((state) => state.guest);
export const { actions } = guestSlice;
export default guestSlice.reducer;
