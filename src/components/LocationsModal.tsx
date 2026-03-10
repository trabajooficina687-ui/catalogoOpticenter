import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Navigation, ExternalLink } from "lucide-react";

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOCATIONS = [
  {
    address: "Junin 466, San Miguel de Tucumán",
    link: "https://share.google/etqAs6HfyItLkC89b",
    description: "Nuestra casa central con la mayor variedad de monturas."
  },
  {
    address: "9 de julio 82, San Miguel de Tucumán",
    link: "https://share.google/swMq4Ckyjt98Oon9E",
    description: "Ubicación estratégica en el corazón de la ciudad."
  },
  {
    address: "Maipú 241, San Miguel de Tucumán",
    link: "https://maps.app.goo.gl/kFpdN47ibdfMbScJ9",
    description: "Atención personalizada y gabinete de contactología."
  }
];

export default function LocationsModal({ isOpen, onClose }: LocationsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-contrast hover:bg-primary hover:text-white transition-all shadow-lg"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-12 overflow-y-auto">
              <div className="mb-8">
                <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">
                  Visítanos
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-contrast mb-4 leading-tight">
                  Nuestras Sucursales
                </h2>
                <div className="h-1 w-20 bg-primary/20 rounded-full mb-8" />
                <p className="text-gray-600 leading-relaxed text-lg">
                  Encuentra la óptica más cercana a ti. Te esperamos con el mejor asesoramiento profesional.
                </p>
              </div>

              <div className="space-y-6">
                {LOCATIONS.map((loc, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-bg-custom p-6 rounded-2xl border border-transparent hover:border-primary/20 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <MapPin size={24} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-contrast text-xl mb-1">
                          {loc.address.split(',')[0]}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          {loc.address.split(',')[1]}
                        </p>
                        <p className="text-gray-600 text-sm mb-6 italic">
                          "{loc.description}"
                        </p>
                        <a 
                          href={loc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-bold hover:underline group/link"
                        >
                          <Navigation size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                          Cómo llegar
                          <ExternalLink size={14} className="opacity-50" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-400 text-sm">
                  Atención de Lunes a Viernes de 9:00 a 19:30 hs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
