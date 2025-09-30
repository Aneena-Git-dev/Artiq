import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import '../Styles/Checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    paymentMethod: 'card',
    shippingMethod: 'standard'
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shippingCost = formData.shippingMethod === 'express' ? 100 : 0;
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    const {
      email, firstName, lastName, address, city, state, zip, country, paymentMethod
    } = formData;

    if (!email || !firstName || !lastName || !address || !city || !state || !zip || !country || !paymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsPlacingOrder(true);
    setTimeout(() => {
      alert('Order placed successfully!');
      setCartItems([]);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="checkout-container container py-5">
      <div className="row g-5">

        {/* Checkout Form */}
        <div className="col-lg-7">
          <div className="checkout-card p-4 shadow rounded-4">
            {/* <h2 className="mb-4 text-primary fw-semibold">Checkout</h2> */}

            <div className="section mb-4">
              <h5 className="section-title">Contact Information</h5>
              <input type="email" name="email" required onChange={handleChange} value={formData.email} className="form-control mb-3" placeholder="Email or mobile number" />
            </div>

            <div className="section mb-4">
              <h5 className="section-title">Delivery Address</h5>
              <select name="country" onChange={handleChange} value={formData.country} className="form-select mb-3" required>
                <option value="">Select Country</option>
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="AE">UAE</option>
              </select>
              <div className="row">
                <div className="col">
                  <input name="firstName" onChange={handleChange} value={formData.firstName} className="form-control mb-3" placeholder="First Name" required />
                </div>
                <div className="col">
                  <input name="lastName" onChange={handleChange} value={formData.lastName} className="form-control mb-3" placeholder="Last Name" required />
                </div>
              </div>
              <input name="address" onChange={handleChange} value={formData.address} className="form-control mb-3" placeholder="Address" required />
              <input name="city" onChange={handleChange} value={formData.city} className="form-control mb-3" placeholder="City" required />
              <div className="row">
                <div className="col">
                  <input name="state" onChange={handleChange} value={formData.state} className="form-control mb-3" placeholder="State" required />
                </div>
                <div className="col">
                  <input name="zip" onChange={handleChange} value={formData.zip} className="form-control mb-3" placeholder="ZIP Code" required />
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <h5 className="section-title">Shipping Method</h5>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="shippingMethod" id="standard" value="standard" checked={formData.shippingMethod === 'standard'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="standard">Standard Delivery – Free</label>
              </div>
              <div className="form-check mt-2">
                <input className="form-check-input" type="radio" name="shippingMethod" id="express" value="express" checked={formData.shippingMethod === 'express'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="express">Express Delivery – ₹100</label>
              </div>
            </div>

            <div className="section mb-4">
              <h5 className="section-title">Payment Method</h5>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="paymentMethod" id="card" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="card">Credit / Debit Card</label>
              </div>
              <div className="form-check mt-2">
                <input className="form-check-input" type="radio" name="paymentMethod" id="upi" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="upi">UPI</label>
              </div>
              <div className="form-check mt-2">
                <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="paypal">PayPal</label>
              </div>
              <div className="form-check mt-2">
                <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                <label className="form-check-label" htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>

            <button className="btn btn-primary w-100 mt-3" onClick={placeOrder} disabled={isPlacingOrder}>
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-5">
          <div className="summary-card p-4 shadow rounded-4 bg-white">
            <h4 className="mb-4 text-dark fw-bold">Order Summary</h4>
            {cartItems.map(item => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>{item.title} × {item.quantity || 1}</span>
                <span>₹{item.price * (item.quantity || 1)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>₹{shippingCost.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5 fw-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
