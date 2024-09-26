import React, { useEffect } from 'react';
import { fetchNews } from '../../redux/reducers/newsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { List, Button, CircularProgress, Box } from '@mui/material';
import NewsItem from '../../components/newsItem/NewsItem';
import Header from '../../components/header/Header';

import './newsList.css';


const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const news = [...useAppSelector((state: { news: any }) => state.news.items)];
  const loading = useAppSelector((state: { news: any }) => state.news.loading);

  useEffect(() => {
    dispatch(fetchNews());
    const interval = setInterval(() => dispatch(fetchNews()), 60000);
    return () => clearInterval(interval);
  }, [dispatch]);


  function feedUpdater() {
    dispatch(fetchNews());
  }

  return (
    <>
      <Header />
      <div className="main-back">
        <Button variant="contained" onClick={() => feedUpdater()} disabled={loading} sx={{ marginTop: '5vh' }}>
          {loading ? 'Updating...' : 'Update the newsfeed'}
        </Button>
        {loading ?
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
            <CircularProgress />
          </Box>
          :
          <List>
            {news.sort((a, b) => b.time - a.time).map(item => (
              <NewsItem key={item.id} {...item} />
            ))}
          </List>
        }
      </div>
    </>
  );
};

export default NewsList;
