import { motion } from "motion/react";
import { Activity, Factory, TrendingUp } from "lucide-react";

const panels = [
  {
    icon: Activity,
    title: "Monitoramento Oceânico",
    description: "Rastreamento em tempo real da poluição marinha",
    metrics: [
      { label: "Áreas monitoradas", value: "847" },
      { label: "Sensores ativos", value: "1.2K" },
      { label: "Alertas hoje", value: "3" },
    ],
    color: "#06b6d4",
  },
  {
    icon: Factory,
    title: "Produção Sustentável",
    description: "Cadeia industrial de reciclagem automatizada",
    metrics: [
      { label: "Toneladas/mês", value: "340" },
      { label: "Eficiência", value: "98.7%" },
      { label: "Energia renovável", value: "100%" },
    ],
    color: "#10b981",
  },
  {
    icon: TrendingUp,
    title: "Gestão Urbana",
    description: "Inteligência artificial para cidades sustentáveis",
    metrics: [
      { label: "Cidades atendidas", value: "23" },
      { label: "Pontos coleta", value: "456" },
      { label: "Crescimento/mês", value: "+12%" },
    ],
    color: "#8b5cf6",
  },
];

export function IndustrialPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Painel Industrial Sustentável
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {panels.map((panel, index) => (
          <motion.div
            key={panel.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-sm border border-gray-700/50 overflow-hidden group"
            style={{
              boxShadow: `0 0 40px ${panel.color}20`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl"
              style={{ background: panel.color }}
            />

            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: `${panel.color}20`,
                    boxShadow: `0 0 20px ${panel.color}30`,
                  }}
                >
                  <panel.icon className="w-6 h-6" style={{ color: panel.color }} />
                </div>

                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${panel.color}20`,
                    color: panel.color,
                  }}
                >
                  ATIVO
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{panel.title}</h3>
                <p className="text-sm text-gray-400">{panel.description}</p>
              </div>

              <div className="space-y-3 pt-2">
                {panel.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{metric.label}</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: panel.color }}
                    >
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                style={{
                  background: `linear-gradient(to right, transparent, ${panel.color}, transparent)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
