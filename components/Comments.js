import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
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
        <div>
          <h3>{comments.length} Comments</h3>
          {comments.map((comment) => {
            return (
              <div key={comment.createdAt}>
                <p>
                  <span>{comment.name}</span> on{' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <p>{parse(comment.comment)}</p>
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
