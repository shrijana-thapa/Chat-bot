import { useForm } from 'react-hook-form';
import './form.css';
export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const submit = (data) => {
    console.log(data);
    reset();
  };
  const delivery = watch('delivery');
  const paymentMethod = watch('paymentMethod');
  return (
    <form onSubmit={handleSubmit(submit)}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" {...register('name', { required: true })} />
      {errors.name && <p>Name is required</p>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        {...register('email', { required: true })}
      />
      {errors.email && <p>Email is required</p>}
      <label htmlFor="phone">Phone Number:</label>
      <input
        type="number"
        id="phone"
        {...register('phone', {
          required:
            paymentMethod === 'cashOnDelivery'
              ? 'phone number is required for COD'
              : false,
        })}
      />
      {errors.phone && <p>{errors.phone.message}</p>}
      <label htmlFor="delivery">Delivery Option</label>
      <select id="delivery" {...register('delivery', { required: true })}>
        <option value="">Select an option</option>
        <option value="standard">Standard Delivery</option>
        <option value="express">Express Delivery</option>
        <option value="sameDay">SameDay Delivery</option>
      </select>
      {errors.delivery && <p>Please select a delivery option</p>}
      <fieldset>
        <legend>Payment Method</legend>
        <label>
          <input
            type="radio"
            value="creditCard"
            {...register('paymentMethod', { required: true })}
          />
          CreditCard
        </label>
        <label htmlFor="">
          <input
            type="radio"
            value="paypal"
            {...register('paymentMethod', { required: true })}
          />
          PayPal
        </label>
        <label htmlFor="">
          <input
            type="radio"
            value="cashOnDelivery"
            {...register('paymentMethod', { required: true })}
            disabled={delivery !== 'standard'}
          />
          CashOnDelivery
        </label>
      </fieldset>
      {!delivery && <p>Please select delivery option first</p>}
      <label htmlFor="extras">Extras</label>
      <label htmlFor="extras">
        <input type="checkbox" value="giftWrap" {...register('extras')}></input>
        Gift wrap
      </label>
      <label htmlFor="extras">
        <input type="checkbox" value="fragile" {...register('extras')}></input>
        Handle with care
      </label>
      <button type="submit">submit</button>
    </form>
  );
}
