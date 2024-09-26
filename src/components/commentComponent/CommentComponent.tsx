import React, { useState } from 'react';
import { Box, Button, Typography, Collapse, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Comment {
  id: number;
  text: string;
  by: string;
  kids?: number[];
}

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const fetchReplies = async (replyIds: number[]) => {
    setLoadingReplies(true);
    try {
      const repliesData = await Promise.all(
        replyIds.map(id =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        )
      );
      setReplies(repliesData.map(res => res.data));
    } catch (error) {
      console.error("Error, when fetching replies:", error);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleShowReplies = () => {
    if (!replies.length && comment.kids) {
      fetchReplies(comment.kids);
    }
    setShowReplies(!showReplies);
  };

  return (
    <Box sx={{
      marginLeft: 2,
      padding: 2,
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: 1,
      marginBottom: 2
    }}>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: comment.text }} />
      <Typography variant="caption" color="textSecondary">By: {comment.by}</Typography>
      {comment.kids && (
        <Button onClick={handleShowReplies} variant="outlined" sx={{ marginTop: 1 }}>
          {showReplies ? "Skip replies" : "Show replies"}
        </Button>
      )}
      <Collapse in={showReplies}>
        {loadingReplies ? (
          <CircularProgress size={20} />
        ) : (
          replies.map(reply => <CommentComponent key={reply.id} comment={reply} />)
        )}
      </Collapse>
    </Box>
  );
};

export default CommentComponent;