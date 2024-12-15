import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import statusReducer from './slices/statusSlice';
import authReducer from './slices/authSlice';
import preferencesReducer from './slices/preferencesSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
    status: statusReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
