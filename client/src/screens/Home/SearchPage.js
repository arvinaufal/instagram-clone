import { useEffect, useRef, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CHeader from '../../components/Elements/Header';
import CFooter from '../../components/Elements/Footer';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

const SEARCH_USER = gql`
query SearchUser($q: String!) {
  searchUser(q: $q) {
    _id
    name
    username
    isFollowed
  }
}
`;

const FOLLOW = gql`
mutation Follow($followingId: String) {
  follow(followingId: $followingId) {
    _id
    followerId
    followingId
  }
}
`;


export default function SearchPage({ navigation }) {
    const page = 'SearchPage';
    const [getSearch, { loading, error, data }] = useLazyQuery(SEARCH_USER);
    const [follow, { data: dataFollow, error: errorFollow, loading: loadingFollow }] = useMutation(FOLLOW);
    const [accounts, setAccounts] = useState([]);
    const panelRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [formSearch, setFormSearch] = useState({
        q: ''
    });

    useEffect(() => {
        if (formSearch.q !== '') {
            getSearch({ variables: formSearch });
        }

        if (data) {
            setAccounts(data.searchUser);
        }

        if (formSearch.q === '') {
            setAccounts([]);
        }
    }, [formSearch.q, getSearch]);

    const handleFollow = async (accountId) => {
        try {
            if (loadingFollow) return;
            await follow({ variables: { followingId: accountId } });

            if (error) {
                throw error;
            }
            Alert.alert("Registered", "You have Successfully Follow account", [
                {
                    text: "OK",
                    style: "default",
                },
            ]);

            navigation.replace('ProfilePage')
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View className="flex bg-white min-h-screen ">
            <CHeader />

            <View className="flex-1 w-full my-2" style={{ flex: 1 }}>
                <View className="flex h-12 mx-2 mr-8">
                    <View className="flex w-full flex-row h-10 mx-2 bg-slate-200 items-center rounded-xl">

                        <View className="pl-2 py-2 pr-0">
                            <Ionicons name="search" size={18} color="gray" />
                        </View>
                        <View className="flex justify-center px-2 w-5/6 ">
                            <TextInput
                                style={{ borderWidth: 0.4 }}
                                className=" h-full bg-slate-200 rounded-md px-4 py-1 border-slate-100"
                                onChangeText={(text) => {
                                    setFormSearch({ ...formSearch, q: text })
                                }}
                                value={formSearch.q}
                                placeholder="Search ..."

                            />
                        </View>

                    </View>
                </View>
                <ScrollView>

                    <View className="flex bg-white pb-2 w-full">
                        {/* <View className="flex flex-row w-full mr-4 justify-between"> */}
                        {
                            accounts.length > 0
                                ?
                                accounts.map((account) => (

                                    <View className="flex flex-row w-full mr-4 justify-between" key={account._id}>
                                        <View className="w-3/6 mx-3 my-2 flex-row">
                                            <View className="w-8 h-8 rounded-full overflow-hidden">
                                                <Image
                                                    source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }}
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </View>
                                            <View className="flex justify-center px-2">
                                                <Text className="font-semibold">{account.username}</Text>
                                            </View>
                                        </View>
                                        <View className="w-24 mx-2 flex justify-center">
                                            <TouchableOpacity onPress={() => {
                                                handleFollow(account._id);
                                            }}>


                                                {
                                                    account.isFollowed === "true"
                                                        ?
                                                        <View className="mr-8 bg-slate-300 rounded-md h-6 flex  w-20  items-center justify-center">

                                                            <Text className="text-center text-black">Followed</Text>

                                                        </View>
                                                        :
                                                        <View className="mr-8 bg-sky-600 rounded-md h-6 flex  w-20  items-center justify-center">


                                                            <Text className="text-center text-white">Follow</Text>
                                                        </View>
                                                }

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                                :
                                <View className="flex justify-center content-center w-full items-center">

                                    <Text className="font-semibold text-md mt-4">Cari user ...</Text>
                                </View>


                        }

                        {/* <View className="w-24 mx-2 flex justify-center">
                                <View className="mr-8 bg-sky-600 rounded-md h-6 flex  w-20  items-center justify-center">
                                    <Text className="text-center text-white">Follow</Text>
                                </View>
                            </View> */}
                        {/* </View> */}
                        {/* <View className="flex flex-row w-full mr-4 justify-between">
                            <View className="w-3/6 mx-3 my-2 flex-row">
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
                            <View className="w-24 mx-2 flex justify-center">
                                <View className="mr-8 bg-slate-200 rounded-md h-6 flex  w-20  items-center justify-center">
                                    <Text className="text-center text-black">Following</Text>
                                </View>
                            </View>
                        </View> */}
                    </View>

                </ScrollView>

            </View>

            <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center `} style={{ height: '8%', borderTopWidth: 1 }}>
                <CFooter navigation={navigation} />
            </View>

        </View>
    )
}

