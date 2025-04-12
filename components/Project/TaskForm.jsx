import React, { useReducer } from 'react';

const initialState = {
    title: '',
    description: '',
    status: 'Planned',
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_STATUS':
            return { ...state, status: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

function TaskForm({ onSubmit }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(state);
        dispatch({ type: 'RESET' });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <h3>Создать задачу</h3>
            <input
                type="text"
                placeholder="Заголовок"
                value={state.title}
                onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
                required
            />
            <br />
            <textarea
                placeholder="Описание"
                value={state.description}
                onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                required
            />
            <br />
            <select
                value={state.status}
                onChange={(e) => dispatch({ type: 'SET_STATUS', payload: e.target.value })}
            >
                <option value="Planned">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Done</option>
            </select>
            <br />
            <button type="submit">Создать</button>
        </form>
    );
}

export default TaskForm;
