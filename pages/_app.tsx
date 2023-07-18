import { AppProps } from 'next/app';
import "../styles/global.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Add any global context providers or other configurations here

  return (
  <>
  <Component {...pageProps} />
  <ToastContainer />
  </>
  )

};

export default MyApp;
