import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css';
import { Form } from './components/form/form';
import { useCart } from './hooks/hooks';
import UserDashboard from './pages/table/Dashboard';
import { CartContext } from './context/CartContext';

function App() {
  const { data: cart = [], isLoading, isError } = useCart();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading cart data</div>;

  return (
    <CartContext.Provider value={cart}>
    <Routes>
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="checkout/form" element={<Form />} />
      {/* <Route path="users" element={<UserDashboard />} /> */}
    </Routes>
     </CartContext.Provider>
  );
}

export default App;
