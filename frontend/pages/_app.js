import '../styles/globals.css';
import '../styles/geralPages.css';
import '../styles/inventarioStyle.css';
import '../styles/componentsStyles.css';
import '../styles/indexStyle.css';

import { AppProvider } from '../contexts/AppContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
       <Component  {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
