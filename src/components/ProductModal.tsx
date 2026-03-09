import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  if (!product) return null;

  const allImages = [product.imagenPrincipal, ...(product.imagenesAdicionales || [])];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-contrast/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-contrast hover:bg-primary hover:text-white transition-all shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Gallery Section */}
            <div className="relative w-full md:w-1/2 bg-bg-custom flex flex-col min-h-[400px]">
              <div className="flex-grow relative flex items-center justify-center p-6">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={allImages[currentImageIndex]}
                  alt={product.titulo}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors shadow-sm"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors shadow-sm"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto bg-white/30 backdrop-blur-sm border-t border-gray-100">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? "border-primary shadow-md" : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col overflow-y-auto">
              <div className="flex-grow">
                <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">
                  Colección Premium
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-contrast mb-4 leading-tight">
                  {product.titulo}
                </h2>
                <p className="text-primary text-3xl font-bold mb-8">
                  ${product.precio}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-contrast/40 mb-3">
                      Descripción
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {product.descripcion}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <a
                  href={product.linkPago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-contrast text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 active:scale-[0.98]"
                >
                  <ShoppingCart size={22} />
                  Comprar Ahora
                </a>
                <p className="text-center text-gray-400 text-xs mt-4">
                  Asesoramiento profesional incluido en tu compra
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
