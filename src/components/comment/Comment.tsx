import './Comment.css';
import { ReactNode } from 'react';

interface CommentProps {
  author: string;
  publicationDate: number;
  text: string;
  children?: ReactNode;
  deleted: boolean;
  dead: boolean;
}


function Comment ({ comments }) {
  return (
    <div className={`comment ${comments.deleted || comments.dead ? 'comment_deleted' : ''}`}>
      <div className="comment__current">
        {(comments.deleted || comments.dead) && (
          <p className="comment__text comment__text_deleted">Комментарий был удален.</p>
        )}

        {!(comments.deleted || comments.dead) && (
          <>
            <div className="comment__header">
              <p className="comment__author">{comments.by}</p>
              <p className="comment__publication-date">{comments.time}</p>
            </div>

            <div className="comment__text" dangerouslySetInnerHTML={{ __html: comments.text }} />
          </>
        )}
      </div>

      {/* {children && <div className="comment__children">{children}</div>} */}
    </div>
  );
}

export default Comment;