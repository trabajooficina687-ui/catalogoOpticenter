import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const allImages = [product.imagenPrincipal, ...product.imagenesAdicionales];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-contrast hover:bg-primary hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Gallery Section */}
            <div className="relative w-full md:w-1/2 bg-gray-100 flex items-center justify-center min-h-[300px]">
              <img
                src={allImages[currentImageIndex]}
                alt={product.titulo}
                className="w-full h-full object-contain p-4"
                referrerPolicy="no-referrer"
              />
              
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 p-1 bg-white/50 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 p-1 bg-white/50 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? "bg-primary w-4" : "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
              <div className="flex-grow">
                <h2 className="text-2xl sm:text-3xl font-bold text-contrast mb-2">
                  {product.titulo}
                </h2>
                <p className="text-primary text-2xl font-bold mb-6">
                  ${product.precio}
                </p>
                <div className="h-px bg-gray-100 mb-6" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {product.descripcion}
                </p>
              </div>

              <a
                href={product.linkPago}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingCart size={20} />
                Comprar Ahora
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
