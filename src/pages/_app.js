import 'antd/dist/antd.css';
import 'styles/globals.css'
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import MainLayout from 'layout/MainLayout';
import client from '../lib/apollo_client';
import store from 'redux/store';
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp
