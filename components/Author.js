import React from 'react';
import Image from 'next/image';
import styles from '../styles/Author.module.css';

function Author({ author }) {
  return (
    <div className={styles.authorContainer}>
      <div className={styles.authorImg}>
        <Image
          alt={author.name}
          height="100px"
          width="100px"
          unoptimized
          src={author.photo.url}
        />
      </div>
      <div className={styles.authorData}>
        <h3>{author.name}</h3>
        <p>{author.bio}</p>
      </div>
    </div>
  );
}

export default Author;
