import { motion } from "motion/react";
import { Power, Settings, Bell } from "lucide-react";
import { RecyclingMachine } from "./RecyclingMachine";
import { StatCards } from "./StatCards";
import { Charts } from "./Charts";
import { ImpactList } from "./ImpactList";
import { IndustrialPanel } from "./IndustrialPanel";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1729]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/50 border-b border-gray-800/50 shadow-lg shadow-cyan-500/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
                <Power className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  EcoPET System
                </h1>
                <p className="text-xs text-gray-400">Sistema Industrial de Reciclagem</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400 font-semibold">Sistema Online</span>
              </div>

              <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-400" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCards />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RecyclingMachine />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Charts />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ImpactList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <IndustrialPanel />
        </motion.div>
      </main>

      <footer className="relative z-10 mt-16 border-t border-gray-800/50 backdrop-blur-xl bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © 2026 EcoPET System. Tecnologia sustentável para um futuro melhor.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>v2.4.1</span>
              <span>•</span>
              <span>Última atualização: Hoje, 14:32</span>
              <span>•</span>
              <span className="text-green-400">99.9% uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
