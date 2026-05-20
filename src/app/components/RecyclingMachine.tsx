import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Droplets, Trash2, Package } from "lucide-react";

export function RecyclingMachine() {
  const [bottles, setBottles] = useState<number[]>([]);
  const [processedCount, setProcessedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBottles(prev => {
        const newBottles = [...prev, Date.now()];
        if (newBottles.length > 5) {
          setProcessedCount(c => c + 1);
          return newBottles.slice(1);
        }
        return newBottles;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
      <div className="absolute -top-3 left-8 px-4 py-1 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full text-xs font-semibold shadow-lg shadow-cyan-500/50">
        MÁQUINA RECICLADORA AUTOMÁTICA
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <Trash2 className="w-5 h-5" />
            <span className="text-sm font-semibold">ENTRADA</span>
          </div>

          <div className="h-64 relative bg-gray-800/50 rounded-xl border-2 border-cyan-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse" />

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-green-500 to-cyan-500">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {bottles.map((id, index) => (
              <motion.div
                key={id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${20 + index * 15}%` }}
              >
                <div className="relative">
                  <div className="w-8 h-16 bg-gradient-to-b from-cyan-400/80 to-cyan-600/80 rounded-lg shadow-lg shadow-cyan-500/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-lg" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-400">
            Garrafas detectadas: <span className="text-cyan-400 font-semibold">{bottles.length}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-green-400">
            <Droplets className="w-5 h-5" />
            <span className="text-sm font-semibold">PROCESSAMENTO</span>
          </div>

          <div className="h-64 relative bg-gray-800/50 rounded-xl border-2 border-green-500/50 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-green-500/30 border-t-green-500 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full blur-xl opacity-50"
              />
            </div>

            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-500/50"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            Status: <span className="text-green-400 font-semibold">ATIVO</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-purple-400">
            <Package className="w-5 h-5" />
            <span className="text-sm font-semibold">ARMAZENAMENTO</span>
          </div>

          <div className="h-64 relative bg-gray-800/50 rounded-xl border-2 border-purple-500/50 overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500/50 to-purple-500/20"
              animate={{
                height: [`${Math.min(processedCount * 2, 100)}%`]
              }}
              transition={{ duration: 0.5 }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              >
                {processedCount}
              </motion.div>
              <div className="text-xs text-gray-400 mt-2">Kg Processados</div>
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>

          <div className="text-center text-sm text-gray-400">
            Capacidade: <span className="text-purple-400 font-semibold">{Math.min(processedCount, 50)}/50</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full animate-pulse" />
          Sistema operacional
        </div>
        <div>Eficiência: 98.7%</div>
        <div>Tempo de operação: 24/7</div>
      </div>
    </div>
  );
}
