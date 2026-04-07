import { Product } from './product';
export function ProductsGrid({ products }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}
