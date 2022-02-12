import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { getFeaturedPosts } from '../services';
function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    let componentMounted = true;
    getFeaturedPosts().then((results) => {
      if (componentMounted) setFeaturedPosts(results);
    });
    return () => {
      componentMounted = false;
    };
  }, []);

  return <div>featuredPosts</div>;
}

export default FeaturedPosts;
