import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import normalize from 'react-native-normalize';
import { theme } from "../../../utils";
import { styles } from './PreviousInspection.style';

export function PreviousInspection(props) {

    const { idQuestion } = props;
    const [getHistory, setGetHistory] = useState(false);

    const RowColumnHistory = (props) => {
        const { title, description } = props;
        return (
            <View style={styles.rowColumn}>
                <Text style={styles.lblQuestionHistory}>{title}</Text>
                <Text style={styles.lblResponseHistory}>{description}</Text>
            </View>
        )
    }

    const CheckboxHistory = (props) => {
        const { color, icon, title } = props;
        return (
            <View style={{ ...styles.containerTitleCheckbox, borderColor: color }}>
                <Text style={{ ...styles.textActiveConforme, color: color }}>{title}</Text>
                {(icon != '') && (
                    <View style={styles.containerIconCheckbox}>
                        <Icon
                            type="ionicon"
                            name={icon}
                            iconStyle={styles.iconStyle}
                            color={color}
                            size={normalize(25)}
                        />
                    </View>
                )}
            </View>
        )
    }

    const GetHistory = (idQuestion) => {
        setGetHistory(!getHistory);
    }

    return (
        <>
            <Pressable onPress={() => GetHistory(idQuestion)} style={styles.container}>
                <Icon type="foundation" name="clock" style={styles.iconTitle} color={theme.GlobalColorsApp.colorTextPreviousInspection} size={normalize(30)} />
                <Text style={styles.lblSubTitleQuestion}>Ver inspeção anterior</Text>
            </Pressable>

            {getHistory && (
                <View style={styles.containerHistorial}>
                    <View style={styles.row}>
                        <Text style={styles.lblQuestionHistory}>Data da Inspeção Prévia:</Text>
                        <Text style={styles.lblResponseHistory}>XX/XX/XXXX</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={{ ...styles.lblQuestionHistory, flex: 3 }}>Resultado:</Text>
                        <CheckboxHistory
                            color={theme.GlobalColorsApp.colorOptionActiveDisagreed}
                            icon={'thumbs-down-outline'}
                            title={'Não Conforme'}
                        />
                    </View>

                    <RowColumnHistory
                        title={'Observaçãoes'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elit enim, lobortis.'}
                    />
                    <RowColumnHistory
                        title={'Medidas propostas'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elit enim, lobortis.'}
                    />
                    <RowColumnHistory
                        title={'Setor'}
                        description={'Nome do Setor.'}
                    />
                    <RowColumnHistory
                        title={'Probabilidade de Acidente'}
                        description={'1 (Mutio Baixo)'}
                    />
                    <RowColumnHistory
                        title={'Gravidade que poderia ocorrer'}
                        description={'Fatalidade, invalidez, amputação'}
                    />
                </View>
            )}

        </>
    )
}