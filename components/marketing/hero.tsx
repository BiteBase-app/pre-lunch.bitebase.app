"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-background to-muted">
      {/* Background decoration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl transform rotate-45"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl font-bold tracking-tighter font-display sm:text-5xl md:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t("common.appName")}
            </motion.h1>
            <motion.p
              className="text-2xl font-semibold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t("common.tagline")}
            </motion.p>
            <motion.p
              className="text-muted-foreground md:text-xl max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {t("common.description")}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link href="/subscribe">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
                  {t("common.startTrial")}
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t("common.watchDemo")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[400px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full perspective-1000">
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64"
                  initial={{ rotateY: 15, rotateX: 10 }}
                  animate={{
                    rotateY: [15, 5, 15],
                    rotateX: [10, 5, 10],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 6,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-300 to-amber-500 rounded-full opacity-80 blur-md"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 4,
                    }}
                  />
                  <motion.div
                    className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-xl transform rotate-12"
                    animate={{
                      rotate: [12, 15, 12],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 5,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-xl transform -rotate-6"
                    animate={{
                      rotate: [-6, -10, -6],
                      y: [0, 5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 7,
                      delay: 0.5,
                    }}
                  />
                  <motion.div
                    className="absolute top-20 right-5 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      y: [0, -8, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 6,
                      delay: 1,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-5 left-20 w-20 h-36 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-xl transform rotate-45"
                    animate={{
                      rotate: [45, 50, 45],
                      x: [0, 5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 8,
                      delay: 2,
                    }}
                  />
                </motion.div>
              </div>
              <span className="absolute bottom-4 right-4 text-sm font-medium text-white bg-black/50 px-2 py-1 rounded">
                3D Food & Beverage Visualization
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

