import React from 'react';
import { ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './newsItem.css';

interface NewsItemProps {
  id: number;
  title: string;
  score: number;
  by: string;
  time: number;
}

const NewsItem: React.FC<NewsItemProps> = ({ id, title, score, by, time }) => {
    const navigate = useNavigate();



  return (
    <div className="news-card" onClick={() => navigate(`news/${id}`)}>
      <ListItemText
        primary={title}
        secondary={
          <Typography component="span" variant="body2" color="text.primary">
            {`Рейтинг: ${score}, Автор: ${by}, Дата: ${new Date(time * 1000).toLocaleString()}`}
          </Typography>
        }
      />
    </div>
  );
};

export default NewsItem;
