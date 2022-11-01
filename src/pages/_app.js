import 'antd/dist/antd.css';
import 'styles/globals.css'
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import MainLayout from 'layout/MainLayout';
import client from '../lib/apollo_client';
import store from 'redux/store';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
