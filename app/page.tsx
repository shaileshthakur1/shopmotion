/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, ShoppingBag, Zap, Shield } from 'lucide-react'
import AnimatedProductGrid from './productGrid/page'

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full"
    >
      <Icon className="w-10 h-10 md:w-12 md:h-12 text-blue-500 mb-4 mx-auto" />
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-sm md:text-base text-center">{description}</p>
    </motion.div>
  )
}

export default function AnimatedLandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 md:px-6 py-3">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-xl md:text-2xl font-bold text-blue-600"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              ShopMotion
            </motion.h1>
            <motion.ul
              className="flex space-x-2 md:space-x-4 text-sm md:text-base"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <motion.li variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                <a href="#home" className="text-gray-600 hover:text-blue-500 transition-colors">Home</a>
              </motion.li>
              <motion.li variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">Features</a>
              </motion.li>
              <motion.li variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                <a href="#products" className="text-gray-600 hover:text-blue-500 transition-colors">Products</a>
              </motion.li>
            </motion.ul>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome 
              <span className="inline-block sm:inline">to Shop</span>
  <span className="block sm:inline">Motion</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Experience shopping like never before with our animated product catalog.
            </motion.p>
            <motion.a
              href="#products"
              className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Products
            </motion.a>
          </div>
          <motion.div
            className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
              transition: { duration: 1.5, repeat: Infinity }
            }}
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </motion.div>
        </section>

        <section id="features" className="py-10 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-500 mb-8 md:mb-12">Our Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-gray-400">
              <FeatureCard
                icon={ShoppingBag}
                title="Easy Shopping"
                description="Browse through our wide range of products with our intuitive interface."
              />
              <FeatureCard
                icon={Zap}
                title="Fast Delivery"
                description="Get your products delivered to your doorstep in record time."
              />
              <FeatureCard
                icon={Shield}
                title="Secure Payments"
                description="Shop with confidence using our secure payment gateway."
              />
            </div>
          </div>
        </section>

        <section id="products" className="py-10 md:py-20 text-gray-400">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-500 mb-8 md:mb-12">Our Products</h2>
            <AnimatedProductGrid />
          </div>
        </section>

        <section id="newsletter" className="py-10 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8">Stay updated with our latest products and offers.</p>
            <form className="max-w-sm md:max-w-md mx-auto flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-t-lg md:rounded-l-lg md:rounded-t-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              />
              <button
                type="submit"
                className="bg-blue-800 px-4 py-2 md:px-6 md:py-2 rounded-b-lg md:rounded-r-lg md:rounded-b-none font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">ShopMotion</h3>
              <p className="text-gray-400">Your one-stop shop for all things animated.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="text-gray-400">
                <li>Email: info@shopmotion.com</li>
                <li>Phone: +123 456 789</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-6">&copy; 2024 ShopMotion. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
