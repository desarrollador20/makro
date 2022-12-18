import { screen, stylesGlobal, theme, storageResult } from "../utils";

export const managerScreen = async (navigation, id, module, idCheckList) => {

    if (module == 'checklist') {
        return navigation.navigate(
            screen.category.tab, {
            screen: screen.category.category,
            params: { id, idCheckList }
        });
    }
    if (module == 'category') {
        const DatosStorage = await storageResult.getDataFormat('@Session');
        if (typeof DatosStorage !== undefined && DatosStorage['dataQuestions']['questions_' + id] && DatosStorage['dataQuestions']['questions_' + id]['data']['orden_1'] !== undefined) {
            return navigation.navigate(
                screen.question.tab, {
                screen: screen.question.question,
                params: { id, numberQuestion: 1, idCheckList }
            });

        }
    }


}