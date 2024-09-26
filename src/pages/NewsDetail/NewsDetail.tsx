import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CircularProgress, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import CommentComponent from '../../components/commentComponent/CommentComponent';
import Header from '../../components/header/Header';



const NewsDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<any | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const newsResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
            setNews(newsResponse.data);
            const commentsData = await Promise.all(
                newsResponse.data.kids?.map((kid: number) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`)) || []
            );
            setComments(commentsData.map(comment => comment.data).filter(c => c));
        } catch (error) {
            setError("Error fetching news. Try again later.");
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);
    return (
        <Box sx={{ backgroundColor: 'gainsboro' }}>
            <Header />
            <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
                {loading && <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}>
                    <CircularProgress />
                </Box>}
                {error && <Alert severity="error">{error}</Alert>}
                {!loading && !error && news && (
                    <>
                        <Box sx={{ padding: 3, backgroundColor: '#e3f2fd', borderRadius: '8px', boxShadow: 1, marginBottom: 2 }}>
                            <Typography variant="h4">{news.title}</Typography>
                            {news.url && (
                                <Typography variant="h6">Read more at:
                                <a
                                        className="news-detail-block__link"
                                        href={news.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {news.url}
                                    </a>
                                </Typography>
                            )}
                            <Typography variant="subtitle1">By: {news.by}</Typography>
                            <Typography variant="subtitle2">Date: {new Date(news.time * 1000).toLocaleString()}</Typography>
                            <Typography variant="subtitle2">Likes: {news.descendants || 0}</Typography>
                        </Box>

                        <Box sx={{ marginBottom: 2 }}>
                            <Button variant="contained" onClick={fetchData} sx={{ marginRight: 1 }}>Refresh comments</Button>
                            <Button component={Link} to="/" variant="outlined">Back to the Mainpage</Button>
                        </Box>

                        <Typography variant="h5" sx={{ marginBottom: 2 }}>Comments</Typography>
                        {comments.length > 0 ? comments.map(comment => (
                            <div>
                                <CommentComponent key={comment.id} comment={comment} />
                            </div>
                        ))
                    :
                                            <Typography variant="h6" sx={{ marginBottom: 2}}>No comments yet</Typography>
                    }
                    </>
                )}
            </Box>
        </Box>
    );
};

export default NewsDetail;
