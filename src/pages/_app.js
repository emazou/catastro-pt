import 'antd/dist/antd.css';
import 'styles/globals.css';
import { Provider } from 'react-redux';
import MainLayout from 'layout/MainLayout';
import store from 'features/store';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

export default MyApp
