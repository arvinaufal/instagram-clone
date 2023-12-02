import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store';

const httpLink = createHttpLink({
    uri: 'https://a79e-158-140-191-16.ngrok-free.app'
})

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync('token');
    return {
        headers: {
            
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;