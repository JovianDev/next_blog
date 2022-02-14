import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import styles from '../styles/PostWidget.module.css';
import { getRecentPosts, getSimilarPosts } from '../services';

function PostWidget({ catagories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    slug
      ? getSimilarPosts(catagories, slug).then((result) =>
          setRelatedPosts(result)
        )
      : getRecentPosts().then((result) => setRelatedPosts(result));

    //   console.log('RELATED POSTS', relatedPosts);
  }, [slug]);

  return (
    <div className={styles.postWidgetContainer}>
      <h3 className={styles.title}>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts?.map((post) => (
        <div key={post.title} className={styles.post}>
          <div className={styles.imgContainer}>
            <img
              className={styles.postImg}
              alt={post.title}
              height="60px"
              width="60px"
              src={post.featuredImage.url}
            />
          </div>
          <div className={styles.dateLink}>
            <p>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link
              href={`/post/${post.slug}`}
              passHref
              key={post.title}
              className={styles.linkContainer}
            >
              <span className={styles.linkBtn}>{post.title}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostWidget;
