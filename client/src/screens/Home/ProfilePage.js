import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CFooter from '../../components/Elements/Footer';
import CProfileHeader from '../../components/Elements/ProfileHeader';

export default function ProfilePage({ navigation }) {
    const page = 'ProfilePage';

    const panelRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [formSearch, setFormSearch] = useState({
        q: ''
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

    useEffect(() => {
        if (formSearch.q !== '') {
            console.log({ formSearch });
        }
    }, [formSearch]);

    return (

        <View className="flex bg-white min-h-screen ">
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            > */}

            <CProfileHeader />

            <View className="flex-1 w-full my-2 " style={{ flex: 1 }}>
                <View className="flex flex-row w-full">
                    <View className="mx-3 my-2 flex-row ">
                        <View className="w-20 h-20 rounded-full overflow-hidden">
                            <Image
                                source={require('../../assets/images/dummy_img1.jpg')}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                    </View>
                    <View className="flex justify-center items-center w-3/5 ml-4 ">

                        <View className="flex flex-row gap-8" style={{ minWidth: '70%' }}>
                            <View className="flex items-center">
                                <Text className="text-xl font-bold">
                                    0
                                </Text>
                                <Text className="font-semibold">
                                    Posts
                                </Text>
                            </View>
                            <View className="flex items-center">
                                <Text className="text-xl font-bold">
                                    0
                                </Text>
                                <Text className="font-semibold">
                               
                                    Followers
                                </Text>
                            </View>
                            <View className="flex items-center">
                                <Text className="text-xl font-bold">
                                    0
                                </Text>
                                <Text className="font-semibold">
                                
                                    Followings
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
                <View className="mx-4 w-full mt-1">
                    <Text className="font-semibold text-md">Arvi Naufal Agustian</Text>
                </View>
                <View className="mx-4 w-full">
                    <Text className="text-md">Welcome! this is your profile</Text>
                </View>


            </View>

            <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center `} style={{ height: '8%', borderTopWidth: 1 }}>
                <CFooter navigation={navigation} />
            </View>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}

