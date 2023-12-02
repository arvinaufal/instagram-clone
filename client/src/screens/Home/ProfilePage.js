import { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CHeader from '../../components/Elements/Header';
import CFooter from '../../components/Elements/Footer';

export default function Profile({ navigation }) {
    const page = 'Profile';
   
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
            console.log({formSearch});
        }
    }, [formSearch]);

    return (

        <View className="flex bg-white min-h-screen ">
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            > */}

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
                        <View className="flex flex-row w-full mr-4 justify-between">
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
                                <View className="mr-8 bg-sky-600 rounded-md h-6 flex  w-20  items-center justify-center">
                                    <Text className="text-center text-white">Follow</Text>
                                </View>
                            </View>
                        </View>
                        <View className="flex flex-row w-full mr-4 justify-between">
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
                        </View>
                    </View>

                </ScrollView>

            </View>

            <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center `} style={{ height: '8%', borderTopWidth: 1 }}>
                <CFooter navigation={navigation} />
            </View>
            {/* </KeyboardAvoidingView> */}


        </View>
    )
}

