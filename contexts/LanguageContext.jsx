import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../lib/i18n/config';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => localStorage.getItem('app-language') || 'en');

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('app-language', language);
    }, [language]);

    const changeLanguage = (lang) => setLanguage(lang);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
