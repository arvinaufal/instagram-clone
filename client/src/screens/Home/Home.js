import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CHeader from '../../components/Elements/Header';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_POST = gql`
 query Posts {
  posts {
    _id
    comments {
      content
      authorId
      createdAt
      updatedAt
    }
    authorId
    content
    createdAt
    imgUrl
    likes {
      authorId
      createdAt
      updatedAt
    }
    tags
    updatedAt
    author {
      _id
      name
      username
    }
  }
}
`;

const ADD_POST = gql`
mutation AddPost($tags: [String], $imgUrl: String, $content: String) {
  addPost(tags: $tags, imgUrl: $imgUrl, content: $content) {
    _id
    authorId
    comments {
      content
      authorId
      createdAt
      updatedAt
    }
    content
    createdAt
    imgUrl
    likes {
      authorId
      createdAt
      updatedAt
    }
    tags
    updatedAt
  }
}
`;


export default function Home({ navigation }) {
    const { loading, error, data } = useQuery(GET_POST);
    const [addPosting, { data: addPostData, error: addPostError, loading: addPostLoading }] = useMutation(ADD_POST, { refetchQueries: [GET_POST] });
    const page = 'Home';
    const [posts, setPosts] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [formPost, setFormPost] = useState({
        content: '',
        tags: '',
        imgUrl: ''
    });
    const panelRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    useEffect(() => {
        if (data) {
            setPosts(data.posts);
        }
    }, [data]);

    const handleAddPost = async () => {
        if (addPostLoading) return;
        await addPosting({ variables: formPost });

        if (error) {
            throw error;
        }

        if (data) {
            setFormPost({
                content: '',
                tags: '',
                imgUrl: ''
            });
            Keyboard.dismiss();
            setIsBottomSheetOpen(!isBottomSheetOpen);
        }

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
                            posts !== '' ?
                                posts.map((el, index) => (
                                    <Post key={el._id} navigation={navigation} post={el} />
                                ))
                                :
                                <ActivityIndicator />
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

                                    {
                                        addPostLoading ?
                                            <ActivityIndicator />
                                            :
                                            <Text className="text-white font-bold" >Tambah Postingan</Text>
                                    }

                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                </BottomSheet>
                {/* </View> */}

                <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center ${isTyping ? 'hidden' : ''}`} style={{ height: '8%', borderTopWidth: 1 }}>
                    <TouchableOpacity onPress={
                        () => {
                            navigation.replace('Home')
                        }
                    }>
                        <Icon name="home" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={
                        () => {
                            navigation.replace('SearchPage')
                        }
                    }>
                        <Icon name="magnify" size={24} color="gray" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        () => {
                            panelRef.current.togglePanel()
                            setIsBottomSheetOpen(!isBottomSheetOpen);
                        }
                    }>
                        <Icon name="plus-box" size={24} color="gray" />
                    </TouchableOpacity>
                    <Icon name="heart" size={24} color="gray" />
                    <TouchableOpacity onPress={
                        () => {
                            navigation.replace('ProfilePage')
                        }
                    }>

                        <Icon name="account-circle" size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>


        </View>
    )
}

