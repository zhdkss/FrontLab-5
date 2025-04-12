import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTasks, addTask } from '../features/tasks/tasksSlice';
import { fetchProjects } from '../features/projects/projectsSlice';
import TaskForm from '../components/Project/TaskForm';
import KanbanBoard from '../components/Project/KanbanBoard';

function ProjectDetailsPage() {
    const { id } = useParams();
    const projectId = Number(id);
    const dispatch = useDispatch();

    const { list: projects, loading } = useSelector((state) => state.projects);
    const tasks = useSelector(selectAllTasks);

    const project = projects.find((proj) => Number(proj.id) === projectId);
    const projectTasks = tasks.filter((task) => task.projectId === projectId);

    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchProjects());
        }
    }, [loading, dispatch]);

    if (loading === 'pending') {
        return <div style={{ padding: '2rem' }}>Загрузка проекта...</div>;
    }

    if (!project) {
        return (
            <div style={{ padding: '2rem' }}>
                <h1>Проект не найден</h1>
                <p>ID: {id}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{project.name}</h1>
            <p><strong>Описание:</strong> {project.description}</p>
            <p><strong>Статус:</strong> {project.status}</p>
            <p><strong>ID проекта:</strong> {project.id}</p>

            <hr style={{ margin: '2rem 0' }} />

            <TaskForm
                onSubmit={(task) => {
                    dispatch(addTask({
                        projectId,
                        title: task.title,
                        status: task.status,
                    }));
                }}
            />

            <h2>Задачи проекта</h2>
            <KanbanBoard projectId={String(projectId)} tasks={projectTasks} />
        </div>
    );
}

export default ProjectDetailsPage;
