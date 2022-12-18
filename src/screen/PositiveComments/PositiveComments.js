import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import CustomerHeader from '../../navigation/CustomerHeader';
import { storageResult, stylesGlobal } from '../../utils';
import { styles } from './PositiveComments.style';
import { ButtonsQuestion } from '../../components/question';
import { Footer, HeaderPercentage } from '../../components';

export function PositiveComments(props) {
    const { route } = props;
    const { control, handleSubmit, setValue } = useForm({ mode: 'onBlur' });

    const validateOnBlur = (idCheckList, value, name, idCategory, idQuestion) => {
        storageResult.setItemValue(idCheckList, idCategory, idQuestion, name, value?.trim());
    }

    useEffect(() => {
        validateDataInit();
    }, []);


    const validateDataInit = async () => {
        const DatosStorage = await storageResult.getDataFormat('@SessionResponse');
        var keyPositiveComments = `${route.params.params.idCheckList}|${route.params.params.id}|0|positiveComments`;
        setValue('positiveComments', DatosStorage[keyPositiveComments]);

    }

    return (
        <SafeAreaView style={stylesGlobal.contentGlobal}>
            <CustomerHeader />
            <ScrollView>
                <HeaderPercentage
                    idCheckList={route.params.params.idCheckList}
                    idCategory={route.params.params.id}
                    numberQuestion={route.params.params.numberQuestion}
                    insideQuestion={'1'}
                />
                <View style={styles.container}>
                    <Text style={styles.lblMain}>Comentários positivos ou boas práticas <Text style={styles.lblSecondary}>identificadas durante a inspeção.</Text></Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <View style={styles.containerValidationError}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    onBlur={() => validateOnBlur(route.params.params.idCheckList, value, 'positiveComments', route.params.params.id, '0')}
                                    onChangeText={onChange}
                                    value={value}
                                    style={styles.textArea}
                                />
                                {error && <Text style={styles.lblValidationError}>{error.message}</Text>}
                            </View>

                        )}
                        name="positiveComments"
                    />
                </View>
                <ButtonsQuestion
                    idCategory={route.params.params.id}
                    numberQuestion={route.params.params.numberQuestion}
                    screenPositiveComments={1}
                    idCheckList={route.params.params.idCheckList}
                />
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}