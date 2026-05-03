import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

const SimpleDark = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    />
  );
};

const PaintStroke = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <motion.div
          className="w-32 h-1 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <motion.div
          className="mt-2 w-24 h-1 bg-primary/60 rounded-full mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />
      </div>
    </motion.div>
  );
};

const LogoText = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center px-4">
        <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] text-foreground mb-4">
          <span style={{ color: "hsl(var(--primary))" }}>DR. PAINT</span>
        </div>

        <div className="mx-auto w-24 h-1 bg-primary" />

        <div className="mt-6 text-xs md:text-sm tracking-[0.4em] text-muted-foreground uppercase flex items-center justify-center gap-2">
          <span>Expert</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>Painting</span>
        </div>
      </div>
    </motion.div>
  );
};

const Ready = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute inset-0 bg-background flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    />
  );
};

interface LoaderProps {
  onComplete: () => void;
}

const PremiumLoader = ({ onComplete }: LoaderProps) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 400);
    const t2 = setTimeout(() => setPhase(3), 1000);
    const t3 = setTimeout(() => setPhase(4), 1600);
    const t4 = setTimeout(() => onComplete(), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[300]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {phase === 1 && <SimpleDark key="dark" />}
        {phase === 2 && <PaintStroke key="paint" />}
        {phase === 3 && <LogoText key="logo" />}
        {phase === 4 && <Ready key="ready" onComplete={() => setPhase(4)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default PremiumLoader;