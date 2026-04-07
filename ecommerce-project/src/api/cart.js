import axios from 'axios';
export const getCartItems = async () => {
  const res = await axios.get('/api/cart-items?expand=product');
  return res.data;
};
