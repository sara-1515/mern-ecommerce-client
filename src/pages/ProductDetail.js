import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulating API call with sample data
    const fetchProduct = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        // All products data
        const allProducts = [
          {
            id: 1,
            name: 'Wireless Headphones',
            price: 99.99,
            image: '/images/wireless-headphones.jpg',
            category: 'audio',
            description: 'Premium wireless headphones with noise cancellation',
            features: [
              'Active noise cancellation',
              '30-hour battery life',
              'Comfortable over-ear design',
              'Built-in microphone for calls',
              'Bluetooth 5.0 connectivity'
            ],
            specs: {
              brand: 'TechSonic',
              model: 'HS-200',
              weight: '250g',
              connectivity: 'Bluetooth 5.0',
              battery: '500mAh'
            },
            stock: 15
          },
          {
            id: 2,
            name: 'Smart Coffee Maker',
            price: 149.99,
            image: '/images/coffeemaker.jpg',
            category: 'smart-home',
            description: 'App-controlled coffee maker with scheduling features',
            features: [
              'Smartphone app control',
              'Programmable brewing schedule',
              '12-cup capacity',
              'Keep warm function',
              'Reusable filter included'
            ],
            specs: {
              brand: 'HomeConnect',
              model: 'SC-100',
              capacity: '12 cups',
              power: '1000W',
              dimensions: '10" x 8" x 14"'
            },
            stock: 8
          },
          {
            id: 3,
            name: 'Fitness Tracker',
            price: 79.99,
            image: '/images/fitnesstracker.jpg',
            category: 'wearables',
            description: 'Water-resistant fitness tracker with heart rate monitor',
            features: [
              'Heart rate monitoring',
              'Sleep tracking',
              'Water resistance up to 50m',
              '7-day battery life',
              'Smartphone notifications'
            ],
            specs: {
              brand: 'FitTech',
              model: 'FT-300',
              display: '0.95" AMOLED',
              battery: '180mAh',
              sensors: 'Heart rate, accelerometer, gyroscope'
            },
            stock: 20
          },
          {
            id: 4,
            name: 'Ergonomic Office Chair',
            price: 249.99,
            image: '/images/officechair.jpg',
            category: 'office',
            description: 'Adjustable office chair with lumbar support',
            features: [
              'Adjustable height and armrests',
              'Lumbar support cushion',
              'Breathable mesh back',
              '360° swivel',
              'Heavy-duty base'
            ],
            specs: {
              brand: 'OfficeComfort',
              model: 'OC-500',
              material: 'Mesh and high-density foam',
              weight: '30 lbs',
              maxWeight: '300 lbs'
            },
            stock: 5
          },
          {
            id: 5,
            name: 'Smart Water Bottle',
            price: 45.99,
            image: '/images/waterbottle.jpg',
            category: 'accessories',
            description: 'Tracks water intake and reminds you to stay hydrated',
            features: [
              'Hydration tracking',
              'LED reminder lights',
              'Companion smartphone app',
              'BPA-free materials',
              '24 oz capacity'
            ],
            specs: {
              brand: 'HydroTech',
              model: 'HT-100',
              capacity: '24 oz',
              battery: 'CR2032 (replaceable)',
              material: 'Stainless steel and BPA-free plastic'
            },
            stock: 12
          },
          {
            id: 6,
            name: '4K Smart TV',
            price: 499.99,
            image: '/images/smarttv.jpg',
            category: 'entertainment',
            description: '50-inch 4K smart TV with built-in streaming apps',
            features: [
              '4K Ultra HD resolution',
              'HDR support',
              'Built-in streaming apps',
              'Voice control',
              'Multiple HDMI ports'
            ],
            specs: {
              brand: 'VisionTech',
              model: 'VT-500',
              size: '50 inches',
              resolution: '3840 x 2160',
              connectivity: 'Wi-Fi, Bluetooth, 3x HDMI, 2x USB'
            },
            stock: 3
          }
        ];
        
        // Find the requested product
        const foundProduct = allProducts.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Find related products (same category, excluding current product)
          const related = allProducts
            .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 3);
          
          setRelatedProducts(related);
        }
        
        setIsLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value)));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-md">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500">
          <ol className="flex flex-wrap">
            <li className="flex items-center">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/products" className="hover:text-blue-600">Products</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800">{product.name}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full h-auto max-h-96 object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <span className="ml-2 text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-3 py-1 rounded-l-md"
              >
                -
              </button>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                max={product.stock} 
                value={quantity} 
                onChange={handleQuantityChange}
                className="w-16 text-center border-t border-b border-gray-300 py-1"
              />
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="bg-gray-200 px-3 py-1 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 px-6 rounded-md font-medium mb-4 ${
              product.stock > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Product Features */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-medium w-32 capitalize">{key}:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="bg-gray-100 p-4 flex items-center justify-center h-48">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                    <p className="text-blue-600 font-bold">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;