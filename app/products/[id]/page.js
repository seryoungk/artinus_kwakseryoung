"use client"

import axios from 'axios';
import Image from 'next/image';
import styles from '../../product.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>
      <ClipLoader color="skyblue" size={50} />
    </div>;
  }

  if (error || !product) return <div className={styles.loading}>
    <Link href={'/'}>
      <button className={styles.backButton}>
        메인 화면으로 이동
      </button>
    </Link>
    <Image src={'/404error.png'} width={600} height={600} alt='error' style={{width:"100%", maxWidth:"600px", height:"auto", maxHeight:"600px"}} />
    <div style={{fontSize:"32px"}}> 에러가 발생했습니다. </div>
  </div>;

  return (
    <div className={styles.root}>
      <Link href={'/'}>
        <button className={styles.backButton}>
          ← 상품 목록으로 돌아가기
        </button>
      </Link>
      <h1>[{product.brand || "NO BRAND"}] {product.title}</h1>
      <div className={styles.productDetailWrapper}>
        <div className={styles.imagecontainer}>
          <Image src={product.thumbnail} width={400} height={400} alt={product.title} />
        </div>
        <div>
          <div className={styles.price}>
            <span className={styles.originalPrice}>
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className={styles.currentPrice}> ${product.price}</span>
          </div>
          <div className={styles.ratingcontainer}>
            <div className={styles.rating}>
              {renderStars(product.rating)}
            </div>
            <div className={styles.ratingpoint}>
              ({product.rating})
            </div>
          </div>
          <div className={styles.tagContainer}>
            {product.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
          <p><strong>설명:</strong> {product.description}</p>
        </div>
      </div>
    </div>
  );
}
