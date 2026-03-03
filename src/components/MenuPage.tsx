import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, X } from 'lucide-react';
import { CATEGORIES, JUICES } from '../constants';
import { Juice } from '../types';

interface MenuPageProps {
  onAddToCart: (juice: Juice) => void;
  onOrderNow: (juice: Juice) => void;
}

export function MenuPage({ onAddToCart, onOrderNow }: MenuPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Real-time filtering
  const filteredJuices = useMemo(() => {
    return JUICES.filter((juice) => {
      const matchesSearch = juice.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || juice.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-stone-900">
            OUR <span className="text-red-600">MENU</span>
          </h2>
          <p className="text-stone-500 mt-2 max-w-md">
            Explore our wide range of natural juices, refreshing shakes, and delicious treats!
          </p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-white border-2 border-stone-200 text-stone-900 rounded-full py-4 pl-12 pr-12 focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10 transition-all font-medium placeholder:text-stone-400 shadow-sm"
            placeholder="Search for your favorite flavor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex overflow-x-auto pb-4 mb-10 gap-3 no-scrollbar scroll-smooth snap-x">
        <button
          onClick={() => setActiveCategory('All')}
          className={`snap-start whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm
            ${activeCategory === 'All' 
              ? 'bg-red-600 text-white shadow-red-600/20 shadow-md' 
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
        >
          All Items
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`snap-start whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm
              ${activeCategory === cat 
                ? 'bg-red-600 text-white shadow-red-600/20 shadow-md' 
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredJuices.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredJuices.map((juice) => (
              <motion.div 
                key={juice.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden bg-stone-100 shrink-0">
                  <img 
                    src={juice.image} 
                    alt={juice.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full font-bold text-stone-900 shadow-sm text-sm">
                    {juice.price ? `Rs. ${juice.price}` : `From Rs. ${Math.min(...(juice.variants?.map(v => v.price) || [0]))}`}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-bold text-[#e20a16] uppercase tracking-wider mb-1">
                    {juice.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-black">{juice.name}</h3>
                  <p className="text-stone-500 text-sm mb-6 flex-1 line-clamp-2">{juice.description}</p>
                  
                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => onOrderNow(juice)}
                      className="flex-1 bg-stone-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Order Now
                    </button>
                    <button 
                      onClick={() => onAddToCart(juice)}
                      className="w-12 h-10 flex items-center justify-center border-2 border-stone-900 rounded-xl text-stone-900 hover:bg-stone-900 hover:text-white transition-all shrink-0"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-32 bg-white rounded-3xl border border-stone-200 shadow-sm">
          <Search className="mx-auto text-stone-300 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-stone-800 mb-2">No items found</h3>
          <p className="text-stone-500">We couldn't find any items matching "{searchQuery}" in {activeCategory}.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-6 text-red-600 font-bold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
