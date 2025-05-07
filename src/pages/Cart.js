import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Apply a 10% discount if promo code is applied
  const discount = promoApplied ? subtotal * 0.1 : 0;

  // Shipping cost (free for orders over $50)
  const shipping = subtotal > 50 ? 0 : 5.99;

  // Calculate total
  const total = subtotal - discount + shipping;

  const handlePromoCode = () => {
    // Simple promo code validation (in a real app, this would check against valid codes in a database)
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
      setPromoApplied(false);
    }
  };

  // Handle quantity changes
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white"> 
      <h1 className="text-3xl font-bold mb-6 text-white">Your Shopping Cart</h1> 

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4 text-gray-300">Your cart is empty</p> 
          <Link to="/products" className="bg-teal-400 text-gray-900 px-6 py-2 rounded hover:bg-teal-500">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            {/* Cart Items */}
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden"> 
              <table className="w-full text-white"> 
                <thead className="bg-gray-700"> 
                  <tr>
                    <th className="text-left py-3 px-4 text-white">Product</th> 
                    <th className="text-center py-3 px-4 text-white">Quantity</th> 
                    <th className="text-right py-3 px-4 text-white">Price</th> 
                    <th className="text-right py-3 px-4 text-white">Total</th> 
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-t border-gray-700"> 
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover mr-4"
                          />
                          <div>
                            <p className="font-medium text-white">{item.name}</p> 
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-600 text-white px-2 py-1 rounded-l hover:bg-gray-500"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                handleQuantityChange(item.id, value);
                              }
                            }}
                            className="w-12 text-center py-1 border-t border-b border-gray-700 bg-gray-800 text-white"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-600 text-white px-2 py-1 rounded-r hover:bg-gray-500"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-white"> 
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-white"> 
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:w-1/3">
            {/* Order Summary */}
            <div className="bg-gray-800 rounded-lg shadow p-6 text-white"> 
              <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span> 
                  <span className="text-white">${subtotal.toFixed(2)}</span> 
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span> {/* Lighter text */}
                  <span className="text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="border-t border-gray-700 pt-3 font-bold flex justify-between text-white"> 
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-300">Promo Code</label> 
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="border rounded-l px-3 py-2 w-full bg-gray-700 text-white border-gray-700"
                  />
                  <button
                    onClick={handlePromoCode}
                    className="bg-teal-400 text-gray-900 px-4 py-2 rounded-r hover:bg-teal-500"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-400 text-sm mt-1">Promo code applied!</p>
                )}
              </div>

              <Link
                to="/checkout"
                className="block bg-teal-400 text-gray-900 text-center py-3 px-4 rounded font-medium hover:bg-teal-500 w-full"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block text-center mt-4 text-teal-400 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;