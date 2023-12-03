import { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../../components/Layouts/Post';
import BottomSheet from 'react-native-simple-bottom-sheet';
import CFooter from '../../components/Elements/Footer';
import CProfileHeader from '../../components/Elements/ProfileHeader';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_PROFILE = gql`
query User {
  user {
    _id
    name
    email
    followings {
      _id
      name
      username
    }
    followers {
      _id
      name
      username
    }
    posts {
      _id
      content
    }
    username
  }
}
`;

export default function ProfilePage({ navigation }) {
    const page = 'ProfilePage';
    const [fetchProfile, { loading, error, data }] = useLazyQuery(GET_PROFILE, {
        fetchPolicy: 'network-only',
    });
    const [profile, setProfile] = useState('');
    const panelRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [formSearch, setFormSearch] = useState({
        q: ''
    });

    useEffect(() => {
        fetchProfile();
      }, [navigation]);

    useEffect(() => {
        if (data) {
            setProfile(data.user);
        }
    }, [data]);

    return (

        <View className="flex bg-white min-h-screen ">

            {
                profile !== '' && <CProfileHeader profile={profile} />
            }

            {
                profile !== '' ?
                    (<View className="flex-1 w-full my-2 " style={{ flex: 1 }}>
                        <View className="flex flex-row w-full">
                            <View className="mx-3 my-2 flex-row ">
                                <View className="w-20 h-20 rounded-full overflow-hidden">
                                    <Image
                                        source={{ uri: `https://cdn-icons-png.flaticon.com/512/149/149071.png` }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            </View>
                            <View className="flex justify-center items-center w-3/5 ml-4 ">

                                <View className="flex flex-row gap-8" style={{ minWidth: '70%' }}>
                                    <View className="flex items-center">
                                        <Text className="text-xl font-bold">
                                            {profile.posts.length}
                                        </Text>
                                        <Text className="font-semibold">
                                            Posts
                                        </Text>
                                    </View>
                                    <View className="flex items-center">
                                        <Text className="text-xl font-bold">
                                            {profile.followers.length}
                                        </Text>
                                        <Text className="font-semibold">

                                            Followers
                                        </Text>
                                    </View>
                                    <View className="flex items-center">
                                        <Text className="text-xl font-bold">
                                            {profile.followings.length}
                                        </Text>
                                        <Text className="font-semibold">

                                            Followings
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View className="mx-4 w-full mt-1">
                            <Text className="font-semibold text-md">{profile.name}</Text>
                        </View>
                        <View className="mx-4 w-full">
                            <Text className="text-md">Welcome! this is your profile</Text>
                        </View>


                    </View>)

                    :
                    <ActivityIndicator />
            }

            <View className={`bg-white border-t-slate-200 flex flex-row justify-around items-center `} style={{ height: '8%', borderTopWidth: 1 }}>
                <CFooter navigation={navigation} />
            </View>
        </View>
    )
}

