import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/PostCard.module.css';

function PostCard({ post }) {
  console.log(post);
  return (
    <div className={styles.card}>
      <div>
        <div>
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            height="667/2"
            width="1000/2"
            className={styles.featuredImage}
          />
        </div>
        <h1 className={styles.title}>
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>
      </div>
      <div className={styles.authDate}>
        <div className={styles.author}>
          <div className={styles.authImg}>
            <Image
              alt={post.author.name}
              src={post.author.photo?.url}
              height="30px"
              width="30px"
            />
          </div>
          <p>{post.author.name}</p>
        </div>

        <div className={styles.date}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2rem"
            height="1.2rem"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
          </svg>
          <span> {moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <div className={styles.btnContainer}>
        <Link href={`/post/${post.slug}`} className={styles.btnLink}>
          <span className={styles.btn}>Continue Reading</span>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
