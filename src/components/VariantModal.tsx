import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { Juice, JuiceVariant } from '../types';

interface VariantModalProps {
  isOpen: boolean;
  juice: Juice | null;
  onClose: () => void;
  onConfirm: (juice: Juice, variant?: JuiceVariant, flavor?: string) => void;
}

export function VariantModal({ isOpen, juice, onClose, onConfirm }: VariantModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<JuiceVariant | undefined>(undefined);
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen && juice) {
      setSelectedVariant(undefined);
      setSelectedFlavor(juice.flavors && juice.flavors.length > 0 ? juice.flavors[0] : undefined);
    }
  }, [isOpen, juice]);

  if (!juice || (!juice.variants && !juice.flavors)) return null;

  const handleConfirm = () => {
    // Check if what is required is selected
    const needsVariant = !!juice.variants;
    const needsFlavor = !!juice.flavors;

    if (needsVariant && !selectedVariant) return;
    if (needsFlavor && !selectedFlavor) return;

    onConfirm(juice, selectedVariant, selectedFlavor);
  };

  const isFormValid = (!juice.variants || selectedVariant) && (!juice.flavors || selectedFlavor);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[80]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-3xl shadow-2xl z-[90] overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50 shrink-0">
              <h3 className="text-xl font-black italic tracking-tight uppercase">Select Options</h3>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-stone-400 hover:text-red-600 shadow-sm transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto hidden-scrollbar">
              <div className="mb-6">
                <h4 className="font-bold text-lg leading-tight">{juice.name}</h4>
                <p className="text-sm text-stone-500">{juice.category}</p>
              </div>

              {juice.flavors && juice.flavors.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-bold text-stone-800 mb-3 text-sm uppercase tracking-wider">1. Choose Flavor</h5>
                  <div className="flex flex-wrap gap-2">
                    {juice.flavors.map((flavor, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                          selectedFlavor === flavor
                          ? 'border-red-600 bg-red-50 text-red-700'
                          : 'border-stone-200 text-stone-600 hover:border-red-300'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {juice.variants && juice.variants.length > 0 && (
                <div>
                  <h5 className="font-bold text-stone-800 mb-3 text-sm uppercase tracking-wider">
                    {juice.flavors ? '2. Choose Size/Amount' : 'Choose Size/Amount'}
                  </h5>
                  <div className="space-y-3">
                    {juice.variants.map((variant, idx) => (
                      <label 
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedVariant?.name === variant.name 
                          ? 'border-red-600 bg-red-50' 
                          : 'border-stone-200 hover:border-red-300'
                        }`}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedVariant?.name === variant.name ? 'border-red-600' : 'border-stone-300'
                          }`}>
                            {selectedVariant?.name === variant.name && <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />}
                          </div>
                          <span className="font-bold text-stone-800">{variant.name}</span>
                        </div>
                        <span className="font-black text-stone-900">Rs. {variant.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-stone-100 bg-stone-50 flex gap-3 shrink-0">
              <button 
                onClick={handleConfirm}
                disabled={!isFormValid}
                className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
              >
                Confirm Selection <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
