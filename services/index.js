import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges;
};
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query, { slug });
  return results.post;
};
export const getRecentPosts = async () => {
  try {
    const query = gql`
  query GetPostDetails() {
    posts(
      orderBy: createdAt_ASC
      last:3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug

      }
  }
  `;
    const results = await request(graphqlAPI, query);
    return results.posts;
  } catch (error) {
    console.log('GET RECENT POSTS ERROR ', error);
  }
};

export const getSimilarPosts = async (categories, slug) => {
  try {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
          where: {
            slug_not: $slug
            AND: { catagories_some: { slug_in: $catagories } }
          }
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const results = await request(graphqlAPI, query, { categories, slug });
    return results.posts;
  } catch (error) {
    console.log('Error fetching similar posts ', error);
  }
};

export const getCategories = async () => {
  try {
    const query = gql`
      query GetCategories {
        categories {
          name
          slug
        }
      }
    `;
    const results = await request(graphqlAPI, query);
    console.log('RESULTS', results);
    return results.categories;
  } catch (error) {
    console.log('Error fetching categories ', error);
  }
};

export const submitComment = async (obj) => {
  try {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    return result.json;
  } catch (error) {
    console.log(error);
  }
};
