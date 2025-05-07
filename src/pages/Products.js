import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { Sliders, Search, Grid, List, SortDesc } from 'lucide-react';

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  // Fetch products
  useEffect(() => {
    // Simulating API call with sample data
    const fetchProducts = () => {
      setIsLoading(true);
      setTimeout(() => {
        const sampleProducts = [
          {
            id: 1,
            name: 'Wireless Headphones',
            price: 99.99,
            image: 'images/wireless-headphones.jpg',
            category: 'audio',
            description: 'Premium wireless headphones with noise cancellation',
            rating: 4.5,
            stock: 23
          },
          {
            id: 2,
            name: 'Smart Coffee Maker',
            price: 149.99,
            image: '/images/smart-coffee-maker.jpg',
            category: 'smart-home',
            description: 'App-controlled coffee maker with scheduling features',
            rating: 4.2,
            stock: 15
          },
          {
            id: 3,
            name: 'Fitness Tracker',
            price: 79.99,
            image: '/images/fitness-tracker.jpg',
            category: 'wearables',
            description: 'Water-resistant fitness tracker with heart rate monitor',
            rating: 4.7,
            stock: 42
          },
          {
            id: 4,
            name: 'Ergonomic Office Chair',
            price: 249.99,
            image: '/images/office-chair.jpg',
            category: 'office',
            description: 'Adjustable office chair with lumbar support',
            rating: 4.1,
            stock: 8
          },
          {
            id: 5,
            name: 'Smart Water Bottle',
            price: 45.99,
            image: '/images/smart-water-bottle.jpg',
            category: 'accessories',
            description: 'Tracks water intake and reminds you to stay hydrated',
            rating: 3.9,
            stock: 31
          },
          {
            id: 6,
            name: '4K Smart TV',
            price: 499.99,
            image: '/images/Smart-tv.jpg',
            category: 'entertainment',
            description: '50-inch 4K smart TV with built-in streaming apps',
            rating: 4.8,
            stock: 5
          },
          {
            id: 7,
            name: 'Bluetooth Speaker',
            price: 59.99,
            image: '/images/Bluetooth-Speaker.jpeg',
            category: 'audio',
            description: 'Waterproof portable speaker with 24-hour battery life',
            rating: 4.3,
            stock: 19
          },
          {
            id: 8,
            name: 'Mechanical Gaming Keyboard',
            price: 129.99,
            image: '/images/Mechanical-Gaming-Keyboard.jpeg',
            category: 'gaming',
            description: 'RGB mechanical keyboard with customizable keys and macro support',
            rating: 4.6,
            stock: 12
          },
          {
            id: 9,
            name: 'Smart Security Camera',
            price: 89.99,
            image: '/images/Smart-Security-Camera.jpeg',
            category: 'smart-home',
            description: '1080p wireless security camera with motion detection and night vision',
            rating: 4.0,
            stock: 27
          },
          {
            id: 10,
            name: 'Wireless Charging Pad',
            price: 34.99,
            image: '/images/Wireless-Charging-Pad.jpeg',
            category: 'accessories',
            description: 'Fast wireless charger compatible with all Qi-enabled devices',
            rating: 4.2,
            stock: 38
          },
          {
            id: 11,
            name: 'Ultra-Wide Gaming Monitor',
            price: 349.99,
            image: '/images/Ultra-Wide-Gaming-Monitor.jpeg',
            category: 'gaming',
            description: '34-inch curved ultra-wide monitor with 144Hz refresh rate',
            rating: 4.8,
            stock: 7
          },
          {
            id: 12,
            name: 'Noise-Cancelling Earbuds',
            price: 149.99,
            image: '/images/Noise-Cancelling-Earbuds.jpeg',
            category: 'audio',
            description: 'True wireless earbuds with active noise cancellation and touch controls',
            rating: 4.4,
            stock: 21
          },
          {
            id: 13,
            name: 'Smart Thermostat',
            price: 119.99,
            image: '/images/Smart-Thermostat.jpeg',
            category: 'smart-home',
            description: 'Wi-Fi connected thermostat that learns your preferences and saves energy',
            rating: 4.7,
            stock: 13
          },
          {
            id: 14,
            name: 'Portable SSD Drive',
            price: 129.99,
            image: '/images/Portable-SSD-Drive.jpeg',
            category: 'storage',
            description: '1TB portable SSD with USB-C connectivity and 1050MB/s transfer speeds',
            rating: 4.5,
            stock: 16
          },
          {
            id: 15,
            name: 'Ergonomic Vertical Mouse',
            price: 49.99,
            image: '/images/Ergonomic-Vertical-Mouse.jpeg',
            category: 'accessories',
            description: 'Wireless vertical mouse designed to reduce wrist strain',
            rating: 4.1,
            stock: 24
          },
          {
            id: 16,
            name: 'Smart Light Bulb Kit',
            price: 79.99,
            image: '/images/Smart-Light-Bulb-Kit.jpeg',
            category: 'smart-home',
            description: 'Set of 4 color-changing smart bulbs with voice control support',
            rating: 4.3,
            stock: 32
          }
        ];

        setProducts(sampleProducts);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(sampleProducts.map(p => p.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      }, 500);
    };

    fetchProducts();
  }, []);

  // Apply filters when products, selectedCategory, priceRange, sortBy, or searchQuery changes
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Filter by price range
      filtered = filtered.filter(
        product => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Sort products
      if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'rating-desc') {
        filtered.sort((a, b) => b.rating - a.rating);
      }
      
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseFloat(e.target.value);
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Render different product layouts based on view mode
  const renderProducts = () => {
    if (filteredProducts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found matching your criteria.</p>
        </div>
      );
    }

    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="flex border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-32 h-32 bg-gray-100 p-2">
                <img src={product.image || "/images/placeholder.jpg"} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 p-4">
                <h3 className="text-lg font-medium text-blue-600">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
                </div>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-bold text-blue-700">${product.price.toFixed(2)}</p>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Discover Our Products</h1>
          <button 
            onClick={toggleMobileFilters} 
            className="md:hidden flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Sliders size={18} className="mr-1" />
            Filters
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <Search size={20} className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Mobile */}
          <div className={`lg:hidden fixed inset-0 z-40 bg-white transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={toggleMobileFilters} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Mobile Filters Content */}
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-bold mb-4 text-lg border-b pb-2">Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="mobile-category-all" 
                      name="mobile-category" 
                      checked={selectedCategory === 'all'} 
                      onChange={() => handleCategoryChange('all')}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="mobile-category-all" className="text-lg">All Categories</label>
                  </div>
                  {categories.map(category => (
                    <div key={`mobile-${category}`} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`mobile-category-${category}`} 
                        name="mobile-category" 
                        checked={selectedCategory === category} 
                        onChange={() => handleCategoryChange(category)}
                        className="mr-3 h-4 w-4 text-blue-600"
                      />
                      <label htmlFor={`mobile-category-${category}`} className="capitalize text-lg">
                        {category.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-8">
                <h3 className="font-bold mb-4 text-lg border-b pb-2">Price Range</h3>
                <div className="px-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <span className="font-medium text-gray-800">${priceRange[0]}</span>
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <span className="font-medium text-gray-800">${priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      step="10" 
                      value={priceRange[0]} 
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      step="10" 
                      value={priceRange[1]} 
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={toggleMobileFilters}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Backdrop for mobile filters */}
          {showMobileFilters && (
            <div 
              className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
              onClick={toggleMobileFilters}
            ></div>
          )}
          
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-blue-800 border-b border-gray-200 pb-3">Refine Results</h2>
              
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-bold mb-4 text-gray-700">Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="category-all" 
                      name="category" 
                      checked={selectedCategory === 'all'} 
                      onChange={() => handleCategoryChange('all')}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="category-all" className="text-gray-700 hover:text-blue-600 cursor-pointer">All Categories</label>
                  </div>
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input 
                        type="radio" 
                        id={`category-${category}`} 
                        name="category" 
                        checked={selectedCategory === category} 
                        onChange={() => handleCategoryChange(category)}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${category}`} className="capitalize text-gray-700 hover:text-blue-600 cursor-pointer">
                        {category.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-bold mb-4 text-gray-700">Price Range</h3>
                <div className="px-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-100 px-3 py-1 rounded-md">
                      <span className="font-medium text-gray-800">${priceRange[0]}</span>
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="bg-gray-100 px-3 py-1 rounded-md">
                      <span className="font-medium text-gray-800">${priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      step="10" 
                      value={priceRange[0]} 
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      step="10" 
                      value={priceRange[1]} 
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort Controls */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-wrap justify-between items-center gap-3">
              <p className="text-gray-600 font-medium">
                <span className="text-blue-600 font-bold">{filteredProducts.length}</span> products found
              </p>
              
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <div className="flex items-center">
                  <SortDesc size={16} className="text-gray-500 mr-2" />
                  <select 
                    id="sort" 
                    value={sortBy} 
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="default">Default Sorting</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="rating-desc">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          
            {/* Product Display */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              {renderProducts()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;