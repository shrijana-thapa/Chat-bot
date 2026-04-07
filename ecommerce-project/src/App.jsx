import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css';
import { Form } from './components/form/form';
import { useCart } from './hooks/hooks';

function App() {
  const { data: cart = [], isLoading, isError } = useCart();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading cart data</div>;

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="checkout/form" element={<Form />} />
    </Routes>
  );
}

export default App;
