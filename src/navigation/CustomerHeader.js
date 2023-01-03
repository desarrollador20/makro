import React, { useEffect } from 'react';

import { StyleSheet, View } from "react-native";
import { Text, Image, Avatar } from 'react-native-elements';
import normalize from "react-native-normalize";
import Svg, { G, Path } from 'react-native-svg';
import { Appbar } from 'react-native-paper';
import { styles } from "./CustomHeader.style";
import { useTranslation } from "react-i18next";


const CustomerHeader = () => {

    const { t, i18n } = useTranslation();
    useEffect(() => {
     
      loaderLanguage();
      
  
    }, []);
  const loaderLanguage = async () => {
    const DataLenguage = await storageResult.getDataFormat('@SessionLanguage');
    i18n.changeLanguage(DataLenguage);

  }

 

  const ContentHeader = () => (
    <>
      <Appbar.Content
        title={
          <View style={styles.containerTitle}>
            <Avatar
              rounded
              icon={{ name: 'user', type: 'font-awesome' }}
              containerStyle={{ ...styles.containerAvatar, }}
              size={normalize(27)}
            />
            <Text style={styles.textContainerName}>{t("Global.hello")} <Text style={styles.textName}>Jaqueline</Text></Text>
          </View>
        }
        style={styles.HeaderContent}
      />

      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'flex-end', justifyContent: 'flex-end', top: 105, right: -60 },
        ]}
      >
        <Svg height="100" width="200" viewBox="0 0 500 450" >
          <G transform="translate(0.000000,219.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <Path fill='red' d='M1963 1546 l-28 -24 -3 -409 c-2 -394 -2 -409 18 -441 27 -43 60 -58
              107 -46 54 14 74 47 82 144 7 81 8 84 46 117 21 18 43 33 49 33 6 0 23 -19 38
              -42 54 -86 149 -213 171 -230 44 -35 106 -19 132 33 21 40 8 80 -57 173 -106
              153 -148 217 -148 223 0 4 43 50 95 104 77 78 95 102 95 126 0 30 -28 64 -63
              76 -34 12 -74 -16 -214 -156 l-143 -141 0 179 c-1 198 -7 245 -41 281 -31 33
              -97 33 -136 0z' />

            <Path fill='red' d='M1402 1399 c-88 -28 -152 -91 -152 -149 0 -53 12 -74 49 -90 43 -18
              74 -6 136 50 58 52 100 67 157 55 54 -12 68 -23 68 -55 0 -42 -29 -66 -97 -79
              -32 -7 -102 -25 -155 -41 -81 -25 -104 -37 -141 -74 -37 -35 -47 -54 -57 -99
              -20 -96 18 -191 98 -244 97 -65 192 -68 328 -12 28 11 34 10 59 -9 40 -32 108
              -30 141 3 l26 26 -4 292 c-3 258 -5 296 -21 325 -23 42 -88 88 -150 107 -72
              21 -207 18 -285 -6z m263 -466 c-14 -120 -61 -161 -169 -149 -87 10 -124 78
              -75 139 24 32 127 62 223 66 l28 1 -7 -57z' />

            <Path fill='red' d='M3350 1401 c-141 -48 -228 -134 -269 -266 -39 -124 -18 -252 58 -354
              44 -59 81 -89 156 -129 44 -24 61 -27 150 -27 90 0 106 3 160 29 192 95 279
              296 215 496 -32 100 -103 178 -210 231 -82 41 -177 49 -260 20z m176 -180
              c102 -62 132 -213 66 -334 -65 -120 -199 -122 -279 -4 -56 83 -56 191 0 274
              54 79 144 106 213 64z' />

            <Path fill='red' d='M368 1396 c-20 -7 -51 -22 -68 -33 -31 -20 -31 -20 -71 0 -35 17 -46
              18 -80 8 -21 -6 -43 -20 -49 -31 -6 -11 -10 -141 -10 -338 l0 -320 29 -31 c33
              -35 73 -41 122 -15 53 27 59 59 59 307 0 260 -1 257 95 265 50 4 57 2 85 -26
              l30 -30 0 -224 c0 -204 2 -226 20 -255 21 -36 48 -46 105 -41 28 2 44 11 59
              31 20 26 21 45 26 267 6 275 4 270 92 278 47 4 58 1 86 -23 l32 -27 0 -216 c0
              -190 3 -222 19 -258 33 -73 118 -83 165 -21 20 26 21 43 24 245 2 146 -1 236
              -9 276 -40 192 -241 282 -408 183 l-56 -33 -52 32 c-76 45 -170 57 -245 30z' />

            <Path fill='red' d='M2925 1398 c-11 -6 -30 -20 -42 -31 l-22 -20 -31 27 c-59 49 -140 27
              -160 -43 -14 -49 -13 -546 1 -612 17 -80 68 -115 126 -87 57 27 67 71 73 298
              3 139 9 212 18 227 15 27 37 40 101 59 101 30 131 99 70 162 -25 26 -39 32
              -73 32 -22 0 -50 -6 -61 -12z' />
          </G>
        </Svg>
      </View>

    </>
  );


  return (
    <Appbar.Header style={styles.Header}  >
      <ContentHeader />
    </Appbar.Header>
  );


};

export default CustomerHeader;
