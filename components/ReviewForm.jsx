import React, { useState, useEffect } from 'react';
import { client } from '../lib/client';
import { useRouter } from 'next/router';

const ReviewForm = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [productId, setProductId] = useState(null);


  useEffect(() => {
    if (slug) {
      const query = `*[_type == "product" && slug.current == $slug][0]._id`;
      client.fetch(query, { slug }).then((prodId) => {
        setProductId(prodId);
      });
    }
  }, [slug]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productId) return;

    const review = {
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId 
      },
      rating: parseInt(rating, 10),
      reviewText: reviewText
    };

    await client.create(review);
    setReviewText('');
    setRating(0);
  };
  return (
    <form onSubmit={handleSubmit} className={"review-form"}>
      <div>
        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
      </div>
      <div>
        <label htmlFor="reviewText">Review: </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
