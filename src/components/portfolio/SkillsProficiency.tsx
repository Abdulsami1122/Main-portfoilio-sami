"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Atom, 
  Server, 
  Database, 
  Globe, 
  Terminal, 
  Layers, 
  Code2, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  GraduationCap, 
  School,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface SkillItem {
  id: string;
  name: string;
  category: "FullStack" | "Frontend" | "Backend" | "Databases" | "DevOps";
  percentage: number;
  level: "Mastery" | "Expert" | "Advanced";
  years: string;
  icon: React.ReactNode;
  highlights: string[];
  color: string;
}

// Animated Percentage Counter Component
const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}%</span>;
};

export const SkillsProficiency: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const skills: SkillItem[] = [
    {
      id: "pern",
      name: "PERN Stack (PostgreSQL, Express, React, Node)",
      category: "FullStack",
      percentage: 96,
      level: "Mastery",
      years: "2+ Years",
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      color: "from-emerald-500 to-teal-400",
      highlights: ["Double-entry accounting architecture", "Complex relational models", "REST APIs", "Tailwind CSS"]
    },
    {
      id: "mern",
      name: "MERN Stack (MongoDB, Express, React, Node)",
      category: "FullStack",
      percentage: 95,
      level: "Mastery",
      years: "2+ Years",
      icon: <Layers className="w-5 h-5 text-cyan-500" />,
      color: "from-cyan-500 to-blue-500",
      highlights: ["Full e-commerce architectures", "Mongoose schema design", "Authentication & JWT", "Redux Toolkit"]
    },
    {
      id: "react-next",
      name: "React.js & Next.js 15 (App Router)",
      category: "Frontend",
      percentage: 95,
      level: "Mastery",
      years: "2+ Years",
      icon: <Atom className="w-5 h-5 text-sky-400" />,
      color: "from-sky-400 to-indigo-500",
      highlights: ["Server Components & SSR", "Performance optimization", "Framer Motion", "Responsive UX"]
    },
    {
      id: "node-express",
      name: "Node.js & Express.js",
      category: "Backend",
      percentage: 94,
      level: "Expert",
      years: "2+ Years",
      icon: <Server className="w-5 h-5 text-green-500" />,
      color: "from-green-500 to-emerald-600",
      highlights: ["RESTful API design", "Middleware pipelines", "Error handling", "Async architectures"]
    },
    {
      id: "postgres",
      name: "PostgreSQL & Database Architecture",
      category: "Databases",
      percentage: 93,
      level: "Expert",
      years: "2+ Years",
      icon: <Database className="w-5 h-5 text-blue-500" />,
      color: "from-blue-500 to-indigo-600",
      highlights: ["Custom Chart of Accounts", "ACID transactions", "Query optimization", "Indexing"]
    },
    {
      id: "mongo",
      name: "MongoDB & Document Databases",
      category: "Databases",
      percentage: 92,
      level: "Expert",
      years: "2+ Years",
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      color: "from-emerald-500 to-green-600",
      highlights: ["Aggregation pipelines", "Schema indexing", "High-volume data storage", "Cloud Atlas"]
    },
    {
      id: "auth-apis",
      name: "REST APIs & JWT Security / Auth",
      category: "Backend",
      percentage: 95,
      level: "Mastery",
      years: "2+ Years",
      icon: <Globe className="w-5 h-5 text-amber-500" />,
      color: "from-amber-400 to-orange-500",
      highlights: ["RBAC (Role-based access)", "Bearer tokens & Refresh", "CORS & Rate Limiting", "Webhooks"]
    },
    {
      id: "linux-devops",
      name: "Linux Servers & Production Deployments",
      category: "DevOps",
      percentage: 90,
      level: "Advanced",
      years: "2+ Years",
      icon: <Terminal className="w-5 h-5 text-neutral-400" />,
      color: "from-neutral-500 to-neutral-700",
      highlights: ["Ubuntu/Debian VPS", "Nginx reverse proxy", "SSL / Let's Encrypt", "PM2 process manager"]
    },
    {
      id: "typescript",
      name: "TypeScript & Modern JavaScript",
      category: "Frontend",
      percentage: 92,
      level: "Expert",
      years: "2+ Years",
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      color: "from-blue-400 to-sky-600",
      highlights: ["Strict type safety", "Generics & Interfaces", "Async/Await", "Clean design patterns"]
    },
    {
      id: "tailwind",
      name: "Tailwind CSS & UI Systems",
      category: "Frontend",
      percentage: 98,
      level: "Mastery",
      years: "2+ Years",
      icon: <Sparkles className="w-5 h-5 text-teal-400" />,
      color: "from-teal-400 to-emerald-500",
      highlights: ["Responsive layouts", "Dark / Light theme systems", "Micro-animations", "Clean modern aesthetics"]
    },
  ];

  const educationRecords = [
    {
      degree: "Bachelor of Software Engineering (BS SE)",
      duration: "2022 - 2026",
      institution: "Islamia College University, Peshawar",
      status: "Final Year Undergraduate",
      description: "Rigorous curriculum encompassing Object-Oriented Software Engineering, Data Structures & Algorithms, Database Systems, Distributed Computing, and Web Engineering.",
    },
    {
      degree: "FSc in Computer Science (Intermediate)",
      duration: "2020 - 2022",
      institution: "Farabi Degree College, Tehkal, Peshawar",
      status: "Completed with Distinction",
      description: "Core foundations in computer architecture, mathematics, boolean logic, and algorithms.",
    },
  ];

  const marqueeTechnologies = [
    "React.js", "Next.js 15", "Node.js", "Express.js", "PostgreSQL",
    "MongoDB", "TypeScript", "Tailwind CSS", "Linux Servers", "REST APIs",
    "JWT Auth", "Docker", "Redux Toolkit", "Git & GitHub", "MySQL"
  ];

  const categories = ["ALL", "FullStack", "Frontend", "Backend", "Databases", "DevOps"];

  const filteredSkills = activeCategory === "ALL"
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="space-y-10">
      {/* Header & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Technical Proficiency & Competency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mt-2">
            Verified technical stack across MERN and PERN ecosystems with animated proficiency meters and real-world production experience.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/60 dark:bg-muted/40 rounded-xl border border-border">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-primary rounded-lg shadow-xs"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Marquee / Tech Strip */}
      <div className="rounded-2xl bg-card border border-border p-4 shadow-xs overflow-hidden">
        <div className="text-xs font-semibold text-muted-foreground mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Core Ecosystem Technologies</span>
          </span>
          <span className="text-[11px] text-primary font-medium">Continuous Production Stack</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {marqueeTechnologies.map((tech, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-muted/50 hover:bg-muted border border-border/80 text-foreground text-xs font-semibold shrink-0 flex items-center gap-2.5 transition-all cursor-default shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{tech}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Skills Proficiency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-card hover:bg-card/90 border border-border hover:border-primary/40 rounded-2xl p-5 shadow-xs transition-all space-y-4"
            >
              {/* Skill Top Bar */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-muted group-hover:scale-110 transition-transform shadow-2xs">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-full bg-muted font-medium text-[11px]">
                        {skill.category}
                      </span>
                      <span>•</span>
                      <span>{skill.years}</span>
                    </div>
                  </div>
                </div>

                {/* Animated Percentage Badge */}
                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-black text-foreground font-mono">
                    <AnimatedCounter target={skill.percentage} />
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-1.5">
                <div className="relative w-full h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  >
                    {/* Glowing head pulse */}
                    <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 rounded-full animate-pulse" />
                  </motion.div>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Foundations</span>
                  <span>Advanced</span>
                  <span className="text-primary font-semibold">Production Ready</span>
                </div>
              </div>

              {/* Highlights checklist */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/60">
                {skill.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Education Credentials Section */}
      <div className="pt-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Academic Education & Degrees
            </h3>
            <p className="text-xs text-muted-foreground">
              Formal computer science foundations in algorithms, databases, and engineering principles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {educationRecords.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-muted text-foreground">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">
                      {edu.degree}
                    </h4>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {edu.institution}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono shrink-0">
                  {edu.duration}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
