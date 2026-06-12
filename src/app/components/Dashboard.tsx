import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Bell,
  Captions,
  CheckCheck,
  CheckCircle2,
  Eye,
  Globe2,
  Languages,
  Power,
  Save,
  Settings,
  ShieldCheck,
  Type,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { RecyclingMachine } from "./RecyclingMachine";
import { StatCards } from "./StatCards";
import { Charts } from "./Charts";
import { ImpactList } from "./ImpactList";
import { IndustrialPanel } from "./IndustrialPanel";

type LanguageCode = "pt-BR" | "en-US" | "es-ES";
type CountryCode = "BR" | "US" | "ES" | "PT" | "AR";
type OperationMode = "eco" | "balanced" | "performance";
type NotificationType = "success" | "warning" | "info";

const translations = {
  "pt-BR": {
    appSubtitle: "Sistema Industrial de Reciclagem",
    online: "Sistema Online",
    settings: "Configurações",
    settingsSubtitle: "Controle operacional do EcoPET",
    notifications: "Notificações",
    recentUpdates: "Atualizações recentes do sistema",
    unread: "não lidas",
    read: "Lida",
    unreadStatus: "Não lida",
    markAllRead: "Marcar tudo como lido",
    listenSummary: "Ouvir resumo",
    languageCountry: "Língua e país",
    language: "Língua",
    country: "País ou nacionalidade",
    accessibility: "Acessibilidade",
    audioGuide: "Guia por áudio",
    audioGuideHelp: "Lê notificações e status em voz alta.",
    visualCaptions: "Alertas visuais",
    visualCaptionsHelp: "Mostra legendas para quem não escuta alertas sonoros.",
    highContrast: "Alto contraste",
    highContrastHelp: "Aumenta contraste e legibilidade.",
    largeText: "Texto ampliado",
    largeTextHelp: "Aumenta o tamanho geral dos textos.",
    reducedMotion: "Reduzir animações",
    reducedMotionHelp: "Diminui movimentos na interface.",
    braille: "Braille visual",
    brailleHelp: "Exibe referência visual em Braille.",
    testAccessibility: "Testar acessibilidade",
    operationMode: "Modo de operação",
    dailyTarget: "Meta diária de garrafas",
    projectedCollection: "Coleta projetada",
    projectedEnergy: "Energia estimada",
    automations: "Automações",
    smartAlerts: "Alertas inteligentes",
    reports: "Relatórios automáticos",
    maintenance: "Modo manutenção",
    apply: "Aplicar configurações",
    lastApplied: "Última aplicação",
    footer: "Tecnologia sustentável para um futuro melhor.",
    mode: "Modo",
    maintenanceActive: "Manutenção Ativa",
    accessibilityReady: "Acessibilidade ativada e funcionando.",
  },
  "en-US": {
    appSubtitle: "Industrial Recycling System",
    online: "System Online",
    settings: "Settings",
    settingsSubtitle: "EcoPET operational control",
    notifications: "Notifications",
    recentUpdates: "Recent system updates",
    unread: "unread",
    read: "Read",
    unreadStatus: "Unread",
    markAllRead: "Mark all as read",
    listenSummary: "Listen to summary",
    languageCountry: "Language and country",
    language: "Language",
    country: "Country or nationality",
    accessibility: "Accessibility",
    audioGuide: "Audio guide",
    audioGuideHelp: "Reads notifications and status aloud.",
    visualCaptions: "Visual alerts",
    visualCaptionsHelp: "Shows captions for people who cannot hear sound alerts.",
    highContrast: "High contrast",
    highContrastHelp: "Increases contrast and readability.",
    largeText: "Larger text",
    largeTextHelp: "Increases overall text size.",
    reducedMotion: "Reduce motion",
    reducedMotionHelp: "Reduces interface movement.",
    braille: "Visual Braille",
    brailleHelp: "Displays a visual Braille reference.",
    testAccessibility: "Test accessibility",
    operationMode: "Operation mode",
    dailyTarget: "Daily bottle target",
    projectedCollection: "Projected collection",
    projectedEnergy: "Estimated energy",
    automations: "Automations",
    smartAlerts: "Smart alerts",
    reports: "Automatic reports",
    maintenance: "Maintenance mode",
    apply: "Apply settings",
    lastApplied: "Last applied",
    footer: "Sustainable technology for a better future.",
    mode: "Mode",
    maintenanceActive: "Maintenance Active",
    accessibilityReady: "Accessibility is enabled and working.",
  },
  "es-ES": {
    appSubtitle: "Sistema Industrial de Reciclaje",
    online: "Sistema en línea",
    settings: "Configuración",
    settingsSubtitle: "Control operativo de EcoPET",
    notifications: "Notificaciones",
    recentUpdates: "Actualizaciones recientes del sistema",
    unread: "no leídas",
    read: "Leída",
    unreadStatus: "No leída",
    markAllRead: "Marcar todo como leído",
    listenSummary: "Escuchar resumen",
    languageCountry: "Lengua y país",
    language: "Idioma",
    country: "País o nacionalidad",
    accessibility: "Accesibilidad",
    audioGuide: "Guía por audio",
    audioGuideHelp: "Lee notificaciones y estado en voz alta.",
    visualCaptions: "Alertas visuales",
    visualCaptionsHelp: "Muestra subtítulos para quien no escucha alertas sonoras.",
    highContrast: "Alto contraste",
    highContrastHelp: "Aumenta contraste y legibilidad.",
    largeText: "Texto ampliado",
    largeTextHelp: "Aumenta el tamaño general del texto.",
    reducedMotion: "Reducir animaciones",
    reducedMotionHelp: "Reduce movimientos en la interfaz.",
    braille: "Braille visual",
    brailleHelp: "Muestra una referencia visual en Braille.",
    testAccessibility: "Probar accesibilidad",
    operationMode: "Modo de operación",
    dailyTarget: "Meta diaria de botellas",
    projectedCollection: "Recolección proyectada",
    projectedEnergy: "Energía estimada",
    automations: "Automatizaciones",
    smartAlerts: "Alertas inteligentes",
    reports: "Informes automáticos",
    maintenance: "Modo mantenimiento",
    apply: "Aplicar configuración",
    lastApplied: "Última aplicación",
    footer: "Tecnología sostenible para un futuro mejor.",
    mode: "Modo",
    maintenanceActive: "Mantenimiento Activo",
    accessibilityReady: "La accesibilidad está activada y funcionando.",
  },
};

