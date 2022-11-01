import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
    uri: 'https://catastro-pt.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": "scqVM0MOceLC8ZWUL7ysDbUKGmHsE48Quhc40KhDVpPROTVKw706UnPTvo3wFIFN"
    }
});
export default client;