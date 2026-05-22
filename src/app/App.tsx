import { useState } from "react";
import { Hero } from "./components/Hero";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="size-full bg-[#0a0e27] text-white overflow-auto">
      {!showDashboard ? (
        <Hero onStart={() => setShowDashboard(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}