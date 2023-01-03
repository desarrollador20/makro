import i18next from 'i18next';
import espanol from "./espanol.json";
import portugues from "./portugues.json";
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: "pt",
  resources: {
    pt: portugues,
    es: espanol,

  },
  react: {
    useSuspense: false, 
  },
});

export default i18next;