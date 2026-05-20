import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Recycle, Droplets, AlertTriangle, Squirrel } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  unit: string;
  color: string;
  delay: number;
}

function StatCard({ icon, title, value, unit, color, delay }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 overflow-hidden group"
      style={{
        boxShadow: `0 0 30px ${color}20`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-xl"
            style={{
              background: `${color}20`,
              boxShadow: `0 0 20px ${color}30`,
            }}
          >
            <div style={{ color }}>{icon}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-gray-400 tracking-wide">{title}</h3>
          <div className="flex items-baseline gap-2">
            <motion.span
              key={count}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold"
              style={{ color }}
            >
              {count.toLocaleString()}
            </motion.span>
            <span className="text-lg text-gray-500">{unit}</span>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
          style={{ background: `linear-gradient(to right, ${color}00, ${color}, ${color}00)` }}
        />
      </div>
    </motion.div>
  );
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Recycle className="w-6 h-6" />}
        title="Garrafas Recicladas"
        value={45678}
        unit="unidades"
        color="#10b981"
        delay={0}
      />
      <StatCard
        icon={<Droplets className="w-6 h-6" />}
        title="Plástico Recuperado"
        value={12340}
        unit="kg"
        color="#06b6d4"
        delay={0.1}
      />
      <StatCard
        icon={<AlertTriangle className="w-6 h-6" />}
        title="Redução em Esgotos"
        value={89}
        unit="%"
        color="#8b5cf6"
        delay={0.2}
      />
      <StatCard
        icon={<Squirrel className="w-6 h-6" />}
        title="Animais Preservados"
        value={3250}
        unit="estimativa"
        color="#ec4899"
        delay={0.3}
      />
    </div>
  );
}
