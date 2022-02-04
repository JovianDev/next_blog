import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import styles from '../styles/Header.module.css';

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
    console.log('categories ', categories);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Link href="/">Jovian Blog</Link>
      </div>
      <div className={styles.catagories}>
        {categories.map((category, i) => (
          <div key={category.name}>
            <Link key={category.slug} href={`/category/${category.slug}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
