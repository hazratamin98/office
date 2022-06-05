import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Search: "Search",
      SearchKeyword: "Search seo keyword",
      "My profile": "My profile",
      "Welcome back": "Welcome back",
      "We've missed you": "We've missed you",
      // "My profile sub desc": " Manage your personal, security and notification settings for your account."
    },
  },
  fr: {
    translation: {
      Search: "Rechercher…",
      SearchKeyword: "Search seo keyword",
      "My profile": "My profile Fr",
      "Welcome back": "Bon retour",
      "We've missed you": "Tu nous as manqué",
      // "My profile sub desc": " Manage your personal, security and notification settings for your account."
    },
  },
  de: {
    translation: {
      Search: "Suchen…",
      SearchKeyword: "Search seo keyword",
      "My profile": "My profile Fr",
      "Welcome back": "Willkommen zurück",
      "We've missed you": "Wir haben dich vermisst",
    },
  },
  nl: {
    translation: {
      Search: "Zoeken…",
      SearchKeyword: "Search seo keyword",
      "My profile": "My profile Fr",
      "Welcome back": "Welkom terug",
      "We've missed you": "We hebben je gemist",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
