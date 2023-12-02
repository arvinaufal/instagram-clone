import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CHeader from '../../components/Elements/Header';

export default function Home({ navigation }) {
    const [isTyping, setIsTyping] = useState(false);
    const [formPost, setFormPost] = useState({
        content: '',
        tags: '',
        imgUrl: ''
    });
    const panelRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    useEffect(() => {
        if (panelRef.current) {
            //    panelRef.current.togglePanel()

        }
    }, []);

    let Posts = [];
    for (let index = 0; index < 4; index++) {
        Posts.push(Post);
    }

    const handleAddPost = async () => {
        console.log({ formPost });
    }

    return (

        <View className="flex bg-white min-h-screen ">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <CHeader />

                <View className="flex-1 w-full" style={{ flex: 1 }}>
                    <ScrollView>
                        {
                            Posts.map((el, index) => (
                                <Post key={index} navigation={navigation} />
                            ))
                        }
                    </ScrollView>

                </View>

                {/* <View className={`${isBottomSheetOpen === false ? 'hidden' : ''}`}> */}

                <BottomSheet ref={ref => panelRef.current = ref}>
                    <View className={` ${isTyping ? 'mb-2' : 'mb-16'} ${isBottomSheetOpen ? 'flex' : 'hidden'}`}>
                        <View className="my-2">

                            <TextInput
                                style={{ borderWidth: 0.4 }}
                                className="mx-2 h-10 bg-slate-100 rounded-md px-4 py-1 border-slate-300"
                                onChangeText={(text) => setFormPost({ ...formPost, content: text })}
                                value={formPost.content}
                                placeholder="Content"
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                            />
                        </View>
                        <View className="my-2">

                            <TextInput
                                style={{ borderWidth: 0.4 }}
                                className="mx-2 h-10 bg-slate-100 rounded-md px-4 py-1 border-slate-300"
                                onChangeText={(text) => setFormPost({ ...formPost, imgUrl: text })}
                                value={formPost.imgUrl}
                                placeholder="Image Url"
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                            />
                        </View>
                        <View className="my-2">

                            <TextInput
                                style={{ borderWidth: 0.4 }}
                                className="mx-2 h-10 bg-slate-100 rounded-md px-4 py-1 border-slate-300"
                                onChangeText={(text) => setFormPost({ ...formPost, tags: text })}
                                value={formPost.tags}
                                placeholder="Tag"
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                            />
                            <View className="mx-4 my-4">
                                <TouchableOpacity
                                    className="h-10 bg-sky-400 flex justify-center items-center rounded-md"
                                    onPress={() => handleAddPost()}
                                >
                                    <Text className="text-white font-bold" >Tambah Postingan</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                </BottomSheet>
                {/* </View> */}

                <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center ${isTyping ? 'hidden' : ''}`} style={{ height: '8%', borderTopWidth: 1 }}>
                    <Icon name="home" size={24} color="black" />
                    <Icon name="magnify" size={24} color="gray" />
                    <TouchableOpacity onPress={
                        () => {
                            panelRef.current.togglePanel()
                            setIsBottomSheetOpen(!isBottomSheetOpen);
                        }
                    }>
                        <Icon name="plus-box" size={24} color="gray" />
                    </TouchableOpacity>
                    <Icon name="heart" size={24} color="gray" />
                    <Icon name="account-circle" size={24} color="gray" />
                </View>
            </KeyboardAvoidingView>


        </View>
    )
}

