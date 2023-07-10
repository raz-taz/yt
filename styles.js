import { StyleSheet } from 'react-native';

const colorBottom = "#171717"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    bottomDiv: {
        backgroundColor: colorBottom,
        width: "100%",
        height: "10%",
        position: "absolute",
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    playingSpace: {
        position: "absolute",
        bottom: "10.5%",
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    card: {
        position: 'relative',
        width: "100%",
        height: 150,
        backgroundColor: colorBottom,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
    },
    top: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        gap: 10,
    },
    pfp: {
        position: 'relative',
        top: 5,
        left: 5,
        height: 40,
        width: 40,
        backgroundColor: '#d2d2d2',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    texts: {
        position: 'absolute',
        flexDirection: 'column',
        top: 0,
        left: "20%"
    },
    title1: {
        color: 'white',
        fontSize: 20,
        width: '80%',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    title2: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    time: {
        width: '90%',
        // backgroundColor: '#5e5e5e',
        height: 6,

    },
    controls: {
        color: 'white',
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-between',


    },
    timetext: {
        color: 'white',
        fontSize: 9,
    },
    timeDiv: {
        position: 'absolute',
        bottom: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        left: 10
    },
    time_now: {
        bottom: 11,
        left: 10,
    },
    time_full: {
        bottom: 11,
        right: 10,
    },
    topBar: {
        height: "13%",
        width: '100%',
        backgroundColor: colorBottom,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10
    },
    songBox: {
        width: '95%',
        height: 100,
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',

    },
    songBoxActive:{
        // borderColor: '#fff',
        // borderWidth: 1,
        backgroundColor: '#111',
        borderRadius: 15,
    },
    scrollView: {
        height: '105%',
        width: '100%',
        alignSelf: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputId: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#3D3D3D',
        width: '80%',
        height: 80,
        color: '#fff',
        padding: 10,
        fontSize: 28
    },
    addDiv: {
        width: '100%',
        height: "83%",
        marginTop: "13%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    enterButton: {
        backgroundColor: '#7D0000',
        height: 80,
        width: 50,
        borderRadius: 12,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        height: 300,
        width: 300
    },
    songMenu: {
        height: 350,
        width: "100%",
        backgroundColor: '#262626',
        position: 'absolute',
        zIndex: 100,
        alignSelf: 'center',
        bottom: -350,
        borderRadius: 15,
        alignItems: 'center',
    },
    deleteBtn:{
        height: 40,
        width: '100%',
        borderRadius: 12,
        marginLeft: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default styles;
