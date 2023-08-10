import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import orderReducer from './slices/order';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedOrderReducer = persistReducer(persistConfig, orderReducer);

const store = configureStore({
  reducer: {
    order: persistedOrderReducer,
    // Add other reducers if needed
  },
});

const persistor = persistStore(store);

export { store, persistor };