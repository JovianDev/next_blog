import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import styles from '../styles/Comments.module.css';
import { getComments } from '../services';

function Comments({ slug }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let componentMounted = true;
    getComments(slug).then((result) => {
      if (componentMounted) setComments(result);
    });

    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className={styles.commentsContainer}>
          <h3>{comments.length} Comments</h3>
          {comments.map((comment) => {
            return (
              <div key={comment.createdAt} className={styles.comment}>
                <p className={styles.commentTitle}>
                  <span>{comment.name}</span> on{' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className={styles.commentBody}>{parse(comment.comment)}</p>
              </div>
            );
          })}
        </div>
      )}
      ;
    </>
  );
}

export default Comments;
