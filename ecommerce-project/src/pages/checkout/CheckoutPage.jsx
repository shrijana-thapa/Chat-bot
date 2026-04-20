import axios from 'axios';
import { useReducer, useEffect, useContext } from 'react';
import './checkout-header.css';
import './CheckoutPage.css';
import { OrderSummary } from './orderSummary';
import { PaymentSummary } from './paymentSummary';
import { useNavigate } from 'react-router';
import { CartContext } from '../../context/CartContext';

const initialState = {
  deliveryOptions: [],
  paymentSummary: null,
};

function checkoutReducer(state, action) {
  switch (action.type) {
    case 'SET_DELIVERY_OPTIONS': {
      return {
        ...state,
        deliveryOptions: action.payload,
      };
    }
    case 'SET_PAYMENT_SUMMARY': {
      return {
        ...state,
        paymentSummary: action.payload,
      };
    }
    default:
      return state;
  }
}

export function CheckoutPage() {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        '/api/delivery-options?expand=estimatedDeliveryTime',
      );
      dispatch({ type: 'SET_DELIVERY_OPTIONS', payload: response.data });
      response = await axios.get('/api/payment-summary');
      dispatch({ type: 'SET_PAYMENT_SUMMARY', payload: response.data });
    };
    fetchCheckoutData();
  }, [cart]);

  const goToForm = () => {
    navigate('form');
  };
  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
          <button onClick={goToForm}>Form</button>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={state.deliveryOptions} cart={cart} />
          <PaymentSummary paymentSummary={state.paymentSummary} />
        </div>
      </div>
    </>
  );
}
