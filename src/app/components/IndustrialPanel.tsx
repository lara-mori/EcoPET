import { useState } from "react";
import { motion } from "motion/react";
import { Activity, Factory, Gauge, Info, TrendingUp } from "lucide-react";

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
    details: [
      "Sensores acompanham pontos de risco em rios, canais e áreas costeiras.",
      "Alertas ajudam equipes a agir antes que resíduos avancem para o oceano.",
      "Dados indicam onde instalar novos pontos de reciclagem.",
    ],
    status: "Operação estável",
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
    details: [
      "A triagem automatizada melhora a qualidade do PET enviado para reciclagem.",
      "Processos eficientes reduzem perdas de material durante a separação.",
      "Energia renovável diminui a pegada ambiental da operação.",
    ],
    status: "Linha otimizada",
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
    details: [
      "Indicadores mostram quais bairros precisam de mais pontos de coleta.",
      "Rotas inteligentes reduzem deslocamentos e economizam combustível.",
      "Históricos de coleta apoiam campanhas de educação ambiental.",
    ],
    status: "Expansão ativa",
    color: "#8b5cf6",
  },
];

export function IndustrialPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = panels[selectedIndex];
  const SelectedIcon = selected.icon;

  return (
    <div className="space-y-4">
      <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
        Painel Industrial Sustentável
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {panels.map((panel, index) => {
          const active = selectedIndex === index;
          return (
            <motion.button
              type="button"
              key={panel.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.99 }}
              aria-pressed={active}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-6 text-left backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300/70 ${
                active ? "border-purple-300/70" : "border-gray-700/50"
              }`}
              style={{ boxShadow: `0 0 40px ${panel.color}20` }}
            >
              <div className={`absolute right-0 top-0 h-32 w-32 blur-3xl transition-opacity ${active ? "opacity-35" : "opacity-20 group-hover:opacity-30"}`} style={{ background: panel.color }} />
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl p-3" style={{ background: `${panel.color}20`, boxShadow: `0 0 20px ${panel.color}30` }}>
                    <panel.icon className="h-6 w-6" style={{ color: panel.color }} />
                  </div>
                  <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${panel.color}20`, color: panel.color }}>ATIVO</div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-white">{panel.title}</h3>
                  <p className="text-sm text-gray-400">{panel.description}</p>
                </div>
                <div className="space-y-3 pt-2">
                  {panel.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{metric.label}</span>
                      <span className="text-sm font-bold" style={{ color: panel.color }}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={selected.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative mt-6 overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900/70 p-6 backdrop-blur-sm"
      >
        <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${selected.color}20`, boxShadow: `0 0 24px ${selected.color}25` }}>
              <SelectedIcon className="h-6 w-6" style={{ color: selected.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400">
                <Info className="h-4 w-4" />
                Detalhes do painel
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{selected.title}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-400">{selected.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${selected.color}20`, color: selected.color }}>
                <Gauge className="h-3.5 w-3.5" />
                {selected.status}
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {selected.details.map((detail, index) => (
              <div key={detail} className="rounded-xl border border-gray-800 bg-gray-950/45 p-4">
                <span className="text-xs font-semibold" style={{ color: selected.color }}>Fato {index + 1}</span>
                <p className="mt-2 text-xs leading-5 text-gray-300">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
