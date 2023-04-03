import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['role','nickname','isAuthenticated',"profileImg"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: { 
    auth: authReducer,
 },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };