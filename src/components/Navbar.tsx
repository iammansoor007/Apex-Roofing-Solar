import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  X,
  Menu,
  Star,
  Calendar,
  Building2,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Phone,
  FileText,
  Wrench,
  PaintBucket,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import logo from "../assets/apexlogoreal.png";
import logo2nd from "../assets/apexlogoreal.png";
import completeData from "../src/data/completeData.json";

const iconMap = {
  Home: () => <Home className="h-5 w-5" />,
  Briefcase: () => <Briefcase className="h-5 w-5" />,
  Users: () => <Users className="h-5 w-5" />,
  MessageSquare: () => <MessageSquare className="h-5 w-5" />,
  Phone: () => <Phone className="h-5 w-5" />,
  Star: () => <Star className="h-5 w-5" />,
  Shield: () => <ShieldCheck className="h-5 w-5" />,
  FileText: () => <FileText className="h-5 w-5" />,
};

const serviceIconMap = {
  Home: () => <Home className="h-6 w-6 text-primary" />,
  Building2: () => <Building2 className="h-6 w-6 text-primary" />,
  Wrench: () => <Wrench className="h-6 w-6 text-primary" />,
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isHoveringMegaMenu, setIsHoveringMegaMenu] = useState(false);
  const lastScrollY = useRef(0);

  const { services, companyLinks, cta } = completeData.navbar;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesMouseEnter = () => setActiveMegaMenu("services");
  const handleServicesMouseLeave = () => {
    setTimeout(() => {
      if (!isHoveringMegaMenu) setActiveMegaMenu(null);
    }, 150);
  };

  return (
    <><nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform-gpu ${hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled
          ? "bg-white/80 backdrop-blur-md shadow-xl py-1 border-b border-white/20"
          : "bg-white/80 py-2"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <motion.a
          href="#"
          className="relative h-16 w-32 md:w-40"
          whileHover={{ scale: 1.02 }}
        >
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="relative">
            <button
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all text-black hover:bg-black/5`}
            >
              <Zap className="h-4 w-4" />
              Services
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeMegaMenu === "services" ? "rotate-180" : ""}`} />
            </button>

            {/* Crystal Mega Menu */}
            <AnimatePresence>
              {activeMegaMenu === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  onMouseEnter={() => setIsHoveringMegaMenu(true)}
                  onMouseLeave={() => {
                    setIsHoveringMegaMenu(false);
                    setActiveMegaMenu(null);
                  }}
                  className="absolute left-0 top-full mt-4 w-[800px] bg-white/95 backdrop-blur-lg rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white/20 p-8 flex gap-8 transform-gpu"
                >
                  {/* Visual Feature Sidebar */}
                  <div className="w-64 bg-gradient-to-br from-primary to-primary/80 rounded-[1.5rem] p-8 text-white flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] pointer-events-none" />
                    <div className="relative z-10">
                      <Star className="h-8 w-8 mb-6 text-white/50" />
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none mb-4">
                        Top Rated <br /> Excellence
                      </h3>
                      <p className="text-white/70 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Over 200 Five-Star <br /> Google Reviews
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="relative z-10 flex items-center gap-3 text-xs font-black uppercase tracking-widest"
                    >
                      View Gallery <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>

                  {/* Services Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {services.map((service) => {
                      const Icon = serviceIconMap[service.icon as keyof typeof serviceIconMap] || serviceIconMap.Home;
                      return (
                        <motion.a
                          key={service.title}
                          href="#services"
                          whileHover={{ x: 5 }}
                          className="p-5 rounded-[1.5rem] transition-all hover:bg-black/5 group"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              <Icon />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                              {service.title}
                            </h4>
                          </div>
                          <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-widest">
                            Professional {service.title.split(' ')[0]} solutions for every project.
                          </p>
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {companyLinks.slice(1).map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap] || iconMap.Home;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all text-black hover:bg-black/5`}
              >
                <Icon />
                {link.label}
              </a>
            );
          })}
        </div>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-none text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20"
          >
            <Calendar className="h-4 w-4" />
            Free Quote
          </motion.a>

          <button
            onClick={() => setIsMenuOpen(true)}
            className={`lg:hidden p-2 rounded-full transition-all ${scrolled ? "text-foreground" : "text-white"}`}
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </div>
    </nav>

      {/* Modern Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[60] bg-background p-8 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <img src={logo2nd} alt="Logo" className="h-10 w-auto" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-muted rounded-full">
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="space-y-6">
              {services.map(s => (
                <a
                  key={s.title}
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-4xl font-black uppercase italic tracking-tighter text-foreground hover:text-primary"
                >
                  {s.title}
                </a>
              ))}
              <div className="h-px bg-border my-8" />
              {companyLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-xl font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-primary text-white py-6 rounded-2xl text-center font-black uppercase tracking-widest"
            >
              Get Your Free Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
