import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import { useAddToCart } from '../../hooks/useAddToCart';

export function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { mutate: addToCart, isPending } = useAddToCart();
  const handleAddToCart = () => {
    addToCart(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          setAdded(true);
          setTimeout(() => setAdded(false), 1000);
        },
      },
    );
  };
  const selectQuantity = (event) => {
    const selectedQuantity = Number(event.target.value);
    setQuantity(selectedQuantity);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>
      {added && (
        <div className="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="add-to-cart-button button-primary"
      >
        {isPending ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
