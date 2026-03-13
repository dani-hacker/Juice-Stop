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
  Menu,
  Leaf,
  Shield,
  Droplets,
  Github
} from 'lucide-react';
import { JUICES, SHOP_DETAILS, REVIEWS } from './constants';
import { Juice, CartItem, JuiceVariant } from './types';
import { MenuPage } from './components/MenuPage';
import { VariantModal } from './components/VariantModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu'>('home');
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [variantModalJuice, setVariantModalJuice] = useState<Juice | null>(null);
  const [isOrderingNow, setIsOrderingNow] = useState(false);
  const [randomSingleJuices, setRandomSingleJuices] = useState<Juice[]>([]);
  const groupedJuices = JUICES.filter(j => j.flavors && j.flavors.length > 0);

  useEffect(() => {
    const singles = JUICES.filter(j => !j.flavors || j.flavors.length === 0);
    const shuffled = [...singles].sort(() => 0.5 - Math.random());
    setRandomSingleJuices(shuffled.slice(0, 8));
  }, []);

  // Address & Order State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [pendingOrder, setPendingOrder] = useState<{type: 'single' | 'cart', item?: Juice, variantName?: string, flavor?: string} | null>(null);
  
  // Reviews Carousel State
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const addToCart = (juice: Juice, variant?: JuiceVariant, flavor?: string) => {
    if ((juice.variants && !variant) || (juice.flavors && !flavor)) {
      setIsOrderingNow(false);
      setVariantModalJuice(juice);
      return;
    }

    const price = variant ? variant.price : (juice.price || 0);
    const variantName = variant ? variant.name : undefined;
    const cartItemId = `${juice.id}-${variantName || 'default'}-${flavor || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...juice, cartItemId, price, variantName, flavor, quantity: 1 }];
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatWhatsAppMessage = (items: CartItem[], total: number, name: string, address: string) => {
    const greeting = "*Hello Juice Stop! I would like to place an order:*\n\n";

    const details = items.map(item => {
      const variantText = [item.flavor, item.variantName].filter(Boolean).join(' - ');
      const variantSuffix = variantText ? ` (${variantText})` : '';
      return `• *${item.name}${variantSuffix} (x${item.quantity}):* Rs. ${item.price * item.quantity}`;
    }).join('\n');
    const footer = `\n\n*Name:* ${name}\n*Delivery Address:*\n${address}\n\n*Total Price:* Rs. ${total}\n\nPlease confirm my order. Thanks!`;
    return encodeURIComponent(greeting + details + footer);
  };

  const handleOrderNow = (juice: Juice, variant?: JuiceVariant, flavor?: string) => {
    if ((juice.variants && !variant) || (juice.flavors && !flavor)) {
      setIsOrderingNow(true);
      setVariantModalJuice(juice);
      return;
    }
    const price = variant ? variant.price : (juice.price || 0);
    const variantName = variant ? variant.name : undefined;
    
    setPendingOrder({ type: 'single', item: { ...juice, price } as unknown as CartItem, variantName, flavor });
    setIsAddressModalOpen(true);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setPendingOrder({ type: 'cart' });
    setIsCartOpen(false); // Close cart so it doesn't overlap the modal
    setIsAddressModalOpen(true);
  };

  const confirmOrderAndSendWa = () => {
    if (!userName.trim() || !userAddress.trim()) {
      alert("Please enter your name and delivery address.");
      return;
    }

    let message = "";
    if (pendingOrder?.type === 'single' && pendingOrder.item) {
      const juice = pendingOrder.item;
      const variantText = [pendingOrder.flavor, pendingOrder.variantName].filter(Boolean).join(' - ');
      const variantSuffix = variantText ? ` (${variantText})` : '';
      message = encodeURIComponent(`*Hello Juice Stop! I would like to order:*\n\n• *1x ${juice.name}${variantSuffix}:* Rs. ${juice.price}\n\n*Name:* ${userName}\n*Delivery Address:*\n${userAddress}\n\nPlease confirm. Thanks!`);
    } else if (pendingOrder?.type === 'cart') {
      message = formatWhatsAppMessage(cart, totalPrice, userName, userAddress);
      setCart([]); // Clear cart after checkout
      setIsCartOpen(false);
    }
    
    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${message}`, '_blank');
    
    setIsAddressModalOpen(false);
    setPendingOrder(null);
    setUserName("");
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
            <img src="/logo.webp" alt="Juice Stop Logo" className="h-[40px] md:h-12 w-auto object-contain" />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white italic uppercase">JUICE STOP</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-stone-400">
            <button onClick={() => setCurrentPage('home')} className={`transition-colors uppercase tracking-widest font-bold ${currentPage === 'home' ? 'text-white' : 'hover:text-white'}`}>Home</button>
            <button onClick={() => { setMenuInitialCategory('All'); setCurrentPage('menu'); }} className={`transition-colors uppercase tracking-widest font-bold ${currentPage === 'menu' ? 'text-white' : 'hover:text-white'}`}>Menu</button>
            {currentPage === 'home' && (
              <>
                <a href="#philosophy" className="hover:text-white transition-colors">Our Story</a>
                <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
              </>
            )}
            <a href="#location" className="hover:text-white transition-colors">Find Us</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href={`tel:${SHOP_DETAILS.phone}`} className="hidden sm:flex items-center gap-2 text-sm font-bold tracking-widest text-[#e20a16] hover:text-white transition-colors uppercase">
              <Phone size={18} />
              <span>Call Us</span>
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-red-500 transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-[#151515] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
            >
              <div className="h-20 border-b border-white/10 flex items-center justify-between px-6">
                <span className="text-xl font-black tracking-tighter text-white italic uppercase">MENU</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
                <button 
                  onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} 
                  className={`text-left text-lg font-bold uppercase tracking-widest transition-colors ${currentPage === 'home' ? 'text-red-500' : 'text-stone-300 hover:text-white'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => { setMenuInitialCategory('All'); setCurrentPage('menu'); setIsMobileMenuOpen(false); }} 
                  className={`text-left text-lg font-bold uppercase tracking-widest transition-colors ${currentPage === 'menu' ? 'text-red-500' : 'text-stone-300 hover:text-white'}`}
                >
                  Menu
                </button>
                
                {currentPage === 'home' && (
                  <div className="flex flex-col gap-4 pl-4 border-l-2 border-white/10 mt-2 mb-2">
                    <a href="#philosophy" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-400 font-bold uppercase tracking-widest hover:text-white transition-colors">Our Story</a>
                    <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-400 font-bold uppercase tracking-widest hover:text-white transition-colors">Reviews</a>
                  </div>
                )}
                
                <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-lg font-bold uppercase tracking-widest text-stone-300 hover:text-white transition-colors">
                  Find Us
                </a>
              </div>

              <div className="p-6 border-t border-white/10">
                <a 
                  href={`tel:${SHOP_DETAILS.phone}`} 
                  className="flex items-center justify-center gap-3 w-full bg-[#151515] text-[#e20a16] border border-[#e20a16] py-3 rounded-xl font-bold tracking-widest uppercase hover:bg-[#e20a16] hover:text-white transition-all"
                >
                  <Phone size={18} />
                  Call Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center bg-[#151515] overflow-hidden">
            
            {/* Full Desktop & Mobile Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full flex justify-end">
            <img 
              src="/hero-background.webp" 
              alt="Juice Stop Hero"
              className="w-full md:w-[70%] lg:w-[60%] h-full object-cover object-[center_center] opacity-30 md:opacity-90"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)',
                maskImage: 'linear-gradient(to right, transparent, black 25%)'
              }}
              loading="lazy"
            />
            {/* Gradient overlay for mobile text legibility */}
            <div className="absolute inset-y-0 left-0 w-full md:hidden bg-gradient-to-r from-[#151515] via-[#151515]/80 to-transparent z-10"></div>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between relative z-10 py-20 md:py-0">
          
          {/* Typography & CTA (Now sitting on top of the bg) */}
          <div className="w-full md:w-[60%] flex flex-col justify-center text-left space-y-6 pr-0 md:pr-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#e20a16]/10 border-2 border-[#e20a16] text-[#e20a16] font-black px-6 py-2.5 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(226,10,22,0.2)]">
                <span className="animate-pulse">✨</span> Enjoy 5% Off All Orders
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[3rem] sm:text-[4.5rem] lg:text-[5rem] xl:text-[5rem] leading-[0.95] font-black uppercase tracking-tight italic"
            >
              <span className="text-white block drop-shadow-lg">PREMIUM <br/>SHAKES</span>
              <span className="text-[#e20a16] block tracking-tighter drop-shadow-lg">& SCOOPS</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-stone-300 text-lg sm:text-xl max-w-lg font-medium leading-relaxed drop-shadow-md"
            >
              Indulge in our signature thick Ice Cream Shakes, creamy Scoops, and refreshing beverages. 
              Handcrafted daily in the heart of Rawalpindi.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                onClick={() => { setMenuInitialCategory('All'); setCurrentPage('menu'); }}

                className="inline-flex items-center gap-2 bg-[#e20a16] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b00710] shadow-xl transition-all"
              >
                Explore Flavors <ArrowRight size={20} />
              </button>
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
              <span className="text-red-600 font-bold uppercase tracking-widest text-sm block mb-2">Our Specialty</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-stone-900">
                INDULGE IN <span className="text-red-600">PERFECTION</span>
              </h2>
            </div>
            
            <p className="text-stone-600 text-lg leading-relaxed">
              At Juice Stop, we believe that the best moments are sweet. That's why we pour our passion into every single Ice Cream Shake, Scoop, and Milk Shake we serve.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              From premium ingredients to rich, decadent flavor combinations, our signature treats and delicious refreshments are crafted to satisfy your cravings and bring a smile to your face.
            </p>
            
            <div className="pt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-red-600" size={24} />
                <span className="font-bold text-stone-800">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-red-600" size={24} />
                <span className="font-bold text-stone-800">Rich Flavors</span>
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
                src="/shop-front.webp" 
                alt="Delicious Ice Cream Shakes and Scoops"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/40 to-transparent"></div>
            </div>
            {/* Floating accent block */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-stone-100 hidden md:block">
              <div className="font-black text-4xl text-red-600 italic">BEST</div>
              <div className="text-stone-800 font-bold uppercase tracking-wider text-sm">Sellers In Town</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Grouped Products Section */}
    <section id="grouped-products" className="bg-white py-24 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm block mb-2">Signature Series</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-stone-900">PREMIUM <span className="text-red-600">RANGES</span></h2>
          </div>
          <p className="text-stone-500 max-w-md">
            Explore our curated collections of multi-flavored shakes, scoops, and juices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groupedJuices.map((juice) => (
            <motion.div 
              key={juice.id}
              whileHover={{ y: -10 }}
              className="group bg-stone-50 rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={juice.image} 
                  alt={juice.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-stone-900 shadow-sm text-sm">
                  {juice.price ? `Rs. ${juice.price}` : `From Rs. ${Math.min(...(juice.variants?.map(v => v.price) || [0]))}`}
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#e20a16] uppercase tracking-wider mb-1 block">
                  {juice.category}
                </span>
                <h3 className="text-2xl font-bold mb-2 text-black">{juice.name}</h3>
                <p className="text-stone-500 text-sm mb-6">{juice.description}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleOrderNow(juice)}
                    className="flex-1 bg-[#e20a16] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#b00710] transition-colors shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                  >
                    Select Flavor
                  </button>
                  <button 
                    onClick={() => addToCart(juice)}
                    className="w-14 h-12 flex items-center justify-center border-2 border-[#e20a16] rounded-xl text-[#e20a16] hover:bg-[#e20a16] hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Single Products Section */}
    <section id="products" className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Quick Picks</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-stone-900">SINGLE <span className="text-red-600">FLAVOUR</span></h2>
          </div>
          <p className="text-stone-500 max-w-md">
            Choose from our wide selection of seasonal and classic refreshments. 
            Made to order with no added preservatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {randomSingleJuices.map((juice) => (
            <motion.div 
              key={juice.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={juice.image} 
                  alt={juice.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-stone-900 shadow-sm text-sm">
                  {juice.price ? `Rs. ${juice.price}` : `From Rs. ${Math.min(...(juice.variants?.map(v => v.price) || [0]))}`}
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#e20a16] uppercase tracking-wider mb-1 block">
                  {juice.category}
                </span>
                <h3 className="text-2xl font-bold mb-2 text-black">{juice.name}</h3>
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
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => { setMenuInitialCategory('All'); setCurrentPage('menu'); }}
            className="inline-flex items-center gap-2 bg-[#e20a16] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#b00710] shadow-xl transition-all"
          >
            Explore Full Menu <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Fast Food Section */}
      <section id="fast-food" className="bg-stone-100 py-24 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-red-600 font-bold uppercase tracking-widest text-sm block mb-2">Tasty Dots</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-stone-900">FAST <span className="text-red-600">FOOD</span></h2>
            </div>
            <p className="text-stone-500 max-w-md">
              Craving a bite? Check out our savory fast food menu, featuring premium burgers, wraps, and loaded fries!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {JUICES.filter(j => j.category === 'Fast Food').slice(0, 8).map((juice) => (
              <motion.div 
                key={juice.id}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img 
                    src={juice.image} 
                    alt={juice.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-stone-900 shadow-sm text-sm">
                    {juice.price ? `Rs. ${juice.price}` : `From Rs. ${Math.min(...(juice.variants?.map(v => v.price) || [0]))}`}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-black">{juice.name}</h3>
                  <p className="text-stone-500 text-sm mb-6 flex-1">{juice.description}</p>
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleOrderNow(juice)}
                      className="flex-1 bg-stone-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Order Now
                    </button>
                    <button 
                      onClick={() => addToCart(juice)}
                      className="w-14 h-12 flex items-center justify-center border-2 border-stone-900 rounded-xl text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => {
                setMenuInitialCategory('Fast Food');
                setCurrentPage('menu');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
              }}
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-800 shadow-xl transition-all"
            >
              View More Fast Food <ArrowRight size={20} />
            </button>
          </div>
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

        </>
      ) : (
        <MenuPage initialCategory={menuInitialCategory} onAddToCart={addToCart} onOrderNow={handleOrderNow} />
      )}

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
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#151515] border-t border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/logo.webp" alt="Juice Stop Logo" className="h-10 w-auto object-contain" />
            <span className="text-xl font-black tracking-tighter text-red-600 italic uppercase">JUICE STOP</span>
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
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-stone-400 hover:text-red-600">
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-stone-500 mb-3">
                          {[item.flavor, item.variantName].filter(Boolean).join(' - ')}
                          {[item.flavor, item.variantName].filter(Boolean).length > 0 ? ' • ' : ''}
                          Rs. {item.price}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="p-1 hover:bg-stone-100 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartItemId, 1)}
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
              <div className="p-6 pb-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">Your Name:</label>
                <input 
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border-2 border-stone-200 rounded-xl p-4 focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all font-medium"
                />
              </div>
              <div className="p-6 pt-4">
                <label className="block text-sm font-bold text-stone-700 mb-2">Full Delivery Address:</label>
                <textarea 
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="Street, House No, Society, City..."
                  className="w-full border-2 border-stone-200 rounded-xl p-4 min-h-[100px] focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all resize-none"
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
                  disabled={!userName.trim() || !userAddress.trim()}
                  className="flex-[2] bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  Confirm Order <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <VariantModal 
        isOpen={!!variantModalJuice} 
        juice={variantModalJuice} 
        onClose={() => setVariantModalJuice(null)} 
        onConfirm={(juice, variant, flavor) => {
          if (isOrderingNow) {
            handleOrderNow(juice, variant, flavor);
          } else {
            addToCart(juice, variant, flavor);
          }
          setVariantModalJuice(null);
        }} 
      />
    </div>
  );
}
