// src/features/news/newsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface News {
  id: number;
  title: string;
  by: string;
  time: number;
  score: number;
  kids?: number[];
}

interface NewsState {
  items: News[];
  loading: boolean;
}

const initialState: NewsState = {
  items: [],
  loading: false,
};

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
  const newsIds = response.data.slice(0, 100);
  const newsPromises = newsIds.map((id: number) => 
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  );
  const newsItems = await Promise.all(newsPromises);
  return newsItems.map(item => item.data);
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default newsSlice.reducer;
