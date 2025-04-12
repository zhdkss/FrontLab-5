import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../features/projects/projectsSlice';
import styles from './DashboardPage.module.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function DashboardPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState('all');

    const {
        list: projects,
        loading,
        error
    } = useSelector((state) => state.projects);

    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchProjects());
        }
    }, [loading, dispatch]);

    const filteredProjects = useMemo(() => {
        if (statusFilter === 'all') return projects;
        return projects.filter((proj) => proj.status === statusFilter);
    }, [projects, statusFilter]);

    let content;

    if (loading === 'pending') {
        content = <div className={styles.loading}>{t('loading')}...</div>;
    } else if (loading === 'failed') {
        content = <div className={styles.error}>{t('error_loading_projects')}: {error}</div>;
    } else if (loading === 'succeeded') {
        content = (
            <>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="all">Все</option>
                    <option value="active">Активные</option>
                    <option value="done">Завершённые</option>
                </select>

                <div className={styles.projectList}>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <Link to={`/project/${project.id}`} key={project.id} className={styles.projectItem}>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <span>{t('status')}: {project.status}</span>
                            </Link>
                        ))
                    ) : (
                        <p>Нет проектов по выбранному фильтру.</p>
                    )}
                </div>
            </>
        );
    } else {
        content = <p>{t('please_wait')}</p>;
    }

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.title}>
                {t('dashboard')} - {t('projects_list')}
            </h1>
            {content}
        </div>
    );
}

export default DashboardPage;
