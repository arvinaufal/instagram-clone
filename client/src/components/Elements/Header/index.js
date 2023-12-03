import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';


const CHeader = ({ classname, children, type, navigation }) => {
    return (
        <View className="bg-white flex flex-row mx-4 justify-between border-b-gray-600" style={{ height: '10%' }}>
            <View className="flex items-end flex-row h-full pb-1">
                <Image
                    source={
                        require('../../../assets/images/ig_logo100.png')
                    }
                />
            </View>

            <View className="flex items-end flex-row pb-2 gap-6 pr-2">
                <Ionicons name="heart-outline" size={28} color="black" />
                <View className="pb-1">

                    <FontAwesome name="paper-plane-o" size={24} color="black" />
                </View>
            </View>
        </View>
    );
}

export default CHeader;