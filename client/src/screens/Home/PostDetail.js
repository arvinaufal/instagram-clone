import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CHeader from '../../components/Elements/Header';

export default function PostDetail({ navigation }) {
    const [isTyping, setIsTyping] = useState(false);
    const panelRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [formComment, setFormComment] = useState({
        content: ''
    });
    useEffect(() => {
        if (panelRef.current) {
            //    panelRef.current.togglePanel()

        }
    }, []);

    let Posts = [];
    for (let index = 0; index < 4; index++) {
        Posts.push(Post);
    }

    const handleAddComment = async () => {
        console.log({ formComment });
    }

    return (

        <View className="flex bg-white min-h-screen ">
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            > */}



            <CHeader />

            <View className="flex-1 w-full" style={{ flex: 1 }}>
                <ScrollView>

                    <View className="flex bg-white pb-2">
                        <View className="flex flex-row w-full">
                            <View className="w-5/6 mx-3 my-2 flex-row">
                                <View className="w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                        source={require('../../assets/images/dummy_img1.jpg')}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View className="flex justify-center px-2">
                                    <Text className="font-semibold">arvinaufal</Text>
                                </View>
                            </View>
                            <View className="w-1/6 flex justify-center">
                                <Feather name="more-vertical" size={24} color="black" />
                            </View>
                        </View>
                        <View className="flex w-full">
                            <Image
                                source={{ uri: 'https://asset.kompas.com/crops/OJwfY1vMekpD6AThHdAW7GDOl4k=/0x218:1080x938/750x500/data/photo/2023/05/09/6459ad0feb9dd.jpg' }}
                                style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                            />
                        </View>
                        <View className="flex flex-row my-2 mx-4">
                            <View className="flex w-5/6">
                                <View className="flex flex-row gap-x-4">
                                    <AntDesign name="heart" size={24} color="red" />

                                    <TouchableOpacity
                                        className="flex justify-center items-center rounded-md"
                                        onPress={() => navigation.navigate('PostDetail')}
                                    >
                                        <Ionicons name="chatbubble-outline" size={24} color="black" />
                                    </TouchableOpacity>

                                    <Ionicons name="paper-plane-outline" size={24} color="black" />
                                </View>

                            </View>
                            <View className="flex w-1/6">
                                <View className="flex justify-end w-full pl-7">
                                    <Ionicons name="bookmark-outline" size={24} color="black" />
                                </View>
                            </View>
                        </View>
                        <View className="mx-4">
                            <Text className="font-semibold">7,281,832 likes</Text>
                        </View>
                        <View style={{ maxWidth: '100%' }} className="mx-4 flex-1">
                            <Text style={{ lineHeight: 20, fontSize: 14 }}>
                                <Text style={{ fontWeight: 'bold' }}>arvinaufal </Text>
                                <Text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor blandit diam, eu mollis ligula varius quis.
                                    Etiam arcu justo, finibus sit amet convallis quis, lacinia in risus. Aenean non mollis mauris.
                                    Vivamus vehicula nisi at condimentum tempor. Vivamus vel lacinia nisl. Aliquam congue elit sed enim tristique blandit.
                                    Donec molestie pulvinar tortor id rhoncus.
                                </Text>
                            </Text>
                        </View>
                        <View className="mx-4 my-2 flex-1">
                            <Text className="text-center text-md font-bold">comments</Text>
                        </View>
                        <View className="mx-4 my-2 flex-1">
                            <View className="flex flex-row w-full">
                                <View className="flex">

                                    <View className="w-5/6 mx-3 my-2 flex-row">
                                        <View className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                source={require('../../assets/images/dummy_img1.jpg')}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </View>
                                        <View className="flex justify-center px-2">
                                            <Text className="font-semibold">arvinaufal</Text>
                                            <Text className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor blandit diam, eu mollis ligula varius quis.
                                                Etiam arcu justo, finibus sit amet convallis quis, lacinia in risus. Aenean non mollis mauris.
                                                Vivamus vehicula nisi at condimentum tempor. Vivamus vel lacinia nisl. Aliquam congue elit sed enim tristique blandit.
                                                Donec molestie pulvinar tortor id rhoncus.</Text>

                                        </View>
                                    </View>
                                    <View className="w-5/6 mx-3 my-2 flex-row">
                                        <View className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                source={require('../../assets/images/dummy_img1.jpg')}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </View>
                                        <View className="flex justify-center px-2">
                                            <Text className="font-semibold">arvinaufal</Text>
                                            <Text className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor blandit diam, eu mollis ligula varius quis.
                                                Etiam arcu justo, finibus sit amet convallis quis, lacinia in risus. Aenean non mollis mauris.
                                                Vivamus vehicula nisi at condimentum tempor. Vivamus vel lacinia nisl. Aliquam congue elit sed enim tristique blandit.
                                                Donec molestie pulvinar tortor id rhoncus.</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>

            </View>
            <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center ${isTyping ? 'mb-56' : ''}`} style={{ height: '10%', borderTopWidth: 1 }}>
                <View className="w-5/6 mx-3 my-2 flex-row items-center ">
                    <View className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            source={require('../../assets/images/dummy_img1.jpg')}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    <View className="flex justify-center px-2 w-4/5 ">
                        <TextInput
                            style={{ borderWidth: 0.4 }}
                            className="mx-4 h-12 bg-slate-100 rounded-md px-4 py-1 border-slate-100 w-full"
                            onChangeText={(text) => setFormComment({ ...formComment, content: text })}
                            value={formComment.content}
                            placeholder="Comments"
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                        />
                    </View>
                    <View className="flex justify-center px-2 ml-4 w-1/5 ">
                        <TouchableOpacity onPress={() => {
                            handleAddComment();
                        }}>

                            <Ionicons name="md-send" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center `} style={{ height: '8%', borderTopWidth: 1 }}>
                <TouchableOpacity onPress={
                    () => {
                        navigation.navigate('Home')
                    }
                }>
                    <Icon name="home" size={24} color="black" />
                </TouchableOpacity>

                <Icon name="magnify" size={24} color="gray" />

                <Icon name="plus-box" size={24} color="gray" />

                <Icon name="heart" size={24} color="gray" />
                <Icon name="account-circle" size={24} color="gray" />
            </View>
            {/* </KeyboardAvoidingView> */}


        </View>
    )
}

