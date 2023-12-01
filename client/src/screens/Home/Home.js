import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Home({ navigation }) {

    return (
        <View className="flex bg-white min-h-screen ">
            <View className="bg-white flex flex-row mx-4 justify-between border-b-gray-600" style={{ height: '10%' }}>
                <View className="flex items-end flex-row h-full pb-1">
                    <Image
                        source={
                            require('../../assets/images/ig_logo100.png')
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
            <View className="bg-lime-600 flex-1 w-full">
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

                                    <Ionicons name="chatbubble-outline" size={24} color="black" />

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
                        <View className="mx-4 my-1 flex-1">
                            <Text className="opacity-40">View all 378,981 comments</Text>
                        </View>
                        <View className="mx-4 flex-1">
                            <Text className="opacity-40 text-xs">1 day ago</Text>
                        </View>
                    </View>



                </ScrollView>

            </View>
            <View className="bg-white border-t-slate-200 flex flex-row justify-around items-center" style={{ height: '8%', borderTopWidth: 1 }}>
                <Icon name="home" size={24} color="black" />
                <Icon name="magnify" size={24} color="gray" />
                <Icon name="plus-box" size={24} color="gray" />
                <Icon name="heart" size={24} color="gray" />
                <Icon name="account-circle" size={24} color="gray" />
            </View>
        </View>
    )
}

