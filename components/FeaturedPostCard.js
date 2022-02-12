import React from 'react';
import styles from '../styles/FeaturedPostCard.module.css';

function FeaturedPostCard({ post }) {
  return (
    <div key={post.createdAt} className={styles.featuredPostCardContainer}>
      <h3>{post.title}</h3>
    </div>
  );
}

export default FeaturedPostCard;
