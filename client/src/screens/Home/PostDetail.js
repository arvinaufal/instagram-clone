import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CHeader from '../../components/Elements/Header';
import CFooter from '../../components/Elements/Footer';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

const GET_POST = gql`
query PostsById($postId: String) {
  postsById(postId: $postId) {
    _id
    content
    tags
    imgUrl
    authorId
    createdAt
    updatedAt
    likes {
      authorId
      createdAt
      updatedAt
      user {
        _id
        name
        username
      }
    }
    comments {
      content
      authorId
      createdAt
      updatedAt
      user {
        _id
        name
        username
      }
    }
    author {
      _id
      name
      username
    }
    isLiked
  }
}
`;

const ADD_COMMENT = gql`
mutation AddComment($content: String, $postId: ID) {
  addComment(content: $content, postId: $postId) {
    authorId
    content
    createdAt
    updatedAt
  }
}
`;

const LIKE = gql`
mutation Like($postId: String) {
  like(postId: $postId) {
    authorId
  }
}
`;

export default function PostDetail({ navigation, route }) {
    const { postId } = route.params;
    const params = { postId };
    const page = 'PostDetail';
    const { loading, error, data } = useQuery(GET_POST, { variables: params });
    const [addComment, { data: dataComment, error: errorComment, loading: loadingComment }] = useMutation(ADD_COMMENT, { refetchQueries: [GET_POST] });
    const [like, { data: dataLike, error: errorLike, loading: loadingLike }] = useMutation(LIKE, { refetchQueries: [GET_POST] });
    const [post, setPost] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const panelRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [likedColor, setLikedColor] = useState("rgb(0, 0, 0)");
    const [likedType, setLikedType] = useState("hearto");
    const [formComment, setFormComment] = useState({
        content: ''
    });
    const formattedTags = post.tags ? post.tags.map(element => `#${element}`).join(' ') : '';

    useEffect(() => {
        if (data) {
            setPost(data.postsById);
            if (data.postsById.isLiked === "true") {
                setLikedColor("rgb(255, 0 , 0)");
                setLikedType("heart");
            } else {
                setLikedColor("rgb(0, 0, 0)");
                setLikedType("hearto");
            }
        }
    }, [data]);

    const handleAddComment = async () => {
        try {
            if (loadingComment) return;
            await addComment({ variables: { ...formComment, postId } });
            if (error) {
                throw error;
            }
            Keyboard.dismiss();
            setFormComment({
                content: ''
            });
        } catch (err) {
            console.log(err);
        }
    }

    const handleLike = async () => {
        try {
            if (loadingLike) return;
            await like({ variables: { postId } });
            if (error) {
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (

        <View className="flex bg-white min-h-screen ">
            <CHeader />

            <View className="flex-1 w-full" style={{ flex: 1 }}>
                <ScrollView>
                    {
                        post !== ''
                            ?
                            (
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
                                                <TouchableOpacity onPress={() => {
                                                    handleLike();
                                                }}>

                                                    <AntDesign name={`${likedType}`} size={24} color={`${likedColor}`} />

                                                </TouchableOpacity>


                                                <TouchableOpacity
                                                    className="flex justify-center items-center rounded-md"
                                                    onPress={() => navigation.replace('PostDetail', {
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
                                        <Text className="font-semibold">{post.likes !== null ? post.likes.length : "0"} likes</Text>
                                    </View>
                                    <View style={{ maxWidth: '100%' }} className="mx-4 flex-1">
                                        <Text style={{ lineHeight: 20, fontSize: 14 }}>
                                            <Text style={{ fontWeight: 'bold' }}>{post.author.username} </Text>
                                            <Text>
                                                {post.content}
                                            </Text>
                                            <Text className="text-blue-700">
                                                 {formattedTags}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View className="mx-4 my-2 flex-1">
                                        <Text className="text-center text-md font-bold">comments</Text>
                                    </View>
                                    <View className="mx-4 my-2 flex-1">
                                        <View className="flex flex-row w-full">
                                            <View className="flex">

                                                {
                                                    post.comments !== null
                                                        ?
                                                        (
                                                            post.comments.map((comment, index) => (
                                                                <View className="w-5/6 mx-3 my-2 flex-row" key={index}>
                                                                    <View className="w-8 h-8 rounded-full overflow-hidden">
                                                                        <Image
                                                                            source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }}
                                                                            style={{ width: '100%', height: '100%' }}
                                                                        />
                                                                    </View>
                                                                    <View className="flex justify-center px-2">
                                                                        <Text className="font-semibold">{comment?.user?.username}</Text>
                                                                        <Text className="font-normal">{comment?.content}</Text>

                                                                    </View>
                                                                </View>
                                                            ))
                                                        )
                                                        :
                                                        <View className="flex w-screen justify-center content-center">

                                                            <Text className="text-center"> 0 comment </Text>
                                                        </View>
                                                }

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                            :
                            <ActivityIndicator />
                    }

                </ScrollView>

            </View>
            <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center ${isTyping ? 'mb-56' : ''}`} style={{ height: '8%', borderTopWidth: 1 }}>
                <View className="w-5/6 mx-3 my-2 flex-row items-center ">
                    <View className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    <View className="flex justify-center px-2 w-4/5 ">
                        <TextInput
                            style={{ borderWidth: 0.4 }}
                            className="mx-4 h-10 bg-slate-100 rounded-md px-4 py-1 border-slate-100 w-full"
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
                <CFooter navigation={navigation} />
            </View>
        </View>
    )
}

