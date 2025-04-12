import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import tasksData from '../../assets/data/tasks.json';

const fetchTasksFromSource = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    if (!tasksData) {
        throw new Error("Could not load tasks data.");
    }
    return tasksData.map(task => ({ ...task, id: String(task.id) }));
};

const tasksAdapter = createEntityAdapter({
    selectId: (task) => task.id,
});

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchTasksFromSource();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch tasks');
        }
    }
);

const initialState = tasksAdapter.getInitialState({
    loading: 'idle',
    error: null,
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskStatus: (state, action) => {
            const { id, status } = action.payload;
            tasksAdapter.updateOne(state, {
                id: id,
                changes: { status: status },
            });
        },
        addTask: {
            reducer: (state, action) => {
                tasksAdapter.addOne(state, action.payload);
            },
            prepare: ({ projectId, title, status }) => {
                const id = nanoid();
                return {
                    payload: {
                        id,
                        projectId: Number(projectId),
                        title,
                        status,
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                tasksAdapter.setAll(state, action.payload);
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload;
            });
    },
});

export default tasksSlice.reducer;
export const { updateTaskStatus, addTask } = tasksSlice.actions;

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds,
} = tasksAdapter.getSelectors((state) => state.tasks);

const selectProjectIdArg = (_, projectId) => projectId;

export const selectTasksByProjectId = createSelector(
    [selectAllTasks, selectProjectIdArg],
    (allTasks, projectId) => {
        if (projectId === undefined || projectId === null) {
            return [];
        }
        const projectIdNum = Number(projectId);
        if (isNaN(projectIdNum)) {
            return [];
        }
        const filteredTasks = allTasks.filter(task => task.projectId === projectIdNum);
        return filteredTasks;
    }
);
