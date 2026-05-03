import React from "react";
import { motion } from "framer-motion";

interface PaintDividerProps {
  color?: string;
  className?: string;
  direction?: "up" | "down";
  flipped?: boolean;
  opacity?: string | number;
}

const PaintDivider: React.FC<PaintDividerProps> = ({ 
  color = "hsl(var(--primary))", 
  className = "", 
  direction = "down",
  flipped = false,
  opacity = 1
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden leading-[0] z-0 ${className}`}
      style={{ opacity }}
    >
      <motion.svg
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        className={`relative block w-full h-[100px] lg:h-[200px] ${flipped ? "scale-x-[-1]" : ""} ${direction === "up" ? "rotate-180" : ""}`}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <defs>
          <linearGradient id="paintGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="glossGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="paintRoughness">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>

        {/* Layer 1: The 'Deep Shadow' (Under-pass) */}
        <path
          d="M0,20 C150,40 300,10 450,50 C600,70 750,30 900,60 C1050,80 1200,40 1200,40 L1200,160 L0,160 Z"
          fill="url(#paintGradient)"
          opacity="0.15"
          filter="url(#paintRoughness)"
        />

        {/* Layer 2: Secondary Flow */}
        <path
          d="M0,50 C150,70 300,40 450,80 C600,100 750,60 900,90 C1050,110 1200,70 1200,70 L1200,160 L0,160 Z"
          fill="url(#paintGradient)"
          opacity="0.4"
          filter="url(#paintRoughness)"
        />

        {/* Layer 3: Main Roller Pass (Organic edge) */}
        <path
          d="M0,80 L15,75 L30,82 L45,78 L60,85 L75,81 L90,88 L105,84 L120,91 L135,87 L150,94 L165,90 L180,97 L195,93 L210,100 L225,96 L240,103 L255,99 L270,106 L285,102 L300,109 L315,105 L330,112 L345,108 L360,115 L375,111 L390,118 L405,114 L420,121 L435,117 L450,124 L465,120 L480,127 L495,123 L510,130 L525,126 L540,133 L555,129 L570,136 L585,132 L600,139 L615,135 L630,142 L645,138 L660,145 L675,141 L690,148 L705,144 L720,151 L735,147 L750,154 L765,150 L780,157 L795,153 L810,160 L825,156 L840,163 L855,159 L870,166 L885,162 L900,169 L915,165 L930,172 L945,168 L960,175 L975,171 L990,178 L1005,174 L1020,181 L1035,177 L1050,184 L1065,180 L1080,187 L1095,183 L1110,190 L1125,186 L1140,193 L1155,189 L1170,196 L1185,192 L1200,199 L1200,160 L0,160 Z"
          fill="url(#paintGradient)"
        />

        {/* Layer 4: Glossy Reflection Pass */}
        <path
          d="M0,82 L1200,113"
          stroke="url(#glossGradient)"
          strokeWidth="10"
          opacity="0.3"
          filter="blur(4px)"
        />

        {/* Layer 5: High-Detail Bristle Grain */}
        <g opacity="0.1">
          {Array.from({ length: 12 }).map((_, i) => (
            <path 
              key={i}
              d={`M0,${85 + i * 4} L1200,${115 + i * 4}`}
              stroke={i % 2 === 0 ? "white" : "black"}
              strokeWidth="0.5"
              strokeDasharray={`${2 + i},${10 + i}`}
            />
          ))}
        </g>

        {/* Layer 6: Advanced Micro-splatter */}
        <g fill="url(#paintGradient)">
          {Array.from({ length: 60 }).map((_, i) => (
            <circle 
              key={i} 
              cx={i * 20 + Math.random() * 30} 
              cy={80 + Math.random() * 40} 
              r={0.2 + Math.random() * 1.5} 
              opacity={0.1 + Math.random() * 0.5}
            />
          ))}
        </g>

        {/* Layer 7: Organic Drip Points */}
        <g fill="url(#paintGradient)" opacity="0.8">
          <path d="M150,105 Q152,120 150,135 T148,150" />
          <path d="M450,118 Q452,130 450,142" />
          <path d="M850,140 Q852,155 850,170" />
        </g>

        {/* Layer 8: Final Wet-Glint Highlight */}
        <path
          d="M0,82 L1200,113"
          stroke="white"
          strokeWidth="0.8"
          opacity="0.25"
          filter="blur(0.5px)"
        />
      </motion.svg>
    </div>
  );
};

export default PaintDivider;
