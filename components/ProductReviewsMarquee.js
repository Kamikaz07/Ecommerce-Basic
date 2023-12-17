import React, { useState, useEffect } from 'react';
import { client } from '../lib/client';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


const ProductReviewsMarquee = ({ productSlug }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (productSlug) {
      const query = `*[_type == "review" && product->slug.current == $slug]{reviewText, rating}`;
      client.fetch(query, { slug: productSlug }).then((fetchedReviews) => {
        setReviews(fetchedReviews);
      });
    }
  }, [productSlug]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      return index < rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />;
    });
  };

  if (reviews.length === 0) {
    return null; // Não renderiza nada se não houver reviews
  }

  return (
    <div className="review-products-wrapper">
      <h2>Reviews:</h2>
      <div className="marquee-rev">
        <div className="review-products-container track">
          {reviews.map((review, index) => (
            <div className="review-box" key={index}>
              <div className="reviews">
                {renderStars(review.rating)}
              </div>
              <p className="review-text">{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsMarquee;
