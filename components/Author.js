import React from 'react';
import Image from 'next/image';

function Author({ author }) {
  return (
    <div>
      <div>
        <Image
          alt={author.name}
          height="75px"
          width="75px"
          unoptimized
          src={author.photo.url}
        />
      </div>
      <h3>{author.name}</h3>
      <p>{author.bio}</p>
    </div>
  );
}

export default Author;
