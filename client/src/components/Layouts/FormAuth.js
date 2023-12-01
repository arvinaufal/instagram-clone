import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
export default function FormAuth({ changeIsTyping, changeIsPasswordShown, type, isPasswordShown }) {

    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    return (
        <>
            <View className={`my-2 ${type !== 'register' ? 'hidden' : ''}`}>
                <TextInput
                    style={{ borderWidth: 0.4 }}
                    className="mx-4 h-12 bg-slate-100 rounded-md px-4 py-1 border-slate-300"
                    onChangeText={(text) => setForm({ ...form, name: text })}
                    value={form.name}
                    placeholder="Name"
                    onFocus={() => changeIsTyping(true)}
                    onBlur={() => changeIsTyping(false)}
                />
            </View>
            <View className="my-2">
                <TextInput
                    style={{ borderWidth: 0.4 }}
                    className="mx-4 h-12 bg-slate-100 rounded-md px-4 py-1 border-slate-300"
                    onChangeText={(text) => setForm({ ...form, username: text })}
                    value={form.username}
                    placeholder="Username"
                    onFocus={() => changeIsTyping(true)}
                    onBlur={() => changeIsTyping(false)}
                />
            </View>
            <View className={`my-2 ${type !== 'register' ? 'hidden' : ''}`}>
                <TextInput
                    style={{ borderWidth: 0.4 }}
                    className="mx-4 h-12 bg-slate-100 rounded-md px-4 py-1 border-slate-300"
                    onChangeText={(text) => setForm({ ...form, email: text })}
                    value={form.email}
                    placeholder="Email"
                    onFocus={() => changeIsTyping(true)}
                    onBlur={() => changeIsTyping(false)}
                />
            </View>
            <View className="my-2">
                <TextInput
                    style={{ borderWidth: 0.4 }}
                    className="mx-4 h-12 bg-slate-100 rounded-md px-4 pl-2 pr-14 border-slate-300"
                    secureTextEntry={isPasswordShown}
                    onChangeText={(text) => setForm({ ...form, password: text })}
                    value={form.password}
                    placeholder="Password"
                    onFocus={() => changeIsTyping(true)}
                    onBlur={() => changeIsTyping(false)}
                />
                <TouchableOpacity
                    className="absolute right-8 top-3"
                    onPress={() => changeIsPasswordShown(!isPasswordShown)}
                >
                    {
                        isPasswordShown === true ? (

                            <Ionicons name='eye-off' size={24} color="gray" />
                        ) : (

                            <Ionicons name='eye' size={24} color="gray" />
                        )
                    }
                </TouchableOpacity>
            </View>
        </>
    )
}