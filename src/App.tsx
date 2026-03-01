import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  MapPin, 
  Phone, 
  Star, 
  Plus, 
  Minus, 
  X, 
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Shield,
  Droplets,
  Github
} from 'lucide-react';
import { JUICES, SHOP_DETAILS, REVIEWS } from './constants';
import { Juice, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Address & Order State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [pendingOrder, setPendingOrder] = useState<{type: 'single' | 'cart', item?: Juice} | null>(null);
  
  // Reviews Carousel State
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const addToCart = (juice: Juice) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === juice.id);
      if (existing) {
        return prev.map(item => 
          item.id === juice.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...juice, quantity: 1 }];
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatWhatsAppMessage = (items: CartItem[], total: number, address: string) => {
    const greeting = "Hello Juice Stop! I would like to place an order:\n\n";
    const details = items.map(item => `- ${item.name} (x${item.quantity}): Rs. ${item.price * item.quantity}`).join('\n');
    const footer = `\n\nDelivery Address: ${address}\n\nTotal Price: Rs. ${total}\n\nPlease confirm my order. Thanks!`;
    return encodeURIComponent(greeting + details + footer);
  };

  const handleOrderNow = (juice: Juice) => {
    setPendingOrder({ type: 'single', item: juice });
    setIsAddressModalOpen(true);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setPendingOrder({ type: 'cart' });
    setIsCartOpen(false); // Close cart so it doesn't overlap the modal
    setIsAddressModalOpen(true);
  };

  const confirmOrderAndSendWa = () => {
    if (!userAddress.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    let message = "";
    if (pendingOrder?.type === 'single' && pendingOrder.item) {
      const juice = pendingOrder.item;
      message = encodeURIComponent(`Hello Juice Stop! I would like to order 1 ${juice.name} for Rs. ${juice.price}.\n\nDelivery Address: ${userAddress}\n\nPlease confirm. Thanks!`);
    } else if (pendingOrder?.type === 'cart') {
      message = formatWhatsAppMessage(cart, totalPrice, userAddress);
      setCart([]); // Clear cart after checkout
      setIsCartOpen(false);
    }
    
    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${message}`, '_blank');
    
    setIsAddressModalOpen(false);
    setPendingOrder(null);
    setUserAddress("");
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#151515]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#e20a16] rounded-full flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(226,10,22,0.5)]">JS</div>
            <h1 className="text-2xl font-black tracking-tighter text-white italic uppercase">JUICE STOP</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-stone-400">
            <a href="#philosophy" className="hover:text-white transition-colors">Our Story</a>
            <a href="#products" className="hover:text-white transition-colors">Menu</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#location" className="hover:text-white transition-colors">Find Us</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="https://github.com/dani-hacker/Juice-Stop/archive/refs/heads/main.zip" className="flex items-center gap-2 text-sm font-bold tracking-widest text-stone-400 hover:text-white transition-colors uppercase">
              <Github size={20} />
              <span className="hidden sm:inline">Source Code</span>
            </a>
            <a href={`tel:${SHOP_DETAILS.phone}`} className="hidden sm:flex items-center gap-2 text-sm font-bold tracking-widest text-[#e20a16] hover:text-white transition-colors uppercase">
              <Phone size={18} />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[#151515] overflow-hidden">
        
        {/* Full Desktop & Mobile Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {/* 
              By setting the image to double width and pushing it right, 
              we crop the original text out of bounds on the left, but we keep the element 
              spanning the full width behind everything as a background!
            */}
            <img 
              src="/hero-new.png" 
              alt="Hero Background"
              className="w-[200%] sm:w-[150%] max-w-[200%] h-full object-cover object-right absolute right-0 opacity-80"
            />
            {/* Gradient overlay to ensure text stays legible on the left */}
            <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-gradient-to-r from-[#151515] via-[#151515]/80 to-transparent z-10"></div>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between relative z-10 py-20 md:py-0">
          
          {/* Typography & CTA (Now sitting on top of the bg) */}
          <div className="w-full md:w-[60%] flex flex-col justify-center text-left space-y-8 pr-0 md:pr-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[4rem] sm:text-[5rem] lg:text-[5.5rem] xl:text-[7rem] leading-[0.95] font-black uppercase tracking-tight italic"
            >
              <span className="text-white block drop-shadow-lg">FRESHNESS IN</span>
              <span className="text-[#e20a16] block tracking-tighter drop-shadow-lg">EVERY SIP</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-stone-300 text-lg sm:text-xl max-w-lg font-medium leading-relaxed drop-shadow-md"
            >
              Experience the vibrant taste of nature with our 100% natural, freshly squeezed juices. 
              Handcrafted daily in the heart of Rawalpindi.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a 
                href="#products"
                className="inline-flex items-center gap-2 bg-[#e20a16] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b00710] shadow-xl transition-all"
              >
                Explore Flavors <ArrowRight size={20} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    {/* Our Philosophy (About Us) Section */}
    <section id="philosophy" className="bg-stone-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-8"
          >
            <div>
              <span className="text-red-600 font-bold uppercase tracking-widest text-sm block mb-2">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-stone-900">
                NOTHING BUT <span className="text-red-600">NATURE</span>
              </h2>
            </div>
            
            <p className="text-stone-600 text-lg leading-relaxed">
              At Juice Stop, we believe that the best flavors come straight from the earth. That's why we source only the freshest, locally-grown fruits for our beverages. 
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              No artificial colors. No preservatives. No added water. Just pure, unadulterated juice pressed to perfection so you can taste the difference in every single drop.
            </p>
            
            <div className="pt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-red-600" size={24} />
                <span className="font-bold text-stone-800">100% Raw</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-red-600" size={24} />
                <span className="font-bold text-stone-800">Never Heated</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=1000" 
                alt="Fresh citrus fruits being squeezed"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/40 to-transparent"></div>
            </div>
            {/* Floating accent block */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-stone-100 hidden md:block">
              <div className="font-black text-4xl text-red-600 italic">100%</div>
              <div className="text-stone-800 font-bold uppercase tracking-wider text-sm">Natural Ingredients</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Products Section */}
    <section id="products" className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Our Menu</span>
            <h2 className="text-4xl font-black tracking-tight">VIBRANT FLAVORS</h2>
          </div>
          <p className="text-stone-500 max-w-md">
            Choose from our wide selection of seasonal and classic fruit juices. 
            All juices are made to order with no added preservatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {JUICES.map((juice) => (
            <motion.div 
              key={juice.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={juice.image} 
                  alt={juice.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-stone-900">
                  Rs. {juice.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-2 ${juice.color}`}>{juice.name}</h3>
                <p className="text-stone-500 text-sm mb-6">{juice.description}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleOrderNow(juice)}
                    className="flex-1 bg-stone-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Order Now
                  </button>
                  <button 
                    onClick={() => addToCart(juice)}
                    className="w-14 h-12 flex items-center justify-center border-2 border-stone-900 rounded-xl text-stone-900 hover:bg-stone-900 hover:text-white transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Fresh Difference (Benefits) Section */}
      <section className="bg-[#1a1a1a] py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight mb-4 italic uppercase">THE FRESH DIFFERENCE</h2>
            <div className="w-24 h-1 bg-[#e20a16] mx-auto rounded-full"></div>
            <p className="text-stone-400 max-w-2xl mx-auto mt-6 text-lg">
              Choosing real over processed isn't just a preference—it's a lifestyle. Here is why our juices stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#151515] p-8 rounded-3xl border border-white/5 text-center transition-all group hover:border-[#e20a16]/30"
            >
              <div className="w-16 h-16 bg-[#e20a16]/10 text-[#e20a16] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Leaf size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">100% Organic</h3>
              <p className="text-stone-400">
                Pesticide-free fruits sourced directly from verified local farms to ensure the highest quality and safety.
              </p>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#151515] p-8 rounded-3xl border border-white/5 text-center transition-all group hover:border-[#e20a16]/30"
            >
              <div className="w-16 h-16 bg-[#e20a16]/10 text-[#e20a16] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Immunity Boost</h3>
              <p className="text-stone-400">
                Packed with essential vitamins, minerals, and antioxidants that actively fortify your body's natural defenses.
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#151515] p-8 rounded-3xl border border-white/5 text-center transition-all group hover:border-[#e20a16]/30"
            >
              <div className="w-16 h-16 bg-[#e20a16]/10 text-[#e20a16] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Droplets size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Cold-Pressed</h3>
              <p className="text-stone-400">
                Extracted using high pressure rather than heat, retaining maximum flavor profiles and essential nutrients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-[#151515] h-[90vh] flex flex-col justify-center overflow-hidden relative">
        <div className="max-w-5xl mx-auto w-full px-4 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 italic uppercase">WHAT OUR CUSTOMERS SAY</h2>
            <div className="w-24 h-1 bg-[#e20a16] mx-auto rounded-full"></div>
          </div>
          
          {/* Main Review Card Container */}
          <div className="relative bg-[#1a1a1a] rounded-3xl border border-white/5 shadow-2xl p-8 md:p-16 text-center max-w-4xl mx-auto backdrop-blur-sm overflow-hidden min-h-[250px] flex flex-col justify-center">
            
            {/* Subtle radial glow matching the reference concept but in red */}
            <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#e20a16]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#e20a16]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="flex justify-center gap-1 text-yellow-500 mb-8">
                  {[...Array(REVIEWS[currentReview].rating)].map((_, j) => <Star key={j} fill="currentColor" size={24} />)}
                </div>
                
                <p className="text-[18px] text-white font-medium mb-5 leading-relaxed italic">
                  "{REVIEWS[currentReview].comment}"
                </p>
                
                <div>
                  <h4 className="font-bold text-xl text-white mb-2">{REVIEWS[currentReview].name}</h4>
                  <span className="text-sm text-stone-500 uppercase tracking-widest font-semibold">Verified Customer • {REVIEWS[currentReview].date}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center mt-12 gap-8">
            {/* Arrows */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={prevReview}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#151515] hover:scale-110 active:scale-95 transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextReview}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#151515] hover:scale-110 active:scale-95 transition-all"
                aria-label="Next review"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReview(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentReview 
                      ? 'w-10 h-3 bg-[#e20a16]' 
                      : 'w-3 h-3 bg-white/20 hover:bg-white/50'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-stone-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
          <div className="p-12 lg:p-20 flex-1">
            <h2 className="text-4xl font-black text-white mb-8 italic tracking-tighter">VISIT THE STOP</h2>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Address</h4>
                  <p className="text-stone-400 leading-relaxed">
                    {SHOP_DETAILS.address}<br />
                    <span className="text-red-500 font-medium">{SHOP_DETAILS.location}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">Contact</h4>
                  <p className="text-stone-400">{SHOP_DETAILS.phone}</p>
                  <p className="text-stone-400">Open Daily: 10:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP_DETAILS.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-stone-200 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 h-[400px] lg:h-auto relative">
            <img 
              src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqcr1inMvCG0eMvw88Gkpgeungld84ZNgxLnUb2oF_AZAFrSQnoZlsNoftziMv-HeqNZWcF0mK9ixk8NIF17yLz1ASDIr2xerPcT5ZDuJfFhRWat4u6_IlTZyslAQWusYk4Lxa959-GJig=s483-k-no" 
              alt="Shop Interior"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">JS</div>
            <span className="text-xl font-black tracking-tighter text-red-600 italic">JUICE STOP</span>
          </div>
          <p className="text-stone-400 text-sm">© 2024 Juice Stop Rawalpindi. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold"
            >
              <CheckCircle2 size={16} />
              Added to Cart!
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 transition-all hover:scale-110 active:scale-95"
        >
          <ShoppingCart size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-red-600" />
                  <h2 className="text-xl font-black italic tracking-tight">YOUR CART</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-400">
                    <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-red-600 font-bold hover:underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-600">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-stone-500 mb-3">Rs. {item.price}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-stone-100 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-stone-100 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-bold ml-auto">Rs. {item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-100 bg-stone-50">
                  <div className="flex justify-between mb-4">
                    <span className="text-stone-500 font-medium">Subtotal</span>
                    <span className="text-xl font-black tracking-tight">Rs. {totalPrice}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                  >
                    Checkout via WhatsApp <ArrowRight size={20} />
                  </button>
                  <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-widest font-bold">
                    Secure Order • Fast Delivery
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Address Modal */}
      <AnimatePresence>
        {isAddressModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressModalOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                <h3 className="text-xl font-black italic tracking-tight">DELIVERY DETAILS</h3>
                <button 
                  onClick={() => setIsAddressModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-stone-400 hover:text-red-600 shadow-sm transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <label className="block text-sm font-bold text-stone-700 mb-2">Please enter your full delivery address:</label>
                <textarea 
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="Street, House No, Society, City..."
                  className="w-full border-2 border-stone-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all resize-none"
                />
              </div>
              <div className="p-6 border-t border-stone-100 bg-stone-50 flex gap-3">
                <button 
                  onClick={() => setIsAddressModalOpen(false)}
                  className="flex-1 py-3 text-stone-600 font-bold hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmOrderAndSendWa}
                  disabled={!userAddress.trim()}
                  className="flex-[2] bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  Confirm Order <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
