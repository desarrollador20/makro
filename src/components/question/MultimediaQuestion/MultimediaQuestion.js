import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import YoutubePlayer from 'react-native-youtube-iframe';
import normalize from 'react-native-normalize';
import WebView from 'react-native-webview';
import { styles } from './MultimediaQuestion.style';


export function MultimediaQuestion(props) {
    const { multimedia, typeMultimedia } = props;

    if (typeMultimedia.toLowerCase() == 'img') {
        return (
            <View style={{ width: '100%', paddingHorizontal: Platform.OS === 'ios' ? normalize(12) : normalize(15) }}>
                <Image
                    source={{ uri: multimedia }}
                    style={{ height: normalize(150, 'height'), width: '100%', resizeMode: "stretch", }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
        )
    }
    if (typeMultimedia.toLowerCase() == 'video') {

        if (multimedia.includes('www.youtube.com')) {
            let idVideo = multimedia.substring(32, 43);
            return (
                <View style={{ paddingHorizontal: Platform.OS === 'ios' ? normalize(10) : normalize(15) }}>
                    <YoutubePlayer
                        height={normalize(200)}
                        videoId={idVideo}
                    />
                </View>
            )
        }
        return (

            <ScrollView >
                <WebView
                    // customUserAgent="Mozilla/5.0 (iPad; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)"
                    nestedScrollEnabled
                    style={{ marginBottom: normalize(10), width: '100%', height: normalize(180), }}
                    source={{ uri: multimedia }}
                />
            </ScrollView>
        )
    }
}
