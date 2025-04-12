import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './MainLayout.module.css';

function MainLayout() {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
