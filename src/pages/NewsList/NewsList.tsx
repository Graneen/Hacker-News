import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button } from '@mui/material';
import NewsItem from '../../components/newsItem/NewsItem';
import Header from '../../components/Header';

import './newsList.css';

interface NewsItemData {
  id: number;
  title: string;
  score: number;
  by: string;
  time: number;
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
      const topIds = response.data.slice(0, 100);
      const newsPromises = topIds.map(id => axios.get<NewsItemData>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));
      const newsResponses = await Promise.all(newsPromises);
      const newsData = newsResponses.map(res => res.data).filter(item => item);

      setNews(newsData);
    } catch (error) {
      console.error('Упс, ошибка при получении новостей', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const intervalId = setInterval(fetchNews, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header />
      <div className="main-back">
        <Button variant="contained" onClick={fetchNews} disabled={loading}  sx={{ marginTop: '5vh'}}>
          {loading ? 'Обновление...' : 'Обновить список новостей'}
        </Button>
        <List>
          {news.sort((a, b) => b.time - a.time).map(item => (
            <NewsItem key={item.id} {...item} />
          ))}
        </List>
      </div>
    </>
  );
};

export default NewsList;
