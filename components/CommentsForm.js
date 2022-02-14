import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/CommentsForm.module.css';

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
    let name = window.localStorage.getItem('name');
    let email = window.localStorage.getItem('email');
    if (name && email) {
      nameElement.current.value = name;
      emailElement.current.value = email;
      storeDataElement.current.checked = true;
    }
  }, []);

  const handleCommentSubmit = () => {
    setError(false);
    const { value: comment } = commentElement.current;
    const { value: name } = nameElement.current;
    const { value: email } = emailElement.current;
    const { checked: storeData } = storeDataElement.current;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObject = { name, email, comment, slug };
    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    }
    if (!storeData) {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }
    submitComment(commentObject).then((res) => {
      commentElement.current.value = '';
      if (!storeData) {
        nameElement.current.value = '';
        emailElement.current.value = '';
      }
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };
  return (
    <div className={styles.commentsFormContainer}>
      <h3 className={styles.title}>Leave a Comment</h3>
      <textarea
        ref={commentElement}
        rows="5"
        className={styles.txtArea}
        placeholder="Leave Your Comment..."
        name="comment"
      />
      <div className={styles.input}>
        <input
          type="text"
          ref={nameElement}
          placeholder="Name *"
          name="name"
          className={styles.inputName}
        />
        <input
          className={styles.inputEmail}
          type="email"
          ref={emailElement}
          placeholder="Email *"
          name="email"
        />
      </div>
      <div className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="checkbox"
          ref={storeDataElement}
          id="storeData"
          name="storeData"
        />
        <label className={styles.checkboxLabel} htmlFor="storeData">
          Save email for future comments?
        </label>
      </div>
      {error && (
        <p className={styles.error}>All fields are required to post comment.</p>
      )}
      <div className={styles.btnContainer}>
        <input
          className={styles.btn}
          type="button"
          value="Submit Comment"
          onClick={handleCommentSubmit}
        />
        {showSuccessMessage && (
          <span className={styles.success}>
            Comment submitted for approval.
          </span>
        )}
      </div>
    </div>
  );
}

export default CommentsForm;
