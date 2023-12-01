import { LoginProvider } from './src/context/LoginContext';
import MainStack from './src/navigators/MainStack';


export default function App() {
  return (
    <LoginProvider>
      <MainStack />
    </LoginProvider>
  );
}