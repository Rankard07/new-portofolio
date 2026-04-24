import { useState } from "react";
import { SkillBadge } from "@/components/ui/created/SkillBadge";
import { CardHoverOverlays } from "@/components/ui/created/CardHoverOverlays";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiAstro,
  SiShadcnui,
  SiFigma,
  SiGit,
  SiGithub,
  SiNpm,
  SiDaisyui,
} from "react-icons/si";
import { Palette, Smartphone, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// CONSTANTS (Skill Icons)
// ============================================

const FRONTEND_ICONS = [
  {
    name: "Astro",
    icon: <SiAstro className="text-[#BC52EE]" />,
  },
  {
    name: "React",
    icon: <SiReact className="text-[#61DAFB]" />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-[#F7DF1E]" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-[#3178C6]" />,
  },
  {
    name: "HTML5",
    icon: <SiHtml5 className="text-[#E34F26]" />,
  },
  {
    name: "CSS3",
    icon: <SiCss className="text-[#1572B6]" />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-[#06B6D4]" />,
  },
  {
    name: "shadcn/ui",
    icon: <SiShadcnui className="text-foreground" />,
  },
];

const DESIGN_ICONS = [
  {
    name: "Figma",
    icon: <SiFigma className="text-[#F24E1E]" />,
  },
  {
    name: "UI/UX Design",
    icon: <Palette className="text-primary" />,
  },
  {
    name: "Responsive Design",
    icon: <Smartphone className="text-primary" />,
  },
  { name: "Prototyping", icon: <Layers className="text-primary" /> },
];

const TOOLS_ICONS = [
  {
    name: "Git",
    icon: <SiGit className="text-[#F05032]" />,
  },
  {
    name: "GitHub",
    icon: <SiGithub className="text-foreground" />,
  },
  {
    name: "VS Code",
    icon: <span className="text-[#007ACC] font-bold text-lg">VS</span>,
  },
  {
    name: "npm",
    icon: <SiNpm className="text-[#CB3837]" />,
  },
  {
    name: "DaisyUI",
    icon: <SiDaisyui />,
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"skills" | "techstack">("skills");

  return (
    <section id="skills" className="py-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12 transition duration-500 ease-in-out hover:border-fuchsia-500/50 dark:hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 relative overflow-hidden group">
          <CardHoverOverlays />
          <div className="relative z-10 flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-primary"></div>
            <h2>Skills & Technologies</h2>
          </div>

          {/* Tabs */}
          <div className="relative z-10 flex gap-1 mb-8 bg-muted/50 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("skills")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === "skills"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab("techstack")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === "techstack"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              Tech Stack
            </button>
          </div>

          {activeTab === "skills" && (
            <div className="relative z-10 space-y-12">
              {/* Front-End Development */}
              <div>
                <h3 className="mb-4">Front-End Development</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {FRONTEND_ICONS.map((skill, index) => (
                    <SkillBadge
                      key={index}
                      name={skill.name}
                      icon={skill.icon}
                    />
                  ))}
                </div>
              </div>

              {/* Design & UX */}
              <div>
                <h3 className="mb-4">Design & UX</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {DESIGN_ICONS.map((skill, index) => (
                    <SkillBadge
                      key={index}
                      name={skill.name}
                      icon={skill.icon}
                    />
                  ))}
                </div>
              </div>

              {/* Tools & Workflow */}
              <div>
                <h3 className="mb-4">Tools & Workflow</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {TOOLS_ICONS.map((skill, index) => (
                    <SkillBadge
                      key={index}
                      name={skill.name}
                      icon={skill.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "techstack" && (
            <div className="relative z-10 space-y-8">
              <p className="text-muted-foreground">
                My primary development stack and technologies I work with daily.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "React", desc: "UI Library", color: "#61DAFB" },
                  { name: "TypeScript", desc: "Type Safety", color: "#3178C6" },
                  { name: "Tailwind CSS", desc: "Styling", color: "#06B6D4" },
                  { name: "Vite", desc: "Build Tool", color: "#646CFF" },
                  { name: "Next.js", desc: "Framework", color: "#000000" },
                  { name: "Node.js", desc: "Runtime", color: "#339933" },
                  { name: "Git", desc: "Version Control", color: "#F05032" },
                  { name: "Figma", desc: "Design", color: "#F24E1E" },
                  { name: "Blender", desc: "3D Modeling", color: "#E87D0D" },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary/30 transition-all duration-200 hover:shadow-md hover:shadow-primary/5"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    <div>
                      <p className="font-medium text-sm">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tech.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
