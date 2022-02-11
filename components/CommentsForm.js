import React, { useState, useEffect, useRef } from 'react';

import { submitComment } from '../services';

function CommentsForm({ slug }) {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentElement = useRef();
  const nameElement = useRef();
  const emailElement = useRef();
  const storeDataElement = useRef();

  useEffect(() => {
    nameElement.current.value = window.localStorage.getItem('name');
    emailElement.current.value = window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmit = () => {
    setError(false);
    const { value: comment } = commentElement.current;
    const { value: name } = nameElement.current;
    const { value: email } = emailElement.current;
    const { value: storeData } = storeDataElement.current;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObject = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }
    submitComment(commentObject).then((res) => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };
  return (
    <div>
      <h3>Leave a Comment</h3>
      <div>
        <textarea ref={commentElement} placeHolder="Comment" name="comment" />
      </div>
      <div>
        <input type="text" ref={nameElement} placeHolder="Name" name="name" />
      </div>
      <div>
        <input
          type="email"
          ref={emailElement}
          placeHolder="Email"
          name="email"
        />
      </div>
      <div>
        <input
          type="checkbox"
          ref={storeDataElement}
          id="storeData"
          name="storeData"
        />
        <label htmlFor="storeData">Save email for future comments?</label>
      </div>
      {error && <p>All fields are required.</p>}
      <div>
        <input
          type="button"
          value="Submit Comment"
          onClick={handleCommentSubmit}
        />
        {showSuccessMessage && <span>Comment submitted for approval.</span>}
      </div>
    </div>
  );
}

export default CommentsForm;
