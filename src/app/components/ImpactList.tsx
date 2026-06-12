import { useState } from "react";
import { motion } from "motion/react";
import { Building2, Droplet, Info, Leaf, Recycle, Turtle, Waves } from "lucide-react";

const impacts = [
  {
    icon: Turtle,
    title: "Preservação de Tartarugas Marinhas",
    description: "Redução de 78% na mortalidade por ingestão de plástico",
    color: "#10b981",
    facts: [
      "Fragmentos de PET podem ser confundidos com alimento por animais marinhos.",
      "Retirar garrafas do descarte irregular reduz riscos em praias e manguezais.",
      "Cada ciclo de coleta ajuda a manter resíduos longe das correntes costeiras.",
    ],
  },
  {
    icon: Waves,
    title: "Despoluição Oceânica",
    description: "12.340 kg de plástico impedidos de chegar aos oceanos",
    color: "#06b6d4",
    facts: [
      "Grande parte do plástico oceânico começa em vias urbanas, rios e galerias pluviais.",
      "A triagem correta aumenta a chance de reciclagem antes da formação de microplásticos.",
      "Garrafas recuperadas voltam para a cadeia produtiva em vez de permanecer no ambiente.",
    ],
  },
  {
    icon: Droplet,
    title: "Redução em Entupimentos",
    description: "89% menos bloqueios em sistemas de esgoto urbano",
    color: "#8b5cf6",
    facts: [
      "Resíduos descartados na rua podem ser carregados pela chuva até bueiros.",
      "Menos garrafas em vias públicas diminui o risco de alagamentos localizados.",
      "A coleta automatizada incentiva o descarte correto perto do ponto de consumo.",
    ],
  },
  {
    icon: Building2,
    title: "Melhoria Urbana",
    description: "Cidades mais limpas e sustentáveis",
    color: "#ec4899",
    facts: [
      "Pontos de descarte bem posicionados reduzem lixo em praças, escolas e comércios.",
      "Ambientes limpos melhoram a percepção de segurança e cuidado com o espaço público.",
      "Dados de coleta ajudam equipes a planejar rotas melhores.",
    ],
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Contribuição para economia circular e carbono neutro",
    color: "#22c55e",
    facts: [
      "Reciclar PET reduz a necessidade de produzir plástico virgem.",
      "A economia circular mantém materiais em uso por mais tempo.",
      "Indicadores de impacto ajudam a acompanhar metas ambientais.",
    ],
  },
  {
    icon: Recycle,
    title: "Cadeia de Reciclagem",
    description: "Geração de empregos verdes e economia sustentável",
    color: "#14b8a6",
    facts: [
      "PET separado com qualidade tem maior valor para cooperativas e recicladoras.",
      "A automação melhora a rastreabilidade do material recolhido.",
      "Mais volume reciclável fortalece coleta, transporte, triagem e transformação.",
    ],
  },
];

export function ImpactList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = impacts[selectedIndex];
  const SelectedIcon = selected.icon;

  return (
    <div className="space-y-4">
      <h2 className="mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
        Impactos Ambientais Positivos
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {impacts.map((impact, index) => {
          const active = selectedIndex === index;
          return (
            <motion.button
              type="button"
              key={impact.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.99 }}
              aria-pressed={active}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-5 text-left backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400/70 ${
                active ? "border-cyan-400/70" : "border-gray-700/50"
              }`}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                style={{ background: `radial-gradient(circle at 50% 0%, ${impact.color}18, transparent 70%)` }}
              />
              <div className="relative z-10 flex items-start gap-4">
                <div className="shrink-0 rounded-lg p-3" style={{ background: `${impact.color}20`, boxShadow: `0 0 20px ${impact.color}30` }}>
                  <impact.icon className="h-6 w-6" style={{ color: impact.color }} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold leading-tight text-white">{impact.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-400">{impact.description}</p>
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
        className="relative mt-6 overflow-hidden rounded-xl border border-gray-700/60 bg-gray-900/70 p-5 backdrop-blur-sm"
      >
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${selected.color}20`, boxShadow: `0 0 24px ${selected.color}25` }}>
            <SelectedIcon className="h-6 w-6" style={{ color: selected.color }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400">
              <Info className="h-4 w-4" />
              Fatos adicionais
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">{selected.title}</h3>
            <p className="mt-1 text-sm text-gray-400">{selected.description}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {selected.facts.map((fact, index) => (
                <div key={fact} className="rounded-lg border border-gray-800 bg-gray-950/45 p-3">
                  <span className="text-xs font-semibold" style={{ color: selected.color }}>Fato {index + 1}</span>
                  <p className="mt-2 text-xs leading-5 text-gray-300">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
