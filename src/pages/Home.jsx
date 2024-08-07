import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

const Home = () => {
  return (
    <div className="container">
      <h1>Ürünler</h1>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">Detaylar</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
