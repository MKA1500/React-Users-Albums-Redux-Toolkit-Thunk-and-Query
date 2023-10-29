import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    // reducers: {}
    // that will allow to watch some extra action types:
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // build in Thunk feature
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error; // build in Thunk feature
        });
    }
});

export const usersReducer = usersSlice.reducer;