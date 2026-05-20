import { motion } from "motion/react";
import { Turtle, Waves, Droplet, Building2, Leaf, Recycle } from "lucide-react";

const impacts = [
  {
    icon: Turtle,
    title: "Preservação de Tartarugas Marinhas",
    description: "Redução de 78% na mortalidade por ingestão de plástico",
    color: "#10b981",
  },
  {
    icon: Waves,
    title: "Despoluição Oceânica",
    description: "12.340 kg de plástico impedidos de chegar aos oceanos",
    color: "#06b6d4",
  },
  {
    icon: Droplet,
    title: "Redução em Entupimentos",
    description: "89% menos bloqueios em sistemas de esgoto urbano",
    color: "#8b5cf6",
  },
  {
    icon: Building2,
    title: "Melhoria Urbana",
    description: "Cidades mais limpas e sustentáveis",
    color: "#ec4899",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Contribuição para economia circular e carbono neutro",
    color: "#22c55e",
  },
  {
    icon: Recycle,
    title: "Cadeia de Reciclagem",
    description: "Geração de empregos verdes e economia sustentável",
    color: "#14b8a6",
  },
];

export function ImpactList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
        Impactos Ambientais Positivos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {impacts.map((impact, index) => (
          <motion.div
            key={impact.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -3 }}
            className="relative p-5 rounded-xl bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border border-gray-700/50 overflow-hidden group cursor-pointer"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${impact.color}15, transparent 70%)`,
              }}
            />

            <div className="relative z-10 flex items-start gap-4">
              <div
                className="p-3 rounded-lg shrink-0"
                style={{
                  background: `${impact.color}20`,
                  boxShadow: `0 0 20px ${impact.color}30`,
                }}
              >
                <impact.icon className="w-6 h-6" style={{ color: impact.color }} />
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-white text-sm leading-tight">
                  {impact.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(to right, transparent, ${impact.color}, transparent)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
