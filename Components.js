import { Button, StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';
import styles from './styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';




function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60)
    let minutes = Math.floor((duration / (1000 * 60)) % 60)
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

export default function BottomBar({ nav, at }) {

    function goAdd() {
        nav.navigate('Add')
    }
    function goHome() {
        nav.navigate('Home')
    }
    return (
        <View style={styles.bottomDiv}>
            <Pressable style={styles.btnBox} onPress={() => goHome()}>
                <Ionicons name={at === "Home" ? "home" : "home-outline"} size={40} color="white" />
            </Pressable>
            <Pressable style={styles.btnBox} onPress={() => goAdd()}>
                <Ionicons name={at === "Add" ? "add-circle" : "add-circle-outline"} size={40} color="white" />
            </Pressable>
        </View>
    )
}

export function PlayingSpace({ pos, onPausePressed, playing, soundInfo = { duration: 0, position: 0, name: '', author: '', img: null }, onValueChanged, img }) {
    const duration = soundInfo.duration;
    const name = soundInfo.name
    const author = soundInfo.author
    return (
        <View style={styles.playingSpace}>
            <View style={styles.card}>
                <View style={styles.top}>
                    <Image style={styles.pfp} source={{ uri: soundInfo.img }} />
                    <View style={styles.texts}>
                        <Text style={styles.title1}>{name}</Text>
                        <Text style={styles.title2}>{author}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 30 }}>
                    <View style={styles.controls}>
                        <Ionicons name='arrow-back-circle' size={30} color="white" />
                        <Pressable onPress={() => onPausePressed()}><Ionicons name={`${playing ? 'pause' : 'play'}-circle`} size={30} color="white" /></Pressable>
                        <Ionicons name='arrow-forward-circle' size={30} color="white" />
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 22, }}>
                    <Slider
                        style={styles.time}
                        minimumValue={0}
                        value={pos}
                        onValueChange={(v) => onValueChanged(v)}
                        maximumValue={duration}
                        trackStyle={{ height: 10, borderRadius: 5 }}
                        thumbStyle={{ width: 20, height: 20, borderRadius: 10 }}
                        minimumTrackTintColor="#1db954"
                        maximumTrackTintColor="#5e5e5e"

                    />
                </View>
                <View style={styles.timeDiv}>
                    <Text style={styles.timetext}>{msToTime(pos)}</Text>
                    <Text style={styles.timetext}>{msToTime(duration)}</Text>
                </View>
            </View>
        </View>
    )
}

export function TopBar({ at }) {
    return (
        <View style={styles.topBar}>
            <Ionicons name='person-circle-outline' size={50} color="white" style={{ marginLeft: 20, marginTop: 20 }} />
            <Text style={{ color: 'white', fontSize: 30, marginLeft: 20, marginTop: 20 }}>{at}</Text>
        </View>
    )
}

export function SongBox({ songName, authorName, ytId, img, onHold, id, onClick, selected }) {
    return (
        <Pressable style={[styles.songBox, selected ? styles.songBoxActive : {}]} onLongPress={() => onHold(id, ytId)} onPress={() => onClick()}>
            <Image style={{ height: 100, width: 100, borderRadius: 10 }} source={{ uri: img }} />
            <View>
                <Text style={{ color: "#fff", fontSize: 15, marginLeft: 20, width: "50%", fontFamily: 'monospace' }} numberOfLines={9}>{songName}</Text>
                <Text style={{ color: "#fff", fontSize: 10, marginLeft: 20 }}>By {authorName}</Text>
            </View>
        </Pressable>
    )
}

export function EnterButton({ onPress }) {
    return (
        <Pressable style={styles.enterButton} onPress={() => onPress()}>
            <Text style={{ color: '#fff', fontSize: 20 }}><Ionicons name='download' size={40} color="white" /></Text>
        </Pressable>
    )
}

export function SongMenu({ show, onClose, deleteFunc, ytFunc, info, animVal }) {
    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const animStyle = useAnimatedStyle(() => {
        return {
            bottom: withTiming(animVal.value, config)
        };
    });
    return (
        <Pressable style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 90, display: show.show ? 'flex' : 'none' }} onPress={() => onClose()}>
            <Animated.View style={[styles.songMenu, animStyle]}>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20, borderBottomColor: '#3B3B3B', borderBottomWidth: 1, paddingBottom: 15 }}>
                    <Image style={{ marginLeft: 10, marginRight: 10, height: 50, width: 50, borderRadius: 5, backgroundColor: '#7B7B7B' }} source={{ uri: info.img }} />
                    <View style={{ marginLeft: 30, }}>
                        <Text style={{ color: '#fff', fontSize: 20, width: '80%' }} numberOfLines={9}>{info.name}</Text>
                        <Text style={{ color: '#7B7B7B', fontSize: 15 }} numberOfLines={9}>{info.author}</Text>
                    </View>
                </View>

                <Pressable style={[styles.deleteBtn, { marginTop: 10 }]} onPress={() => deleteFunc()}>
                    <Ionicons name='trash' size={30} color={'#656565'} />
                    <Text style={{ fontSize: 20, color: '#fff' }}>Delete</Text>
                </Pressable>
                <Pressable style={[styles.deleteBtn, { marginTop: 10 }]} onPress={() => ytFunc()}>
                    <Ionicons name='logo-youtube' size={30} color={'#656565'} />
                    <Text style={{ fontSize: 20, color: '#fff' }}> Show In Youtube</Text>
                </Pressable>
            </Animated.View>
        </Pressable>

    )
}
