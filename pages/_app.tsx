import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <Component {...pageProps} />
        <ToastContainer />
        </PersistGate>
      </Provider>
    </>
  );
};

export default MyApp;