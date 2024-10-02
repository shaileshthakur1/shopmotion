/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ShoppingCart } from 'lucide-react'

// Products data
const products = [
  { 
    id: 1, 
    name: 'Classic Watch', 
    price: 199.99, 
    images: [
      '/images/products/classic-watch1.png', 
      '/images/products/classic-watch2.png',
      '/images/products/classic-watch3.png',
    ] 
  },
  { 
    id: 2, 
    name: 'Leather Bag', 
    price: 149.99, 
    images: [
      '/images/products/leatherbag1.png', 
      '/images/products/leatherbag2.png',
      '/images/products/leatherbag3.png',
    ] 
  },
  { 
    id: 3, 
    name: 'Sunglasses', 
    price: 89.99, 
    images: [
      '/images/products/sunglass1.png', 
      '/images/products/sunglass2.png', 
      '/images/products/sunglass3.png'
    ] 
  },
  { 
    id: 4, 
    name: 'Sneakers', 
    price: 129.99, 
    images: [
      '/images/products/sneakers1.png', 
      '/images/products/sneakers2.png', 
      '/images/products/sneakers3.png', 
    ] 
  },
  { 
    id: 5, 
    name: 'Headphones', 
    price: 199.99, 
    images: [
      '/images/products/headphones1.png', 
      '/images/products/headphones2.png', 
      '/images/products/headphones3.png'
    ]
  },
  { 
    id: 6, 
    name: 'Smartphone', 
    price: 699.99, 
    images: [
      '/images/products/smartphone3.png', 
      '/images/products/smartphone1.png', 
      '/images/products/smartphone2.png'
    ] 
  },
  { 
    id: 7, 
    name: 'Laptop', 
    price: 999.99, 
    images: [
      '/images/products/laptop1.png', 
      '/images/products/laptop2.png', 
      '/images/products/laptop3.png', 
    ] 
  },
  { 
    id: 8, 
    name: 'Tablet', 
    price: 349.99, 
    images: [
      '/images/products/tablet1.png', 
      '/images/products/tablet2.png', 
      '/images/products/tablet3.png', 
    ] 
  },
  { 
    id: 9, 
    name: 'Smart Watch', 
    price: 249.99, 
    images: [
      '/images/products/smartwatch1.png', 
      '/images/products/smartwatch2.png', 
      '/images/products/smartwatch3.png', 
    ] 
  }
];

export default function AnimatedProductGrid() {
  interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
  }

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [showTick, setShowTick] = useState(false);

  const openProductView = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeProductView = () => {
    setSelectedProduct(null);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
      );
    }
  };

  const addToCart = () => {
    setCartItems((prevItems) => prevItems + 1);
    setShowTick(true);
    // Reset showTick after 1 second
    setTimeout(() => setShowTick(false), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-gray-500 font-bold">Product Catalog</h1>
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-500" />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems}
            </span>
          )}
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => openProductView(product)}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={product.images[0]} alt={product.name} className="flex justify-center w-180% h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-900">${product.price.toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-full max-w-3xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={closeProductView}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative">
                  <img
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
                  <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                  <p className="text-gray-600 text-lg mb-4">${selectedProduct.price.toFixed(2)}</p>
                  <p className="text-gray-700 mb-6 font-bold">
                    Bestsellers, get it now !
                  </p>
                  <button
                    className="bg-blue-600 text-white px-5 py-1 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md flex items-center space-x-2"
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: showTick ? 1 : 0, y: showTick ? 0 : 20 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span>✅ Item added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
