// src/contexts/AuthContext.jsx

import React, {createContext, useContext, useMemo, useState} from 'react';
// Импортируем моковых пользователей (убедись, что путь верный)
import usersData from '../assets/data/users.json';

// Ключ, под которым будем хранить данные в localStorage
const AUTH_STORAGE_KEY = 'react_project_auth_user';

// Функция для получения начального состояния из localStorage
const getInitialAuthState = () => {
    try {
        // Пытаемся получить данные из localStorage
        const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedData) {
            // Если данные есть, парсим их из JSON
            const authData = JSON.parse(storedData);
            // Проверяем, что данные валидны (есть user и isAuthenticated === true)
            if (authData && authData.user && authData.isAuthenticated === true) {
                console.log('Restoring auth state from localStorage:', authData.user.email);
                return { user: authData.user, isAuthenticated: true };
            }
        }
    } catch (error) {
        // Если произошла ошибка при чтении или парсинге, очищаем localStorage
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    // Если в localStorage ничего нет или данные невалидны, возвращаем состояние по умолчанию
    console.log('No valid auth state found in localStorage.');
    return { user: null, isAuthenticated: false };
};

// Создаем контекст
const AuthContext = createContext(null);

// Компонент-провайдер
export function AuthProvider({ children }) {
    // Инициализируем состояние с помощью функции getInitialAuthState
    const initialState = getInitialAuthState();
    const [user, setUser] = useState(initialState.user);
    const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
    // loading используется только для процесса логина, не для начальной загрузки
    const [loading, setLoading] = useState(false);


    // Функция логина
    const login = async (email) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            // Имитация запроса к API
            setTimeout(() => {
                const foundUser = usersData.find(u => u.email === email);
                // Проверка пользователя и флага 'authenticated' в users.json
                if (foundUser && foundUser.authenticated) {
                    const authData = { user: foundUser, isAuthenticated: true };
                    // Обновляем состояние React
                    setUser(foundUser);
                    setIsAuthenticated(true);
                    try {
                        // --- СОХРАНЯЕМ В LOCALSTORAGE ---
                        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
                        // --- КОНЕЦ СОХРАНЕНИЯ ---
                        console.log('Login successful:', foundUser.email);
                    } catch (error) {
                        console.error("Failed to save auth data to localStorage", error);
                    }
                    setLoading(false);
                    resolve(foundUser);
                } else {
                    // Неудачный вход
                    setLoading(false);
                    if (foundUser && !foundUser.authenticated) {
                        console.log('Login failed: User not authorized', foundUser.email);
                        reject(new Error('User is not authorized to log in.'));
                    } else {
                        console.log('Login failed: Invalid credentials');
                        reject(new Error('Invalid credentials.'));
                    }
                }
            }, 500); // Задержка 0.5 сек
        });
    };

    // Функция выхода
    const logout = () => {
        // Обновляем состояние React
        setUser(null);
        setIsAuthenticated(false);
        try {
            // --- УДАЛЯЕМ ИЗ LOCALSTORAGE ---
            localStorage.removeItem(AUTH_STORAGE_KEY);
            // --- КОНЕЦ УДАЛЕНИЯ ---
            console.log('User logged out');
        } catch (error) {
            console.error("Failed to remove auth data from localStorage", error);
        }
    };

    // Мемоизируем значение контекста
    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            loading, // Состояние загрузки именно процесса логина
            login,
            logout,
        }),
        [user, isAuthenticated, loading]
    );

    // Передаем значение через Provider
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Пользовательский хук для удобного доступа к контексту (без изменений)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};