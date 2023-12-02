import { ApolloProvider } from '@apollo/client';
import { LoginProvider } from './src/context/LoginContext';
import MainStack from './src/navigators/MainStack';
import client from './src/config/apollo';


export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <MainStack />
      </LoginProvider>
    </ApolloProvider>
  );
}

