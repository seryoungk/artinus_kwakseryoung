"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("전체 보기");
  const categories = ["전체 보기", ...new Set(products.map((p) => p.category))];
  const filteredProducts = selectedCategory === "전체 보기"
    ? products
    : products.filter((p) => p.category === selectedCategory);
  const [sortOption, setSortOption] = useState("no-sort");
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-asc":
        return a.rating - b.rating;
      case "rating-desc":
        return b.rating - a.rating;
      case "no-sort":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar && '⯪'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await axios.get('https://dummyjson.com/products?skip=0&limit=20');
        setProducts(res.data.products);
      } catch (err) {
        console.error('데이터 가져오기 실패', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>
      <ClipLoader color="skyblue" size={50} />
    </div>
  };

  if (error) return <div className={styles.loading}>
    <Image src={'/404error.png'} width={600} height={600} alt='error' style={{width:"100%", maxWidth:"600px", height:"auto", maxHeight:"600px"}}/>
  </div>;

  return (
    <div className={styles.root}>
      <h1>상품 목록</h1>
      <div className={styles.optioncontainer}>
        <div className={styles.filter}>
          <div>카테고리:</div>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.sortBar}>
          <div
            className={sortOption === "no-sort" ? styles.active : ""}
            onClick={() => setSortOption("no-sort")}
          >
            기본 정렬
          </div>
          <div
            className={sortOption === "price-asc" ? styles.active : ""}
            onClick={() => setSortOption("price-asc")}
          >
            가격 낮은 순
          </div>
          <div
            className={sortOption === "price-desc" ? styles.active : ""}
            onClick={() => setSortOption("price-desc")}
          >
            가격 높은 순
          </div>
          <div
            className={sortOption === "rating-desc" ? styles.active : ""}
            onClick={() => setSortOption("rating-desc")}
          >
            별점 높은 순
          </div>
          <div
            className={sortOption === "rating-asc" ? styles.active : ""}
            onClick={() => setSortOption("rating-asc")}
          >
            별점 낮은 순
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        {sortedProducts.map((item) => (
          <Link href={`/products/${item.id}`} key={item.id} className={styles.link}>
          <div className={styles.card}>
            <Image
              src={item.thumbnail}
              width={200}
              height={200}
              alt={`${item.title} thumbnail image`}
              className={styles.thumbnail}
            />
            <div className={styles.title}>
              [{item.brand ? item.brand : "NO BRAND"}] {item.title}
            </div>
            <div className={styles.price}>
              <span className={styles.originalPrice}>
                ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
              </span>
              <span className={styles.currentPrice}> ${item.price}</span>
            </div>
            <div className={styles.ratingcontainer}>
              <div className={styles.rating}>
                {renderStars(item.rating)}
              </div>
              <div className={styles.ratingpoint}>
                ({item.rating})
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}