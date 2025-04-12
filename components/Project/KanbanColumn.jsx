import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import styles from './KanbanColumn.module.css';

function KanbanColumn({ id, title, tasks = [] }) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    const style = {
        backgroundColor: isOver ? '#eaf9ff' : undefined,
        border: isOver ? '2px dashed #3498db' : '2px dashed transparent'
    };

    return (
        <div ref={setNodeRef} className={styles.kanbanColumn} style={style}>
            <h3 className={styles.columnTitle}>{title} ({tasks.length})</h3>
            <div className={styles.taskList}>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))
                ) : (
                    <div className={styles.emptyColumn}></div>
                )}
            </div>
        </div>
    );
}

export default KanbanColumn;
