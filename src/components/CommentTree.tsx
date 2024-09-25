import React from 'react';
import { List, ListItem, ListItemText, Collapse, Button } from '@mui/material';

interface Comment {
  id: number;
  by: string;
  text: string;
  kids?: Comment[];
}

interface CommentTreeProps {
  comments: Comment[];
  fetchReplies: (ids: number[]) => void;
}

const CommentTree: React.FC<CommentTreeProps> = ({ comments, fetchReplies }) => {
  const [open, setOpen] = React.useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpen(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };
console.log(comments)
  return (
    <List dense>
      {comments.map(comment => (
        <div key={comment.id}>
          <ListItem>
            <ListItemText primary={comment.by} secondary={comment.text ? comment.text : ''} />
            {comment.kids && (
              <>
                <Button variant="outlined" onClick={() => handleToggle(comment.id)}>
                  {open.includes(comment.id) ? 'Скрыть ответы' : 'Показать ответы'}
                </Button>
                <Collapse in={open.includes(comment.id)} timeout="auto" unmountOnExit>
                  <div>ffff</div>
                </Collapse>
              </>
            )}
          </ListItem>
        </div>
      ))}
    </List>
  );
};

export default CommentTree;
