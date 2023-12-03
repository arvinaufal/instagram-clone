import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import Home from "../screens/Home/Home";
import PostDetail from "../screens/Home/PostDetail";
import SearchPage from "../screens/Home/SearchPage";
import ProfilePage from "../screens/Home/ProfilePage";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    isLoggedIn ? (
                        <>
                            <Stack.Screen
                                name="Home"
                                options={{
                                    headerShown: false,
                                }}
                                component={Home}
                            />
                            <Stack.Screen
                                name="PostDetail"
                                options={{
                                    headerShown: false,
                                }}
                                component={PostDetail}
                            />
                            <Stack.Screen
                                name="SearchPage"
                                options={{
                                    headerShown: false,

                                }}
                                component={SearchPage}
                            />
                            <Stack.Screen
                                name="ProfilePage"
                                options={{
                                    headerShown: false,

                                }}
                                component={ProfilePage}
                            />
                        </>
                    )
                        :
                        (
                            <>
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
                            </>
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}