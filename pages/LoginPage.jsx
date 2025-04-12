import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './LoginPage.module.css';
import { useTranslation } from 'react-i18next';

function LoginPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading, isAuthenticated } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!email) {
            setError(t('error_email_required'));
            return;
        }

        try {
            await login(email);
        } catch (err) {
            setError(err.message || t('error_login_failed'));
        }
    };

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h1 className={styles.title}>{t('login')}</h1>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.inputGroup}>
                    <label htmlFor="email">{t('email')}</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('email_placeholder')}
                        required
                        disabled={loading}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">{t('password')}</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? t('logging_in') : t('login')}
                </button>
                <div className={styles.testCredentials}>
                    <p>{t('test_users_prompt')}</p>
                    <ul>
                        <li>dimash.kudaibergen@example.kz (Auth: true)</li>
                        <li>gennady.golovkin@example.kz (Auth: true)</li>
                        <li>ilya.ilyin@example.kz (Auth: false)</li>
                    </ul>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
