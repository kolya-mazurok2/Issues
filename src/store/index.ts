import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import assigneesSlice from './slices/assigneesSlice';
import issuesSlice from './slices/issuesSlice';
import labelsSlice from './slices/labelsSlice';

const store = configureStore({
  reducer: {
    issues: issuesSlice.reducer,
    assignees: assigneesSlice.reducer,
    labels: labelsSlice.reducer,
  },
  enhancers: [applyMiddleware(thunk)],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
