import '../styles/geralPages.css';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';


export default function App({ Component, pageProps }) {
  return( 
    <div>
      <Header/>
      <Component {...pageProps} />
    </div>
  )
}
