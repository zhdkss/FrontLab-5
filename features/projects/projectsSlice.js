import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import projectsData from '../../assets/data/projects.json';

const fetchProjectsFromSource = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!projectsData) {
        throw new Error("Could not load projects data.");
    }
    return projectsData;
};

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchProjectsFromSource();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch projects');
        }
    }
);

const initialState = {
    list: [],
    loading: 'idle',
    error: null,
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload;
            });
    },
});

export default projectsSlice.reducer;

const selectProjectsState = (state) => state.projects;

export const selectAllProjects = (state) => selectProjectsState(state).list;
export const selectProjectsLoading = (state) => selectProjectsState(state).loading;
export const selectProjectsError = (state) => selectProjectsState(state).error;

const selectProjectIdArg = (_, projectId) => projectId;

export const selectProjectById = createSelector(
    [selectAllProjects, selectProjectIdArg],
    (allProjects, projectId) => {
        if (projectId === undefined || projectId === null) {
            return undefined;
        }
        const idNum = Number(projectId);
        if (isNaN(idNum)) {
            return undefined;
        }
        const project = allProjects.find(project => project.id === idNum);
        return project;
    }
);
