import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const CFooter = ({ classname, children, type, navigation, page }) => {
    return (
        <>
            <TouchableOpacity onPress={
                () => {
                    navigation.navigate('Home')
                }
            }>
                <Icon name="home" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={
                () => {
                    navigation.navigate('SearchPage')
                }
            }>
                <Icon name="magnify" size={24} color="gray" />
            </TouchableOpacity>

            {/* {
                    page === 'Home' ? (
                        <TouchableOpacity onPress={
                            () => {
                                panelRef.current.togglePanel()
                                setIsBottomSheetOpen(!isBottomSheetOpen);
                            }
                        }>
                            <Icon name="plus-box" size={24} color="gray" />
                        </TouchableOpacity>
        
                    ) :
                    (
                        <Icon name="plus-box" size={24} color="gray" />
                    )
                } */}
            <Icon name="plus-box" size={24} color="gray" />
            <Icon name="heart" size={24} color="gray" />
            <TouchableOpacity onPress={
                () => {
                    navigation.navigate('ProfilePage')
                }
            }>

                <Icon name="account-circle" size={24} color="gray" />
            </TouchableOpacity>
        </>
    );
}

export default CFooter;