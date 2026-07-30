/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ExternalLink, CheckCircle2, ChevronRight } from "lucide-react";
import { Thread, Platform } from "../types";
import { useState } from "react";

interface ThreadCardProps {
  thread: Thread;
  onMarkAsRead: (id: string) => void;
  onSelect: () => void;
}

const themeStyles: Record<
  Platform,
  {
    card: string;
    dot: string;
    button: string;
    glow: string;
    cite: string;
  }
> = {
  Facebook: {
    card: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900",
    dot: "bg-blue-600 dark:bg-blue-500",
    button: "bg-blue-600 hover:bg-blue-500 text-white",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    cite: "border-l-blue-500/30 bg-blue-500/5",
  },
  Instagram: {
    card: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900",
    dot: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
    button:
      "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:opacity-90 text-white",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.1)] dark:shadow-[0_0_15px_rgba(236,72,153,0.15)]",
    cite: "border-l-pink-500/30 bg-pink-500/5",
  },
  TikTok: {
    card: "bg-white dark:bg-black border-zinc-200 dark:border-[#2F3336]",
    dot: "bg-[#00f2ea]",
    button:
      "bg-black dark:bg-[#14171A] hover:bg-zinc-800 dark:hover:bg-black text-white border border-white/5",
    glow: "shadow-[0_0_15px_rgba(0,242,234,0.1)] dark:shadow-[0_0_15px_rgba(0,242,234,0.15)]",
    cite: "border-l-[#ff0050]/30 bg-[#ff0050]/5",
  },
  X: {
    card: "bg-white dark:bg-black border-zinc-200 dark:border-[#2F3336]",
    dot: "bg-black dark:bg-white",
    button:
      "bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200",
    glow: "shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.08)]",
    cite: "border-l-zinc-300 dark:border-l-zinc-700 bg-zinc-50 dark:bg-white/[0.03]",
  },
  Meta: {
    card: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900",
    dot: "bg-blue-600 dark:bg-blue-500",
    button: "bg-blue-600 hover:bg-blue-500 text-white",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    cite: "border-l-blue-500/30 bg-blue-500/5",
  },
  Reddit: {
    card: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900",
    dot: "bg-[#FF4500]", // Naranja Reddit
    button: "bg-[#FF4500] hover:bg-[#FF5722] text-white",
    glow: "shadow-[0_0_15px_rgba(255,69,0,0.1)] dark:shadow-[0_0_15px_rgba(255,69,0,0.15)]",
    cite: "border-l-[#FF4500]/30 bg-[#FF4500]/5",
  },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return "Ahora";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;

  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
};

export default function ThreadCard({
  thread,
  onMarkAsRead,
  onSelect,
}: ThreadCardProps) {
  const [isHandling, setIsHandling] = useState(false);
  const styles = themeStyles[thread.platform] || themeStyles.Facebook;

  // Variables de texto adaptativas para Modo Claro/Oscuro
  const textPrimary = "text-zinc-900 dark:text-white";
  const textSecondary = "text-zinc-600 dark:text-zinc-400";
  const textSubtle = "text-zinc-400 dark:text-zinc-500";

  const handleAction = () => {
    if (thread.deepLink) {
      window.open(thread.deepLink, "_blank");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: thread.isRead ? 0.98 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative flex flex-col p-6 rounded-[32px] border transition-all duration-500 ${styles.card} ${!thread.isRead ? styles.glow : ""}`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {!thread.isRead && (
            <div
              className={`w-2 h-2 rounded-full ${styles.dot} animate-pulse shadow-[0_0_8px_currentColor]`}
            />
          )}
          <span
            className={`text-[10px] uppercase font-black tracking-[0.2em] ${textSubtle}`}
          >
            {thread.platform} / {thread.postContext}
          </span>
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          {formatDate(thread.timestamp)}
        </span>
      </div>
      {/* Citación */}
      <div
        className={`mb-4 p-4 rounded-2xl border-l-4 ${styles.cite} overflow-hidden`}
      >
        <span
          className={`text-[9px] uppercase font-black tracking-widest ${textSubtle} block mb-1 opacity-70`}
        >
          Tú dijiste:
        </span>
        <p
          className={`text-xs italic leading-relaxed ${textSecondary} break-words line-clamp-3`}
        >
          "{thread.myOriginalComment}"
        </p>
      </div>

      {/* La Respuesta (Protagonista) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 grayscale opacity-30 dark:opacity-20">
          <div className="w-4 h-px bg-zinc-900 dark:bg-white" />
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            Respuesta
          </span>
        </div>
        <h2
          className={`text-xl font-medium leading-tight ${textPrimary} tracking-tight break-words line-clamp-3`}
        >
          "{thread.latestReply}"
        </h2>

        {thread.replyCount && thread.replyCount > 1 && (
          <div
            className={`mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${textSubtle}`}
          >
            y {thread.replyCount - 1} más...{" "}
            <ChevronRight className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {thread.isRead && (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500 opacity-60 dark:opacity-40" />
          )}
        </div>

        <button
          onClick={handleAction}
          disabled={isHandling}
          className={`${styles.button} text-[11px] font-black uppercase tracking-wider px-6 py-3 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2`}
        >
          {thread.isRead ? "Ver Hilo" : "Responder"}
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
