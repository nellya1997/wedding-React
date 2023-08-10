import { configureStore } from '@reduxjs/toolkit';
import guestReducer from './guestSlice.js';

export default configureStore({
  reducer: {
    guest: guestReducer,
  },
});
