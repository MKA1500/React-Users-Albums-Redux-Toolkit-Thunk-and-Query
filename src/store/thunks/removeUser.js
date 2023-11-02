import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (user) => {
    console.log('remove user:', user);
    await axios.delete(`http://localhost:3005/users/${user.id}`);

    return user; // to be able to delete him from state in the usersSlice.js
});

export { removeUser };
