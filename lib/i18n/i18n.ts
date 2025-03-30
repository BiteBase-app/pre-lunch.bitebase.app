import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslation from "./locales/en/translation.json"
import thTranslation from "./locales/th/translation.json"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    th: {
      translation: thTranslation,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

export default i18n

