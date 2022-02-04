import React from 'react';
import { getPosts, getPostDetails } from '../../services/index';
import PostDetail from '../../components/PostDetail';
import Categories from '../../components/Categories';
import PostWidget from '../../components/PostWidget';
import Author from '../../components/Author';
import CommentsForm from '../../components/CommentsForm';
import Comments from '../../components/Comments';
import styles from '../../styles/PostDetail.module.css';
function PostDetails({ post }) {
  console.log('POST', post);
  return (
    <div className={styles.postDetailContainer}>
      <div className={styles.post}>
        <PostDetail post={post} />
        <Author author={post.author} />
        <CommentsForm slug={post.slug} />
        <Comments slug={post.slug} />
      </div>
      <div className={styles.widgets}>
        <PostWidget
          slug={post.slug}
          categories={post.categories.map((category) => category)}
        />
        <Categories />
      </div>
    </div>
  );
}

export default PostDetails;

export async function getStaticProps({ params }) {
  console.log('PARAMS', params);
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
}
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
