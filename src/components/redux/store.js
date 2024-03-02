// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['contacts'], // Вказати, що не потрібно зберігати дані для 'contacts'
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const persistConfigFilter = {
  key: 'filter',
  storage,
};

const persistedReducerFilter = persistReducer(persistConfigFilter, filterReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filter: persistedReducerFilter,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);