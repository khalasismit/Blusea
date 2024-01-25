import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// import rootReducer from './reducers'; // Import your rootReducer
import authSlice from '../reducers';

const persistConfig = {
  key: 'root', // Key for storage
  storage,     // Storage type (localStorage)
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;

