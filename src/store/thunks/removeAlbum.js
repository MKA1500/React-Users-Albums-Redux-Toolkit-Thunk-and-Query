import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeAlbum = createAsyncThunk("albums/remove", async (album) => {
  await axios.delete(`http://localhost:3005/albums/${album.id}`);
  return album;
});

export { removeAlbum };
