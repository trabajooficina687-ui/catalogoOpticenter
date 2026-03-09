import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, ShoppingBag, Eye } from "lucide-react";
import ProductModal from "./components/ProductModal";
import { Product } from "./types";

// Replace this URL with your Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbxFAEvMVSsxQ6QPSSGaSukQ6niXeCd2eWZ-NGUgqq_HNS4ftZr-kXzOxD0XDURHNtV0/exec";

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
        if (API_URL.includes("YOUR_SCRIPT_ID")) {
          setProducts(MOCK_DATA);
          setLoading(false);
          return;
        }

        // Llamada simplificada para evitar problemas de CORS con Google
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error(`Error de red: ${response.status}`);
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          console.log("✅ Conexión exitosa. Productos cargados:", data.length);
          setProducts(data);
        } else {
          console.warn("⚠️ La conexión funcionó pero la hoja parece estar vacía.");
          setProducts(MOCK_DATA);
        }
      } catch (error) {
        console.error("❌ Error al conectar con Google Sheets:", error);
        // Si hay error, mostramos los mock para que el sitio no se vea vacío
        setProducts(MOCK_DATA);
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
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-40 sm:h-48 flex items-center justify-between">
          {/* Left: Search */}
          <div className="flex-1 hidden md:flex items-center">
            <div className="flex items-center bg-bg-custom rounded-full px-4 py-2 w-64 border border-gray-200 focus-within:border-primary/30 transition-all">
              <Search className="text-gray-400 mr-2" size={16} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-transparent border-none outline-none w-full text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <img 
              src="https://i.postimg.cc/LsD2HcjN/Whats-App-Image-2026-03-09-at-10-16-27.jpg" 
              alt="OptiCenter Logo" 
              className="h-32 sm:h-40 w-auto object-contain scale-125 sm:scale-150"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right: Cart */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button className="p-2 text-contrast hover:text-primary transition-colors relative">
              <ShoppingBag size={28} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
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
        <section id="catalogo" className="py-16 bg-bg-custom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-contrast mb-2">Catálogo de Productos</h2>
                <p className="text-gray-500">Explora nuestras últimas tendencias en óptica.</p>
              </div>
              
              <div className="md:hidden flex items-center bg-white rounded-full px-4 py-2 border border-gray-200">
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
                  <div key={n} className="bg-white p-4 rounded-2xl shadow-sm animate-pulse">
                    <div className="bg-gray-100 aspect-square rounded-xl mb-4" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
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
                    className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-square bg-bg-custom rounded-xl overflow-hidden mb-4">
                      <img
                        src={product.imagenPrincipal}
                        alt={product.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-contrast/0 group-hover:bg-contrast/5 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm text-contrast px-4 py-2 rounded-full text-xs font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          VER DETALLES
                        </div>
                      </div>
                    </div>
                    <div className="px-1">
                      <h3 className="font-bold text-contrast text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                        {product.titulo}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-primary font-bold text-xl">
                          ${product.precio}
                        </p>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Eye size={16} />
                        </div>
                      </div>
                    </div>
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
