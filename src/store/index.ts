import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import issuesSlice from './slices/issuesSlice';

const store = configureStore({
  reducer: {
    issues: issuesSlice.reducer,
  },
  enhancers: [applyMiddleware(thunk)],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
