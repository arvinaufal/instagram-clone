import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import CButton from '../../components/Elements/Button';
import FormAuth from '../../components/Layouts/FormAuth';

export default function Login({ navigation }) {
    const [isTyping, setIsTyping] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const changeIsTyping = (value) => {
        setIsTyping(value);
    }
    const changeIsPasswordShown = (value) => {
        setIsPasswordShown(value);
    }

    return (
        <View className="flex bg-white min-h-screen justify-center items-center">
            <View className={`flex w-screen ${isTyping ? 'mb-36' : ''}`}>
                <View className="bg-white w-full flex items-center">
                    <View className="min-w-full h-24 flex justify-center items-center">
                        <Image
                            source={
                                require('../../assets/images/ig_logo228.png')
                            }
                        />
                    </View>
                </View>
                <View className="bg-white py-4 w-full flex flex-col">
                    <FormAuth changeIsTyping={changeIsTyping} type={'Login'} changeIsPasswordShown={changeIsPasswordShown} isPasswordShown={isPasswordShown} />
                </View>
                <View className="bg-white w-full">
                    <CButton type={'login'} navigation={navigation} />
                    <View className="my-4 flex-row justify-center items-center">
                        <View className='flex-1 h-px bg-gray-300 mr-6 ml-4' />
                        <Text className="font-semibold opacity-40">OR</Text>
                        <View className='flex-1 h-px bg-gray-300 ml-6 mr-4' />
                    </View>
                    <View className="mx-4 flex-row justify-center items-center">
                        <Text className="text-md">Don't Have an account? </Text>
                        <Text className="text-md font-bold text-sky-600" onPress={() => navigation.navigate('Register')}>Register</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}