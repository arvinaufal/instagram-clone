import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Home from "../screens/Home/Home";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    options={{
                        headerShown: false,
                    }}
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    options={{
                        headerShown: false,
                    }}
                    component={Register}
                />
                <Stack.Screen
                    name="Home"
                    options={{
                        headerShown: false,
                    }}
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}