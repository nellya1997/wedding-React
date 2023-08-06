import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchLoading = createAsyncThunk(
  'data/fetchLoading',
  async () => {
    const res = await axios.get(routes.all);
    return res.data;
  },
);

const dataAdapter = createEntityAdapter({});

const dataSlice = createSlice({
  name: 'data',
  initialState: dataAdapter.getInitialState({
    loadingStatus: 'idle', error: null,
  }),
  reducers: {
    addData: dataAdapter.addOne,
    addLike: (state, { payload }) => {
      state.entities[payload].likes += 1;
    },
    removeLike: (state, { payload }) => {
      state.entities[payload].likes -= 1;
    },
    removeData: dataAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoading.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchLoading.fulfilled, (state, { payload }) => {
        dataAdapter.addMany(state, payload);
        state.loadingStatus = 'finish';
        state.error = null;
      })
      .addCase(fetchLoading.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectors = dataAdapter.getSelectors((state) => state.data);
export const { actions } = dataSlice;
export default dataSlice.reducer;