const notifications = {
  "pt-BR": [
    { id: "collection", title: "Coleta concluída", description: "120 garrafas PET foram processadas.", time: "Agora", type: "success" },
    { id: "maintenance", title: "Manutenção preventiva", description: "Verifique o compactador ao fim do turno.", time: "15 min", type: "warning" },
    { id: "target", title: "Meta diária atingida", description: "A unidade chegou a 87% da capacidade.", time: "1 h", type: "success" },
    { id: "route", title: "Rota otimizada", description: "A coleta urbana reduziu 12 km de deslocamento.", time: "2 h", type: "info" },
    { id: "energy", title: "Economia de energia", description: "O modo Eco economizou 18% de energia.", time: "3 h", type: "success" },
  ],
  "en-US": [
    { id: "collection", title: "Collection completed", description: "120 PET bottles were processed.", time: "Now", type: "success" },
    { id: "maintenance", title: "Preventive maintenance", description: "Check the compactor at the end of the shift.", time: "15 min", type: "warning" },
    { id: "target", title: "Daily target reached", description: "The unit reached 87% capacity.", time: "1 h", type: "success" },
    { id: "route", title: "Route optimized", description: "Urban collection reduced 12 km of travel.", time: "2 h", type: "info" },
    { id: "energy", title: "Energy savings", description: "Eco mode saved 18% energy.", time: "3 h", type: "success" },
  ],
  "es-ES": [
    { id: "collection", title: "Recolección finalizada", description: "120 botellas PET fueron procesadas.", time: "Ahora", type: "success" },
    { id: "maintenance", title: "Mantenimiento preventivo", description: "Verifique el compactador al final del turno.", time: "15 min", type: "warning" },
    { id: "target", title: "Meta diaria alcanzada", description: "La unidad llegó al 87% de capacidad.", time: "1 h", type: "success" },
    { id: "route", title: "Ruta optimizada", description: "La recolección urbana redujo 12 km de viaje.", time: "2 h", type: "info" },
    { id: "energy", title: "Ahorro de energía", description: "El modo Eco ahorró 18% de energía.", time: "3 h", type: "success" },
  ],
} satisfies Record<LanguageCode, Array<{ id: string; title: string; description: string; time: string; type: NotificationType }>>;

