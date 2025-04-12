import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './TaskCard.module.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
    const { t } = useTranslation();
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: String(task.id),
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.8 : 1,
        boxShadow: isDragging ? '0 6px 12px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 'auto',
    };

    return (
        <Link to={`/project/${task.id}`} className={styles.linkWrapper}>
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                style={style}
                className={styles.taskCard}
            >
                <h4>{task.title}</h4>
                <p>{task.description}</p>
            </div>
        </Link>
    );
}

export default TaskCard;
