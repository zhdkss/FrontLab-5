import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './SettingsPage.module.css';
import { useTranslation } from 'react-i18next';

function SettingsPage() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const { user } = useAuth();

    return (
        <div className={styles.settingsContainer}>
            <h1 className={styles.title}>{t('settings')}</h1>

            <div className={styles.settingSection}>
                <h2 className={styles.sectionTitle}>{t('profile_settings')}</h2>
                {user ? (
                    <div className={styles.profileInfo}>
                        <p><strong>{t('name')}:</strong> {user.name}</p>
                        <p><strong>{t('role')}:</strong> {user.role}</p>
                        <p><strong>{t('email')}:</strong> {user.email}</p>
                    </div>
                ) : (
                    <p>{t('loading_user_info')}...</p>
                )}
            </div>

            <div className={styles.settingSection}>
                <h2 className={styles.sectionTitle}>{t('appearance_settings')}</h2>

                <div className={styles.settingItem}>
                    <span>{t('theme')}: {theme === 'light' ? t('light') : t('dark')}</span>
                    <button onClick={toggleTheme} className={styles.toggleButton}>
                        {theme === 'light' ? t('switch_to_dark') : t('switch_to_light')}
                    </button>
                </div>

                <div className={styles.settingItem}>
                    <span>{t('language')}: {language === 'en' ? 'English' : 'Русский'}</span>
                    <div className={styles.languageButtons}>
                        <button
                            onClick={() => changeLanguage('en')}
                            disabled={language === 'en'}
                            className={language === 'en' ? styles.activeLang : ''}
                        >
                            English
                        </button>
                        <button
                            onClick={() => changeLanguage('ru')}
                            disabled={language === 'ru'}
                            className={language === 'ru' ? styles.activeLang : ''}
                        >
                            Русский
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
