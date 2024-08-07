import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [newReview, setNewReview] = useState({ user: '', rating: 1, comment: '' });
  const product = products.find(p => p.id === parseInt(id));

  const handleAddReview = () => {
    if (newReview.user && newReview.comment) {
      product.reviews.push({ id: product.reviews.length + 1, ...newReview });
      setNewReview({ user: '', rating: 1, comment: '' });
    }
  };

  if (!product) return <p>Ürün bulunamadı.</p>;

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h3>Yorumlar</h3>
      <ul className="list-unstyled">
        {product.reviews.map(review => (
          <li key={review.id} className="mb-3">
            <h5>{review.user}</h5>
            <p>Derecelendirme: {review.rating} / 5</p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
      <h3>Yorum Ekle</h3>
      <div className="mb-3">
        <input
          type="text"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
          className="form-control mb-2"
          placeholder="Adınız"
        />
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          className="form-select mb-2"
        >
          {[1, 2, 3, 4, 5].map(rating => (
            <option key={rating} value={rating}>{rating} / 5</option>
          ))}
        </select>
        <textarea
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="form-control"
          rows="3"
          placeholder="Yorumunuz..."
        />
        <button onClick={handleAddReview} className="btn btn-primary mt-2">Yorum Ekle</button>
      </div>
    </div>
  );
};

export default ProductDetail;
