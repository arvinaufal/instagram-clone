import { Text, TouchableOpacity, View } from "react-native";

const CButton = ({ classname, children, type, navigation, postLogin, postRegister }) => {
    return (
        <View className="mx-4">
            <TouchableOpacity
                className="h-10 bg-sky-400 flex justify-center items-center rounded-md"
                onPress={() => {
                    if (type === 'login') {
                        postLogin();
                    }else{
                        postRegister();
                    }
                }}
            >
                <Text className="text-white font-bold" >{type === 'register' ? 'Register' : 'Login'}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CButton;