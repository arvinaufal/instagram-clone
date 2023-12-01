import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { Text, View } from 'react-native';
import Register from './src/screens/Auth/Register';
import Login from './src/screens/Auth/Login';


export default function App() {
  return (
    // <View style={styles.container}>
    // <Register />
    <Login />
//     <View className="bg-violet-600 h-min-screen">
//     <Text>sjcisjdco</Text>
// </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
