import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';

const Post = ({ navigation, post }) => {
    const formattedLikes = post.likes ? post.likes.length.toLocaleString('us') : "0";
    const formattedTags = post.tags ? post.tags.map(element => `#${element}`).join(' ') : '';
    return (
        <View className="flex bg-white pb-2">
            <View className="flex flex-row w-full">
                <View className="w-5/6 mx-3 my-2 flex-row">
                    <View className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    <View className="flex justify-center px-2">
                        <Text className="font-semibold">{post.author.username}</Text>
                    </View>
                </View>
                <View className="w-1/6 flex justify-center">
                    <Feather name="more-vertical" size={24} color="black" />
                </View>
            </View>
            <View className="flex w-full">
                <Image
                    source={{ uri: `${post.imgUrl}` }}
                    style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                />
            </View>
            <View className="flex flex-row my-2 mx-4">
                <View className="flex w-5/6">
                    <View className="flex flex-row gap-x-4">

                        <AntDesign name="heart" size={24} color="red" />

                        <TouchableOpacity
                            className="flex justify-center items-center rounded-md"

                            onPress={() => navigation.navigate('PostDetail', {
                                postId: `${post._id}`
                            })}
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
                <Text className="font-semibold">{formattedLikes} likes</Text>
            </View>
            <View style={{ maxWidth: '100%' }} className="mx-4 flex-1">
                <Text style={{ lineHeight: 20, fontSize: 14 }}>
                    <Text style={{ fontWeight: 'bold' }}>{post.author.username} </Text>
                    <Text>
                        {post.content}
                    </Text>
                </Text>
                <Text className="text-blue-700">
                    {formattedTags}
                </Text>
            </View>
            <View className="mx-4 my-1 flex-1">
                <TouchableOpacity

                    onPress={() => navigation.navigate('PostDetail', {
                        postId: `${post._id}`
                    })}
                >
                    <Text className="opacity-40">View all {post.comments ? post.comments.length : "0"} comments</Text>
                </TouchableOpacity>

            </View>
            <View className="mx-4 flex-1">
                <Text className="opacity-40 text-xs">1 day ago</Text>
            </View>
        </View>
    )
}

export default Post;