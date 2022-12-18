import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { storageResult } from '../../../utils';
import { styles } from './Footer.style';

export function Footer() {

    const [language, setLanguage] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
        setLanguage(DataLenguage);
    }

    if (!language) {
        return (<View />);
    }

    return (
        <View style={styles.containerFooter}>
            <View style={styles.containerExit}>
                <Text style={styles.lblExit}>{language == 'pt' ? 'Saída' : 'Salida'}</Text>
            </View>
            <View style={styles.containerLogo}>
                <Image
                    source={require("../../../../assets/img/logoPulse.png")}
                    style={styles.imageLogo}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
        </View>
    )
}