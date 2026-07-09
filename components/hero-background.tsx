"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  GraduationCap,
  School,
  Backpack,
  Pencil,
  NotebookPen,
  Trophy,
  Globe,
  Award,
} from "lucide-react"

type FloatItem = {
  icon: React.ElementType
  top: string
  left: string
  size: number
  duration: number
  delay: number
  drift: number
}

const items: FloatItem[] = [
  { icon: BookOpen, top: "18%", left: "8%", size: 30, duration: 9, delay: 0, drift: 22 },
  { icon: GraduationCap, top: "26%", left: "84%", size: 38, duration: 11, delay: 0.6, drift: 28 },
  { icon: School, top: "62%", left: "12%", size: 34, duration: 12, delay: 1.1, drift: 20 },
  { icon: Backpack, top: "72%", left: "80%", size: 30, duration: 10, delay: 0.3, drift: 24 },
  { icon: Pencil, top: "40%", left: "5%", size: 26, duration: 8, delay: 1.5, drift: 18 },
  { icon: NotebookPen, top: "80%", left: "40%", size: 28, duration: 13, delay: 0.9, drift: 26 },
  { icon: Trophy, top: "14%", left: "60%", size: 28, duration: 10, delay: 1.8, drift: 22 },
  { icon: Globe, top: "55%", left: "90%", size: 34, duration: 12, delay: 0.4, drift: 30 },
  { icon: Award, top: "82%", left: "62%", size: 26, duration: 9, delay: 2.1, drift: 20 },
]

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.28_0.09_275)_0%,transparent_45%),radial-gradient(circle_at_80%_30%,oklch(0.3_0.1_320)_0%,transparent_45%),radial-gradient(circle_at_50%_90%,oklch(0.26_0.09_250)_0%,transparent_50%)]" />

      {/* glowing blurred circles */}
      <motion.div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand/30 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent-purple/25 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-chart-3/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* particles */}
      {Array.from({ length: 26 }).map((_, i) => {
        const left = (i * 37) % 100
        const top = (i * 53) % 100
        const size = 2 + (i % 3)
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: (i % 7) * 0.4,
            }}
          />
        )
      })}

      {/* floating educational icons */}
      {items.map(({ icon: Icon, top, left, size, duration, delay, drift }, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur-md"
          style={{ top, left }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -drift, 0],
            rotate: [0, i % 2 === 0 ? 6 : -6, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: 1 + delay },
            scale: { duration: 1, delay: 1 + delay },
            y: { duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
            rotate: { duration: duration + 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
          }}
        >
          <Icon style={{ width: size, height: size }} className="text-white/80" strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* subtle grid + vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.1_0.02_265/0.7)_100%)]" />
    </div>
  )
}
