import { useContext, useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { LoginContext } from '../../../context/LoginContext';


const CProfileHeader = ({ classname, children, type, navigation, profile }) => {
    const { logoutAction } = useContext(LoginContext);

    return (
        <View className="bg-white flex flex-row mx-4 justify-between border-b-gray-600" style={{ height: '10%' }}>
            <View className="flex items-end flex-row h-full pb-1">
                <View className="mx-2 mb-1" >
                    <Ionicons name="lock-closed-outline" size={18} color="black" />
                </View>

                <Text className="text-xl font-bold">{profile.username}</Text>
                <View className=" mx-1" style={{marginBottom: 3}}>
                    <Entypo name="chevron-down" size={20} color="black" />
                </View>
            </View>

            <View className="flex items-end flex-row pb-2 gap-6 pr-2">
                <TouchableOpacity onPress={() => logoutAction('token')}>

                <View className="pb-1 mx-2">
                    <MaterialCommunityIcons name="logout" size={24} color="red" />
                </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CProfileHeader;