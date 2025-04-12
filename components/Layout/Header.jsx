import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

function Header() {
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className={styles.logo}>
                    {t('app_title')}
                </Link>

                {isAuthenticated && (
                    <div className={styles.navAndUser}>
                        <nav className={styles.navigation}>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                {t('dashboard')}
                            </NavLink>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                                }
                            >
                                {t('settings')}
                            </NavLink>
                        </nav>

                        <div className={styles.userActions}>
                            <button onClick={toggleTheme} className={styles.themeToggle} title={t('toggle_theme')}>
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>

                            {user && <span className={styles.userName}>{t('welcome_user', { name: user.name })}</span>}
                            <button onClick={logout} className={styles.logoutButton}>
                                {t('logout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
