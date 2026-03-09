import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Logo = ({ className = "", isLight = false }: { className?: string, isLight?: boolean }) => {
  return (
    <motion.div 
      className={`flex items-center gap-3 group cursor-pointer ${className}`}
      whileHover="hover"
    >
      <div className="relative">
        {/* Abstract Truck/Gear Shape */}
        <motion.div 
          className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 relative z-10 overflow-hidden"
          variants={{
            hover: { rotate: 10, scale: 1.05 }
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized Truck silhouette */}
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
          
          {/* Animated Shine Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full"
            variants={{
              hover: { translateX: '200%', transition: { duration: 0.6, ease: "easeInOut" } }
            }}
          />
        </motion.div>
        
        {/* Background Glow */}
        <motion.div 
          className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-0 -z-10"
          variants={{
            hover: { opacity: 0.4, scale: 1.2 }
          }}
        />
      </div>

      <div className="flex flex-col">
        <motion.span 
          className={cn(
            "text-2xl font-display font-bold leading-none tracking-tight transition-colors duration-500",
            isLight ? "text-white" : "text-slate-900"
          )}
          variants={{
            hover: { color: isLight ? "#93c5fd" : "#2563eb" }
          }}
        >
          C & D
        </motion.span>
        <motion.span 
          className={cn(
            "text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5 transition-colors duration-500",
            isLight ? "text-white/70" : "text-slate-500"
          )}
          variants={{
            hover: { letterSpacing: "0.25em" }
          }}
        >
          Fabricaciones
        </motion.span>
      </div>
    </motion.div>
  );
};
