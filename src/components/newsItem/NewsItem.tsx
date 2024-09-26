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
  kids: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ id, title, score, by, time, kids }) => {
    const navigate = useNavigate();



  return (
    <div className="news-card" onClick={() => navigate(`news/${id}`)}>
      <ListItemText
        primary={title}
        secondary={
          <Typography component="span" variant="body2" color="text.primary">
            {`Rating: ${score}, Author: ${by}, Date: ${new Date(time * 1000).toLocaleString()}, Comments: ${kids ? kids.length : 0}`}
          </Typography>
        }
      />
    </div>
  );
};

export default NewsItem;
