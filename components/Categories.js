import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '../services/index';
import styles from '../styles/Categories.module.css';

function Catagories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
    console.log('categories ', categories);
  }, []);
  return (
    <div className={styles.categoriesContainer}>
      <h3 className={styles.title}>Categories</h3>
      {categories.map((category) => (
        <div className={styles.catagories} key={category.slug}>
          <Link
            href={`/categories/${category.slug}`}
            passHref
            key={category.name}
          >
            <span>{category.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Catagories;
