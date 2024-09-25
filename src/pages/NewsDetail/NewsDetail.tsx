import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, List } from '@mui/material';
import Comment from '../../components/comment/Comment';

interface Comment {
    id: number;
    by: string;
    text: string;
    kids?: Comment[];
}

interface NewsDetailData {
    title: string;
    url: string;
    by: string;
    time: number;
    descendants: number;
    kids?: number[];
}

const NewsDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<NewsDetailData | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState<boolean>(false);

    const fetchNewsDetails = async () => {
        try {
            const response = await axios.get<NewsDetailData>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
            setNews(response.data);
            if (response.data.kids) {
                await fetchComments(response.data.kids);
            }
        } catch (error) {
            console.error('Ошибка при загрузке детали новости', error);
        }
    };

    const fetchComments = async (commentIds: number[]) => {
        setLoadingComments(true);
        try {
            const commentsPromises = commentIds.map(id => axios.get<Comment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));
            const commentsResponses = await Promise.all(commentsPromises);
            const fetchedComments = commentsResponses.map(res => res.data).filter(item => item);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Ошибка при загрузке комментариев', error);
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        fetchNewsDetails();
    }, [id]);

    return (
        <div>
            {news && (
                <>
                    <Link to="/">Назад к новостям</Link>
                    <Typography variant="h4">{news.title}</Typography>
                    <Typography variant="h6">Подробнее:<a href={news.url}>{news.url}</a></Typography>
                    <Typography variant="body1">Автор: {news.by}</Typography>
                    <Typography variant="body1">Дата: {new Date(news.time * 1000).toLocaleString()}</Typography>
                    <Typography variant="body1">Количество комментариев: {news.descendants}</Typography>
                    <Button variant="contained" onClick={() => fetchComments((news.kids || []))} disabled={loadingComments}>
                        {loadingComments ? 'Загружаем комментарии...' : 'Обновить комментарии'}
                    </Button>

                    <List>
                        <Comment comments={comments} fetchReplies={fetchComments} />
                    </List>
                </>
            )}
        </div>
    );
};

export default NewsDetail;
