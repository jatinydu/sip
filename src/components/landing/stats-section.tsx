"use client";

import React from "react";
import { Building2, Users, TrendingUp, BarChart3 } from "lucide-react";
import { motion, useInView } from "framer-motion";

export function StatsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Building2,
      number: "5,000+",
      label: "Businesses growing with sip",
    },
    {
      icon: Users,
      number: "1M+",
      label: "Happy customers and counting",
    },
    {
      icon: TrendingUp,
      number: "3X",
      label: "More repeat visits on average",
    },
    {
      icon: BarChart3,
      number: "2.5M+",
      label: "Moments collected every month",
    },
  ];

  return (
    <section id="stats" className="bg-sip-navy py-16 md:py-20 overflow-hidden">
      <div className="section-container">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative">
          {/* Vertical dividers for desktop */}
          <div className="hidden md:block absolute left-1/4 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20" />
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20" />
          <div className="hidden md:block absolute left-3/4 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20" />

          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center text-center px-4"
            >
              <stat.icon className="size-8 text-sip-orange mb-4" strokeWidth={1.5} />
              
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : { y: "100%" }}
                  transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 + (index * 0.1) }}
                  className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                >
                  {stat.number}
                </motion.h3>
              </div>
              
              <p className="text-sm md:text-base text-white/70 mt-3 max-w-[180px] text-balance">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
