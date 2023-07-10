import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, ScrollView, RefreshControl } from 'react-native';
import BottomBar, { EnterButton, PlayingSpace, SongBox, SongMenu, TopBar } from './Components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles'
import * as FileSystem from 'expo-file-system';
// import { getFiles } from './filesystem';
// import { Log } from './log';
import * as Linking from 'expo-linking';
import { Audio } from 'expo-av';
import Animated, {
  useSharedValue,
} from 'react-native-reanimated';

import { addSong, deleteFunc } from './functions';

const APPDOC_FILES = FileSystem.documentDirectory + 'appDocs/files';
const APPDOC_INFO = FileSystem.documentDirectory + 'appDocs/info';

function HomeScreen({ navigation }) {
  const [songs, setSongs] = useState([])
  const [menu, setMenu] = useState({ id: '', show: false, ytId: '', title: '', author: '', img: null })
  const [refreshing, setRefreshing] = useState(false);
  const [isplaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [soundInfo, setSoundInfo] = useState({ duration: 0, position: 0, name: '', author: '', id: '', img: null })
  const [pos, setPos] = useState(0)
  const value = useSharedValue(10);

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function playSound() {
    if (sound === null) return
    if (isplaying) {
      console.log('Pausing Sound');
      await sound.pauseAsync();

      setIsPlaying(false);
    } else {
      console.log('Loading Sound');
      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true)
    }
  }

  const refresh = async () => {
    console.log('refreshing...');
    const newSongs = [];
    try {

      let res = await FileSystem.getInfoAsync(
        APPDOC_INFO
      );

      if (res.exists) {
        const path = APPDOC_INFO;
        const infoFiles = await FileSystem.readDirectoryAsync(path);
        let fileUri;
        for (let infoFile of infoFiles) {
          fileUri = `${APPDOC_INFO}/${infoFile}`;

          try {
            const fileContent = await FileSystem.readAsStringAsync(fileUri);
            const theFileContent = JSON.parse(fileContent);

            newSongs.push({
              id: infoFile,
              title: theFileContent.title,
              authorName: theFileContent.authorName,
              img: theFileContent.image,
              ytId: theFileContent.id,
            });
          } catch (error) {
            console.error(`Failed to process ${fileUri}`, error.message);
          }
        }
      } else {
        console.log('file folder does not exists, creating one...');
        const path = APPDOC_INFO;
        try {
          await FileSystem.makeDirectoryAsync(path);
        } catch (error) {
          console.error(`Failed to create dir (${path})`);
        }
      }
    } finally {
      setSongs(newSongs);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  function openMenu(id, ytId, t, a, img) {
    setMenu({ id: id, show: true, ytId: ytId, title: t, author: a, img: img })
    value.value = 0;
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  async function selectMusic(id) {
    setSoundInfo({ duration: 0, position: 0, name: '', author: '', id: '' })
    setIsPlaying(false);
    console.log(id.split('.')[0])
    //setSelectedSong(id.split('.')[0])
    songs.map((v, _) => {
      if (v.id === id) {
        setSoundInfo((e) => { let s = e; s.name = v.title; s.author = v.authorName; s.id = v.id; s.img = v.img; return s })
      }
    })

    const { sound } = await Audio.Sound.createAsync({ uri: FileSystem.documentDirectory + `/appDocs/files/${id.split('.')[0]}.mp3` }, {}, (status) => { setSoundInfo((e) => { let s = e; s.duration = status.durationMillis; s.position = status.positionMillis; return s }); setPos(status.positionMillis) });
    setSound(sound);
  }
  function onChangedDur(v) {
    sound.setPositionAsync(v)
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <TopBar at={"Home"} />
      <SongMenu animVal={value} show={menu} info={{ name: menu.title, author: menu.author, img: menu.img }} ytFunc={() => Linking.openURL(`https://www.youtube.com/watch?v=${menu.ytId}`)} onClose={() => { value.value = -350; setTimeout(() => { setMenu({ id: '', show: false, ytId: '' }); }, 500) }} deleteFunc={() => { deleteFunc(menu.id); refresh(); setMenu({ id: '', show: false }) }} />
      <View style={{ height: '65%', width: '100%', marginTop: "30%", }}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {
            songs.map((val, i) => {
              return (<SongBox selected={val.id === soundInfo.id ? true : false} key={i} img={val.img} songName={val.title} authorName={val.authorName} onHold={() => openMenu(val.id, val.ytId, val.title, val.author, val.img)} onClick={() => selectMusic(val.id)} />)
            })
          }
          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
      <PlayingSpace pos={pos} onValueChanged={(v) => onChangedDur(v)} soundInfo={soundInfo} onPausePressed={() => playSound()} playing={isplaying} />
      <BottomBar nav={navigation} at="Home" />
    </View>
  )
}



function AddScreen({ navigation }) {
  const [id, setId] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <TopBar at={"Add songs"} />
      <View style={styles.addDiv}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput onChangeText={setId} value={id} placeholderTextColor={'grey'} placeholder='Enter the YouTube Id...' style={styles.inputId} />
          <EnterButton onPress={() => addSong(id)} />
        </View>
      </View>
      <BottomBar nav={navigation} at="Add" />
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


