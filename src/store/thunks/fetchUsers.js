import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { pause } from "../../shared/utils/staticUtils";

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    // dev only - to test loading:
    await pause(1000);

    return response.data;
});

// there are 3 properties automatically added in:
// fetchUsers.pending === 'users/fetch/pending'
// fetchUsers.fulfilled === 'users/fetch/fulfilled'
// fetchUsers.rejected === 'users/fetch/rejected'

export { fetchUsers };