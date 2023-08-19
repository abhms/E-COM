import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import orderReducer from './slices/order';
import sellerReducer from './slices/seller';

const persistConfigOrder = {
  key: 'order',
  storage,
};

const persistConfigSeller = {
  key: 'seller', 
  storage,
};

const persistedOrderReducer = persistReducer(persistConfigOrder, orderReducer);
const persistedSellerReducer = persistReducer(persistConfigSeller, sellerReducer);

const store = configureStore({
  reducer: {
    order: persistedOrderReducer,
    seller: persistedSellerReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
