import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { useUpdateCart } from '../../hooks/useUpdateCart';

export function DeliveryOption({ deliveryOptions, cartItem }) {
  const { mutate: updateCart } = useUpdateCart();
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = 'FREE Shipping';
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} -Shipping`;
        }

        const changeDeliveryOption = () => {
          updateCart({
            productId: cartItem.productId,
            deliveryOptionId: deliveryOption.id,
          });
        };

        return (
          <div
            onClick={changeDeliveryOption}
            key={deliveryOption.id}
            className="delivery-option"
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  'dddd,MMMM,D',
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
