import React from 'react';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <AppRouter />
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
