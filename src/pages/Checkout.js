import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // States for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // State for form errors
  const [errors, setErrors] = useState({});
  
  // Calculate order summary
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + shipping + tax;
  
  // Country-specific data
  const countryData = {
    'United States': {
      stateLabel: 'State',
      zipLabel: 'ZIP Code',
      zipRegex: /^\d{5}(-\d{4})?$/,
      zipErrorMessage: 'ZIP code must be 5 digits (plus optional 4-digit extension)',
      zipPlaceholder: '12345',
      states: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]
    },
    'India': {
      stateLabel: 'State/Union Territory',
      zipLabel: 'PIN Code',
      zipRegex: /^[1-9][0-9]{5}$/,
      zipErrorMessage: 'PIN code must be 6 digits and not start with 0',
      zipPlaceholder: '110001',
      states: [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
        'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
        'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
      ]
    },
    'Canada': {
      stateLabel: 'Province/Territory',
      zipLabel: 'Postal Code',
      zipRegex: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      zipErrorMessage: 'Postal code must be in format A1A 1A1',
      zipPlaceholder: 'A1A 1A1',
      states: [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
        'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
        'Quebec', 'Saskatchewan', 'Yukon'
      ]
    },
    'United Kingdom': {
      stateLabel: 'County',
      zipLabel: 'Postcode',
      zipRegex: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
      zipErrorMessage: 'Postcode must be in valid UK format',
      zipPlaceholder: 'SW1A 1AA',
      states: [
        'Avon', 'Bedfordshire', 'Berkshire', 'Buckinghamshire', 'Cambridgeshire', 'Cheshire',
        'Cleveland', 'Cornwall', 'Cumbria', 'Derbyshire', 'Devon', 'Dorset', 'Durham', 'East Sussex',
        'Essex', 'Gloucestershire', 'Hampshire', 'Herefordshire', 'Hertfordshire', 'Isle of Wight',
        'Kent', 'Lancashire', 'Leicestershire', 'Lincolnshire', 'London', 'Merseyside', 'Middlesex',
        'Norfolk', 'Northamptonshire', 'Northumberland', 'North Yorkshire', 'Nottinghamshire',
        'Oxfordshire', 'Rutland', 'Shropshire', 'Somerset', 'South Yorkshire', 'Staffordshire',
        'Suffolk', 'Surrey', 'Tyne and Wear', 'Warwickshire', 'West Midlands', 'West Sussex',
        'West Yorkshire', 'Wiltshire', 'Worcestershire'
      ]
    },
    'Australia': {
      stateLabel: 'State/Territory',
      zipLabel: 'Postcode',
      zipRegex: /^\d{4}$/,
      zipErrorMessage: 'Postcode must be 4 digits',
      zipPlaceholder: '2000',
      states: [
        'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland',
        'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
      ]
    }
  };
  
  // Reset state when country changes
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      state: '',
      zipCode: ''
    }));
  }, [formData.country]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Get current country data
  const getCurrentCountryData = () => {
    return countryData[formData.country] || countryData['United States'];
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    const currentCountryData = getCurrentCountryData();
    
    // Shipping info validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = `${currentCountryData.stateLabel} is required`;
    if (!formData.zipCode) {
      newErrors.zipCode = `${currentCountryData.zipLabel} is required`;
    } else if (!currentCountryData.zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = currentCountryData.zipErrorMessage;
    }
    
    // Payment info validation
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the order to a backend
      // For now, we'll just simulate a successful order
      
      // Show success message
      alert('Order placed successfully!');
      
      // Clear the cart
      clearCart();
      
      // Redirect to home page
      navigate('/');
    }
  };
  
  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Get current country data for display
  const currentCountryData = getCurrentCountryData();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`border rounded px-3 py-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`border rounded px-3 py-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`border rounded px-3 py-2 w-full ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="border rounded px-3 py-2 w-full"
                    >
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`border rounded px-3 py-2 w-full ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`border rounded px-3 py-2 w-full ${errors.city ? 'border-red-500' : ''}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">{currentCountryData.stateLabel}</label>
                    {currentCountryData.states.length > 0 ? (
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`border rounded px-3 py-2 w-full ${errors.state ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select {currentCountryData.stateLabel}</option>
                        {currentCountryData.states.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`border rounded px-3 py-2 w-full ${errors.state ? 'border-red-500' : ''}`}
                      />
                    )}
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">{currentCountryData.zipLabel}</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder={currentCountryData.zipPlaceholder}
                      className={`border rounded px-3 py-2 w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                    />
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`border rounded px-3 py-2 w-full ${errors.cardName ? 'border-red-500' : ''}`}
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setFormData({
                          ...formData,
                          cardNumber: formatted
                        });
                        if (errors.cardNumber) {
                          setErrors({
                            ...errors,
                            cardNumber: ''
                          });
                        }
                      }}
                      maxLength="19"
                      placeholder="XXXX XXXX XXXX XXXX"
                      className={`border rounded px-3 py-2 w-full ${errors.cardNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={`border rounded px-3 py-2 w-full ${errors.expiryDate ? 'border-red-500' : ''}`}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength="4"
                      className={`border rounded px-3 py-2 w-full ${errors.cvv ? 'border-red-500' : ''}`}
                    />
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700"
              >
                Place Order
              </button>
            </form>
          </div>
          
          <div className="lg:w-1/3">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 border-b">
                    <div className="flex">
                      <span className="font-medium mr-2">{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3 font-bold flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;