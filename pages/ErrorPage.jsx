import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ErrorPage.module.css';

function ErrorPage({ code = 'Oops', messageKey = 'error_generic_message' }) {
    const { t } = useTranslation();
    const message = t(messageKey);

    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorCode}>{code}</div>
            <h1 className={styles.errorMessage}>{message}</h1>
            <p className={styles.errorDescription}>
                {code === 404 && t('error_404_desc')}
                {code === 403 && t('error_403_desc')}
                {code === 500 && t('error_500_desc')}
                {![404, 403, 500].includes(code) && t('error_generic_desc')}
            </p>
            <Link to="/dashboard" className={styles.homeLink}>
                {t('go_to_dashboard')}
            </Link>
        </div>
    );
}

export default ErrorPage;
