import React from 'react';
import moment from 'moment';
import styles from '../styles/PostDetail.module.css';

function PostDetail({ post }) {
  const getContentFragment = (index, text, obj, type) => {
    let newText = text;
    if (obj) {
      if (obj.bold) {
        newText = <b key={index}>{text}</b>;
      }
      if (obj.italic) {
        newText = <em key={index}>{text}</em>;
      }
      if (obj.underline) {
        newText = <u key={index}>{text}</u>;
      }
    }
    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index}>
            {newText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'heading-four':
        return (
          <h4 key={index}>
            {newText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {newText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return newText;
    }
  };
  return (
    <div>
      <div>
        <img src={post.featuredImage.url} alt={post.title} />
      </div>
      <div>
        <div className={styles.author}>
          <img
            alt={post.author.name}
            src={post.author.photo?.url}
            height="30px"
            width="30px"
          />
          <p>{post.author.name}</p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
          </svg>
          <span> {moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
        <h1>{post.title}</h1>
        {console.log('POSTCONTENT ', post.content.raw)}
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
}

export default PostDetail;
