import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { updateTaskStatus } from '../../features/tasks/tasksSlice';
import KanbanColumn from './KanbanColumn';
import styles from './KanbanBoard.module.css';
import { useTranslation } from 'react-i18next';

const KANBAN_COLUMNS = ['Planned', 'In Progress', 'Completed'];

function KanbanBoard({ tasks = [], projectId }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const tasksByStatus = useMemo(() => {
        const grouped = {};
        KANBAN_COLUMNS.forEach(status => {
            grouped[status] = tasks.filter(task => task.status === status);
        });
        return grouped;
    }, [tasks]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id;
        const targetColumnStatus = over.id;

        const task = tasks.find(t => String(t.id) === String(taskId));
        if (!task) {
            console.error("Dragged task not found in the current list:", taskId);
            return;
        }

        const currentStatus = task.status;
        if (targetColumnStatus && currentStatus !== targetColumnStatus && KANBAN_COLUMNS.includes(targetColumnStatus)) {
            dispatch(updateTaskStatus({ id: taskId, status: targetColumnStatus }));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className={styles.kanbanBoard}>
                {KANBAN_COLUMNS.map((status) => (
                    <KanbanColumn
                        key={status}
                        id={status}
                        title={t(`status_${status.toLowerCase().replace(' ', '_')}`)}
                        tasks={tasksByStatus[status] || []}
                    />
                ))}
            </div>
        </DndContext>
    );
}

export default KanbanBoard;
