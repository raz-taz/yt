import * as FileSystem from 'expo-file-system';
import { Log } from './log';


function randomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export async function addSong(id) {
    Log.notification("Downloading...");
    Log.info("Downloading...")

    FileSystem.getInfoAsync(FileSystem.documentDirectory + 'appDocs/files').then((res) => {
        if (res.exists) {
            console.log("file folder exists")
        } else {
            console.log("file folder does not exists, creating one...")
            FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'appDocs/files')
        }
    })
    FileSystem.getInfoAsync(FileSystem.documentDirectory + 'appDocs/info').then((res) => {
        if (res.exists) {
            console.log("info folder exists")
        } else {
            console.log("info folder does not exists, creating one...")
            FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'appDocs/info')
        }
    })
    const fileId = randomId()
    try {
        const fileUri = FileSystem.documentDirectory + `appDocs/info/${fileId}.json`;
        const remoteUrl = `http://127.0.0.1:3001/info/${id}`;
        const downloadResult = await FileSystem.downloadAsync(remoteUrl, fileUri);
        console.log('Downloaded file URI:', downloadResult.uri);

    } catch (error) {
        console.error('Error downloading file:', error);
    }
    try {
        const fileUri = FileSystem.documentDirectory + `appDocs/files/${fileId}.mp3`;
        const remoteUrl = `http://127.0.0.1:3001/download/${id}`;
        const downloadResult = await FileSystem.downloadAsync(remoteUrl, fileUri);
        console.log('Downloaded file URI:', downloadResult.uri);
        Log.notification("Downloaded!");
        Log.info("Downloaded!")
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

export function deleteFunc(id, setMenu) {
    let name = id.split('.')[0]
    FileSystem.deleteAsync(FileSystem.documentDirectory + `appDocs/files/${name}.mp3`).then((val) => { console.log(val) })
    // FileSystem.deleteAsync(FileSystem.documentDirectory + `appDocs/files/${"fsSES"}.mp4`).then((val) => { console.log(val) })
    FileSystem.deleteAsync(FileSystem.documentDirectory + `appDocs/info/${name}.json`).then((val) => { console.log(val) })

}

