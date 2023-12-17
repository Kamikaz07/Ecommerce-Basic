import React, { useState, useEffect } from 'react';
import { client } from '../lib/client';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ReviewsComponent = ({ productSlug }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (productSlug) {
      const query = `*[_type == "review" && product->slug.current == $slug]`;
      client.fetch(query, { slug: productSlug }).then((data) => {
        setReviews(data);
        if (data.length > 0) {
          const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(totalRating / data.length);
        }
      });
    }
  }, [productSlug]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      return i < Math.round(rating) ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />;
    });
  };

  return (
    <div className="reviews">
      <div className="average-rating">
        {renderStars(averageRating)}
      </div>
      <p>({reviews.length})</p>
    </div>
  );
};

export default ReviewsComponent;
