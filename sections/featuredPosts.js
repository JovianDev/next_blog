import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getFeaturedPosts } from '../services';
import FeaturedPostCard from '../components/FeaturedPostCard';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    let componentMounted = true;
    // getFeaturedPosts().then((result) => console.log('GET F POST ', result));
    getFeaturedPosts().then((results) => {
      console.log('FEATURED POSTS', results);
      if (componentMounted) {
        setFeaturedPosts(results.posts);
      }
    });
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <div>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {featuredPosts &&
          featuredPosts.map((post) => {
            return <FeaturedPostCard post={post} key={post.createdAt} />;
          })}
      </Carousel>
    </div>
  );
}

export default FeaturedPosts;
