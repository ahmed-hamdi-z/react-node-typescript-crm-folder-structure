// Redux
import { configureStore, combineReducers } from '@reduxjs/toolkit'

// Reducers
import dashboard from './dashboard'

// Combine Reducers
const reducers = combineReducers({
  dashboard
});

// Store
export const store = configureStore({ 
  reducer: reducers

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
