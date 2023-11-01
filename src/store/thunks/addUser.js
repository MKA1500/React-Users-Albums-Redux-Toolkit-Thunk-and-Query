import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { pause } from "../../shared/utils/staticUtils";

const addUser = createAsyncThunk('users/add', async () => {
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.person.firstName()
    });

    // dev only - to test loading:
    await pause(1000);

    return response.data;
});

export { addUser };