const languageOptions = [
  { code: "pt-BR", label: "Português" },
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Español" },
] satisfies Array<{ code: LanguageCode; label: string }>;

const countryOptions = [
  { code: "BR", label: "Brasil" },
  { code: "US", label: "Estados Unidos" },
  { code: "ES", label: "Espanha" },
  { code: "PT", label: "Portugal" },
  { code: "AR", label: "Argentina" },
] satisfies Array<{ code: CountryCode; label: string }>;

const modes = {
  eco: { "pt-BR": "Eco", "en-US": "Eco", "es-ES": "Eco" },
  balanced: { "pt-BR": "Equilibrado", "en-US": "Balanced", "es-ES": "Equilibrado" },
  performance: { "pt-BR": "Máximo", "en-US": "Maximum", "es-ES": "Máximo" },
};

const icons = { success: CheckCircle2, warning: AlertTriangle, info: Bell };

export function Dashboard() {
  const [language, setLanguage] = useState<LanguageCode>("pt-BR");
  const [country, setCountry] = useState<CountryCode>("BR");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mode, setMode] = useState<OperationMode>("balanced");
  const [target, setTarget] = useState(450);
  const [audioGuide, setAudioGuide] = useState(false);
  const [visualCaptions, setVisualCaptions] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [braille, setBraille] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [caption, setCaption] = useState("");
  const [liveMessage, setLiveMessage] = useState("");
  const [visibleIds, setVisibleIds] = useState(["collection", "maintenance", "target"]);
  const [readIds, setReadIds] = useState<string[]>(["collection"]);
  const [applied, setApplied] = useState({
    language: "pt-BR" as LanguageCode,
    country: "BR" as CountryCode,
    mode: "balanced" as OperationMode,
    target: 450,
    audioGuide: false,
    visualCaptions: true,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    braille: false,
    maintenance: false,
    savedAt: "14:32",
  });

  const t = translations[language];
  const appliedText = translations[applied.language];
  const activeNotifications = useMemo(
    () => notifications[applied.language].filter((item) => visibleIds.includes(item.id)),
    [applied.language, visibleIds],
  );
  const unreadCount = activeNotifications.filter((item) => !readIds.includes(item.id)).length;
  const status = applied.maintenance ? appliedText.maintenanceActive : `${appliedText.mode} ${modes[applied.mode][applied.language]}`;

  const announce = (message: string, forceAudio = false) => {
    setLiveMessage(message);
    if (applied.visualCaptions || visualCaptions) {
      setCaption(message);
      window.setTimeout(() => setCaption(""), 5000);
    }
    if ((applied.audioGuide || forceAudio) && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = applied.language;
      speech.rate = 0.92;
      window.speechSynthesis.speak(speech);
    }
  };

  const applySettings = () => {
    const next = {
      language,
      country,
      mode,
      target,
      audioGuide,
      visualCaptions,
      highContrast,
      largeText,
      reducedMotion,
      braille,
      maintenance,
      savedAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setApplied(next);
    setSettingsOpen(false);
    announce(`${translations[next.language].accessibilityReady} ${translations[next.language].mode} ${modes[next.mode][next.language]}.`, next.audioGuide);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleIds((current) => {
        const next = notifications[applied.language].find((item) => !current.includes(item.id));
        if (!next) return current;
        window.setTimeout(() => announce(`${next.title}. ${next.description}`), 100);
        return [...current, next.id];
      });
    }, 15000);

    return () => window.clearInterval(timer);
  }, [applied.language, applied.audioGuide, applied.visualCaptions]);

  const rootClass = [
    "size-full min-h-screen overflow-auto text-white",
    applied.highContrast ? "bg-black" : "bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1729]",
    applied.largeText ? "text-[18px]" : "",
  ].join(" ");

  return (
    <div lang={applied.language} className={rootClass}>
      <div className="sr-only" aria-live="polite" aria-atomic="true">{liveMessage}</div>
      {caption && (
        <div className="fixed bottom-4 left-1/2 z-[80] w-[min(92vw,720px)] -translate-x-1/2 rounded-xl border border-yellow-300 bg-black px-4 py-3 text-center text-sm font-semibold text-yellow-100">
          <Captions className="mr-2 inline h-4 w-4" />
          {caption}
        </div>
      )}

      {!applied.highContrast && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
      )}

      <motion.header
        initial={applied.reducedMotion ? false : { y: -20, opacity: 0 }}
        animate={applied.reducedMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: applied.reducedMotion ? 0 : 0.5 }}
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${applied.highContrast ? "border-white bg-black" : "border-gray-800/50 bg-gray-900/50 shadow-lg shadow-cyan-500/10"}`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-cyan-500 shadow-lg shadow-green-500/50">
                <Power className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">EcoPET System</h1>
                <p className="text-xs text-gray-300">{appliedText.appSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`hidden items-center gap-2 rounded-full border px-4 py-2 sm:flex ${applied.maintenance ? "border-yellow-400 bg-yellow-500/20" : "border-green-400 bg-green-500/20"}`}>
                <div className={`h-2 w-2 rounded-full ${applied.reducedMotion ? "" : "animate-pulse"} ${applied.maintenance ? "bg-yellow-300" : "bg-green-400"}`} />
                <span className={`text-sm font-semibold ${applied.maintenance ? "text-yellow-300" : "text-green-300"}`}>{status}</span>
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label={`${appliedText.notifications}: ${unreadCount} ${appliedText.unread}`}
                  aria-expanded={notificationsOpen}
                  onClick={() => {
                    setNotificationsOpen((open) => !open);
                    setSettingsOpen(false);
                  }}
                  className="relative rounded-lg p-2 transition-colors hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                >
                  <Bell className="h-5 w-5 text-gray-300" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{unreadCount}</span>
                  )}
                </button>

                {notificationsOpen && (
                  <motion.div
                    initial={applied.reducedMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
                    animate={applied.reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: applied.reducedMotion ? 0 : 0.18 }}
                    className="absolute right-0 top-12 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-700/70 bg-gray-950/95 shadow-2xl shadow-cyan-500/10"
                  >
                    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                      <div>
                        <h2 className="text-sm font-semibold text-white">{appliedText.notifications}</h2>
                        <p className="text-xs text-gray-400">{unreadCount} {appliedText.unread}</p>
                      </div>
                      <div className="flex gap-1">
                        <button type="button" title={appliedText.listenSummary} onClick={() => announce(activeNotifications.map((n) => `${n.title}. ${n.description}`).join(" "), true)} className="rounded-lg p-2 text-gray-300 hover:bg-gray-800">
                          <Volume2 className="h-4 w-4" />
                        </button>
                        <button type="button" title={appliedText.markAllRead} onClick={() => setReadIds(activeNotifications.map((n) => n.id))} className="rounded-lg p-2 text-gray-300 hover:bg-gray-800">
                          <CheckCheck className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => setNotificationsOpen(false)} className="rounded-lg p-2 text-gray-300 hover:bg-gray-800">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-[28rem] divide-y divide-gray-800 overflow-y-auto">
                      {activeNotifications.map((item) => {
                        const read = readIds.includes(item.id);
                        const Icon = icons[item.type];
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => {
                              setReadIds((ids) => (ids.includes(item.id) ? ids : [...ids, item.id]));
                              announce(`${item.title}. ${item.description}`);
                            }}
                            className={`flex w-full gap-3 px-4 py-3 text-left hover:bg-gray-900 ${read ? "opacity-65" : "bg-cyan-500/5"}`}
                          >
                            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.type === "warning" ? "bg-yellow-500/15 text-yellow-300" : item.type === "info" ? "bg-cyan-500/15 text-cyan-300" : "bg-green-500/15 text-green-300"}`}>
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex justify-between gap-3">
                                <span className="text-sm font-medium text-white">{item.title}</span>
                                <span className="shrink-0 text-xs text-gray-500">{item.time}</span>
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-gray-400">{item.description}</span>
                              <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[11px] ${read ? "border-gray-700 text-gray-400" : "border-cyan-400/50 text-cyan-200"}`}>
                                {read ? appliedText.read : appliedText.unreadStatus}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>

              <button
                type="button"
                aria-label={appliedText.settings}
                aria-expanded={settingsOpen}
                onClick={() => {
                  setSettingsOpen((open) => !open);
                  setNotificationsOpen(false);
                }}
                className="rounded-lg p-2 transition-colors hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-purple-300/70"
              >
                <Settings className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {applied.braille && (
        <div className="relative z-10 border-b border-cyan-400/20 bg-cyan-500/10 px-6 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-cyan-100">
            <span aria-hidden="true" className="font-mono text-lg tracking-wide">⠑⠉⠕⠏⠑⠞ · ⠊⠝⠉⠇⠥⠎⠁⠕</span>
            <span className="text-xs text-cyan-50/80">{appliedText.accessibility}</span>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-sm">
          <motion.aside
            initial={applied.reducedMotion ? false : { x: 420, opacity: 0 }}
            animate={applied.reducedMotion ? undefined : { x: 0, opacity: 1 }}
            transition={{ duration: applied.reducedMotion ? 0 : 0.25 }}
            className="h-full w-full max-w-md overflow-y-auto border-l border-gray-800 bg-gray-950/95 shadow-2xl shadow-purple-500/10"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-950/95 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{t.settings}</h2>
                <p className="text-xs text-gray-400">{t.settingsSubtitle}</p>
              </div>
              <button type="button" onClick={() => setSettingsOpen(false)} className="rounded-lg p-2 text-gray-300 hover:bg-gray-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 px-5 py-6">
              <section className="space-y-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Languages className="h-4 w-4 text-cyan-300" />
                  {t.languageCountry}
                </div>
                <label className="block space-y-2">
                  <span className="text-xs font-semibold text-gray-300">{t.language}</span>
                  <select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)} className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white">
                    {languageOptions.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-xs font-semibold text-gray-300">{t.country}</span>
                  <select value={country} onChange={(event) => setCountry(event.target.value as CountryCode)} className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white">
                    {countryOptions.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
                  </select>
                </label>
              </section>

              <section className="space-y-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Globe2 className="h-4 w-4 text-green-300" />
                  {t.accessibility}
                </div>
                {[
                  { icon: Volume2, label: t.audioGuide, help: t.audioGuideHelp, enabled: audioGuide, set: setAudioGuide },
                  { icon: Captions, label: t.visualCaptions, help: t.visualCaptionsHelp, enabled: visualCaptions, set: setVisualCaptions },
                  { icon: Eye, label: t.highContrast, help: t.highContrastHelp, enabled: highContrast, set: setHighContrast },
                  { icon: Type, label: t.largeText, help: t.largeTextHelp, enabled: largeText, set: setLargeText },
                  { icon: ShieldCheck, label: t.reducedMotion, help: t.reducedMotionHelp, enabled: reducedMotion, set: setReducedMotion },
                  { icon: Languages, label: t.braille, help: t.brailleHelp, enabled: braille, set: setBraille },
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <label key={option.label} className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-gray-800 bg-gray-950/45 p-3">
                      <span className="flex gap-3">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                        <span>
                          <span className="block text-sm font-medium text-white">{option.label}</span>
                          <span className="mt-1 block text-xs leading-5 text-gray-400">{option.help}</span>
                        </span>
                      </span>
                      <input type="checkbox" checked={option.enabled} onChange={(event) => option.set(event.target.checked)} className="mt-1 h-5 w-5 accent-cyan-400" />
                    </label>
                  );
                })}
                <button type="button" onClick={() => announce(t.accessibilityReady, true)} className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-100">
                  <Volume2 className="h-4 w-4" />
                  {t.testAccessibility}
                </button>
              </section>

              <section className="space-y-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Zap className="h-4 w-4 text-purple-300" />
                  {t.operationMode}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(modes) as OperationMode[]).map((item) => (
                    <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold ${mode === item ? "border-purple-300 bg-purple-500/20 text-white" : "border-gray-800 bg-gray-950 text-gray-300"}`}>
                      {modes[item][language]}
                    </button>
                  ))}
                </div>
                <label className="block space-y-2">
                  <span className="text-xs font-semibold text-gray-300">{t.dailyTarget}: {target}</span>
                  <input type="range" min="150" max="900" step="25" value={target} onChange={(event) => setTarget(Number(event.target.value))} className="w-full accent-cyan-400" />
                </label>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldCheck className="h-4 w-4 text-green-300" />
                  {t.automations}
                </div>
                <label className="flex justify-between rounded-xl border border-gray-800 bg-gray-900/60 p-4 text-sm text-white">
                  {t.smartAlerts}
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-green-400" />
                </label>
                <label className="flex justify-between rounded-xl border border-gray-800 bg-gray-900/60 p-4 text-sm text-white">
                  {t.reports}
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-green-400" />
                </label>
                <label className="flex justify-between rounded-xl border border-gray-800 bg-gray-900/60 p-4 text-sm text-white">
                  {t.maintenance}
                  <input type="checkbox" checked={maintenance} onChange={(event) => setMaintenance(event.target.checked)} className="h-5 w-5 accent-green-400" />
                </label>
              </section>

              <button type="button" onClick={applySettings} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                <Save className="h-4 w-4" />
                {t.apply}
              </button>
            </div>
          </motion.aside>
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-7xl space-y-8 px-6 py-8">
        <motion.div initial={applied.reducedMotion ? false : { opacity: 0, y: 20 }} animate={applied.reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatCards />
        </motion.div>
        <motion.div initial={applied.reducedMotion ? false : { opacity: 0, y: 20 }} animate={applied.reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <RecyclingMachine />
        </motion.div>
        <motion.div initial={applied.reducedMotion ? false : { opacity: 0, y: 20 }} animate={applied.reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Charts />
        </motion.div>
        <motion.div initial={applied.reducedMotion ? false : { opacity: 0, y: 20 }} animate={applied.reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <ImpactList />
        </motion.div>
        <motion.div initial={applied.reducedMotion ? false : { opacity: 0, y: 20 }} animate={applied.reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <IndustrialPanel />
        </motion.div>
      </main>

      <footer className="relative z-10 mt-16 border-t border-gray-800/50 bg-gray-900/30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-gray-400">2026 EcoPET System. {appliedText.footer}</div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>v2.4.1</span>
              <span>|</span>
              <span>{appliedText.lastApplied}: {applied.savedAt}</span>
              <span>|</span>
              <span>{countryOptions.find((item) => item.code === applied.country)?.label}</span>
              <span>|</span>
              <span className="text-green-400">99.9% uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
