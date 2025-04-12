import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';
import SettingsPage from '../pages/SettingsPage';
import ErrorPage from '../pages/ErrorPage';
import MainLayout from '../components/Layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/project/:id" element={<ProjectDetailsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="/404" element={<ErrorPage code={404} messageKey="error_404_message" />} />
            <Route path="/403" element={<ErrorPage code={403} messageKey="error_403_message" />} />
            <Route path="/500" element={<ErrorPage code={500} messageKey="error_500_message" />} />
            <Route path="*" element={<ErrorPage code={404} messageKey="error_404_message" />} />
        </Routes>
    );
}

export default AppRouter;
