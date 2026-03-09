import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, ShoppingBag, Eye } from "lucide-react";
import ProductModal from "./components/ProductModal";
import { Product } from "./types";

// Replace this URL with your Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// Mock data for initial development/preview if API_URL is not set
const MOCK_DATA: Product[] = [
  {
    id: 1,
    titulo: "Lentes Aviador Classic",
    descripcion: "Diseño icónico con montura metálica dorada y cristales polarizados de alta calidad. Protección UV400 completa.",
    precio: "120.00",
    imagenPrincipal: "https://picsum.photos/seed/glasses1/600/600",
    imagenesAdicionales: ["https://picsum.photos/seed/glasses1-side/600/600", "https://picsum.photos/seed/glasses1-case/600/600"],
    linkPago: "#"
  },
  {
    id: 2,
    titulo: "Montura Wayfarer Black",
    descripcion: "Estilo atemporal en acetato negro brillante. Ligero, resistente y perfecto para cualquier ocasión.",
    precio: "95.00",
    imagenPrincipal: "https://picsum.photos/seed/glasses2/600/600",
    imagenesAdicionales: ["https://picsum.photos/seed/glasses2-side/600/600"],
    linkPago: "#"
  },
  {
    id: 3,
    titulo: "Lentes de Lectura Slim",
    descripcion: "Montura ultra delgada y flexible. Ideal para lectura prolongada con filtro de luz azul incluido.",
    precio: "45.00",
    imagenPrincipal: "https://picsum.photos/seed/glasses3/600/600",
    imagenesAdicionales: [],
    linkPago: "#"
  },
  {
    id: 4,
    titulo: "Gafas de Sol Sport Pro",
    descripcion: "Diseñadas para el rendimiento. Montura envolvente con agarre antideslizante y lentes de alto contraste.",
    precio: "150.00",
    imagenPrincipal: "https://picsum.photos/seed/glasses4/600/600",
    imagenesAdicionales: ["https://picsum.photos/seed/glasses4-alt/600/600"],
    linkPago: "#"
  }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // If API_URL is still placeholder, use mock data
        if (API_URL.includes("YOUR_SCRIPT_ID")) {
          setProducts(MOCK_DATA);
          setLoading(false);
          return;
        }

        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(MOCK_DATA); // Fallback to mock data on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://i.postimg.cc/LsD2HcjN/Whats-App-Image-2026-03-09-at-10-16-27.jpg" 
              alt="OptiCenter Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="hidden md:flex items-center bg-bg-custom rounded-full px-4 py-2 w-96 border border-gray-200">
            <Search className="text-gray-400 mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Buscar modelos..." 
              className="bg-transparent border-none outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-contrast hover:text-primary transition-colors">
              <ShoppingBag size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                Nueva Colección 2026
              </span>
              <h1 className="text-5xl sm:text-6xl font-bold text-contrast leading-tight mb-6">
                Claridad y Estilo <br />
                <span className="text-primary">en cada mirada.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Descubre nuestra selección exclusiva de monturas y lentes diseñados para elevar tu estilo personal mientras cuidamos de tu salud visual.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#catalogo" className="bg-contrast text-white px-8 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all">
                  Ver Catálogo
                </a>
                <button className="border border-gray-300 text-contrast px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                  Nuestra Óptica
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0 hidden lg:block" />
        </section>

        {/* Catalog Grid */}
        <section id="catalogo" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-contrast mb-2">Catálogo de Productos</h2>
                <p className="text-gray-500">Explora nuestras últimas tendencias en óptica.</p>
              </div>
              
              <div className="md:hidden flex items-center bg-bg-custom rounded-full px-4 py-2 border border-gray-200">
                <Search className="text-gray-400 mr-2" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-transparent border-none outline-none w-full text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-2xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-square bg-bg-custom rounded-2xl overflow-hidden mb-4 border border-transparent group-hover:border-primary/20 transition-all">
                      <img
                        src={product.imagenPrincipal}
                        alt={product.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button className="bg-white text-contrast px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                          <Eye size={16} />
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-contrast group-hover:text-primary transition-colors">
                      {product.titulo}
                    </h3>
                    <p className="text-primary font-bold mt-1">
                      ${product.precio}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-contrast text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <img 
                src="https://i.postimg.cc/LsD2HcjN/Whats-App-Image-2026-03-09-at-10-16-27.jpg" 
                alt="OptiCenter Logo" 
                className="h-10 w-auto brightness-0 invert mb-6"
                referrerPolicy="no-referrer"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                OptiCenter: Tu visión es nuestra prioridad. Ofrecemos las mejores marcas y el asesoramiento profesional que necesitas.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contacto</h4>
              <ul className="text-gray-400 text-sm space-y-4">
                <li>Calle Principal #123, Ciudad</li>
                <li>Tel: +1 234 567 890</li>
                <li>Email: info@opticenter.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Horario</h4>
              <ul className="text-gray-400 text-sm space-y-4">
                <li>Lunes - Viernes: 9:00 - 19:00</li>
                <li>Sábados: 10:00 - 14:00</li>
                <li>Domingos: Cerrado</li>
              </ul>
            </div>
          </div>
          <div className="border-top border-white/10 mt-12 pt-8 text-center text-gray-500 text-xs">
            © 2026 OptiCenter. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
