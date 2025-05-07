import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';

const Home = () => {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      image: '/images/wireless-headphones.jpg',
      description: 'Premium wireless headphones with noise cancellation'
    },
    {
      id: 2,
      name: 'Smart Coffee Maker',
      price: 149.99,
      image: '/images/smart-coffee-maker.jpg',
      description: 'App-controlled coffee maker with scheduling features'
    },
    {
      id: 3,
      name: 'Fitness Tracker',
      price: 79.99,
      image: '/images/fitness-tracker.jpg',
      description: 'Water-resistant fitness tracker with heart rate monitor'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section - Enhanced with gradients and better spacing */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 blur-3xl opacity-30"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300">
              Welcome to TechShop
            </h1>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Discover the latest tech gadgets and accessories at unbeatable prices.
              Elevate your digital lifestyle with our premium selection.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-teal-400 to-teal-500 text-gray-900 px-8 py-3 rounded-lg font-medium hover:shadow-lg hover:from-teal-500 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products - Improved card styling */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white">
            <span className="border-b-4 border-teal-400 pb-2">Featured Products</span>
          </h2>
          <Link
            to="/products"
            className="text-teal-400 font-medium hover:text-teal-300 flex items-center"
          >
            View All 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories Section - Improved with icons and hover effects */}
      <div className="container mx-auto px-4 py-16 bg-gray-900 bg-opacity-50">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
          <span className="border-b-4 border-teal-400 pb-2">Shop by Category</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 group">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-400 bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-xl mb-3 text-center text-teal-300">Audio</h3>
            <p className="text-gray-400 mb-6 text-center">Immersive headphones, powerful speakers, and crystal-clear sound devices</p>
            <div className="text-center">
              <Link 
                to="/products?category=audio" 
                className="inline-block text-teal-400 font-medium border-b border-transparent hover:border-teal-400 transition-all"
              >
                Browse Audio
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 group">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-400 bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-xl mb-3 text-center text-teal-300">Smart Home</h3>
            <p className="text-gray-400 mb-6 text-center">Transform your living space with intelligent devices that simplify your life</p>
            <div className="text-center">
              <Link 
                to="/products?category=smart-home" 
                className="inline-block text-teal-400 font-medium border-b border-transparent hover:border-teal-400 transition-all"
              >
                Browse Smart Home
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 group">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-400 bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-xl mb-3 text-center text-teal-300">Accessories</h3>
            <p className="text-gray-400 mb-6 text-center">Essential add-ons and enhancements to maximize your tech experience</p>
            <div className="text-center">
              <Link 
                to="/products?category=accessories" 
                className="inline-block text-teal-400 font-medium border-b border-transparent hover:border-teal-400 transition-all"
              >
                Browse Accessories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Improved with better visual design */}
      <div className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-blue-600/20"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="relative z-10 p-10 md:p-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
              <p className="text-gray-300 mb-8">
                Subscribe to our newsletter for the latest products, exclusive deals, and tech tips delivered to your inbox.
              </p>
              <form className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow p-3 border border-gray-700 rounded-lg bg-gray-800/80 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-400 to-teal-500 text-gray-900 py-3 px-6 rounded-lg font-medium hover:from-teal-500 hover:to-teal-600 transition-all duration-300 shadow-lg"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;