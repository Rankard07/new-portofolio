import { SkillBadge } from "@/components/ui/created/SkillBadge";
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
import { LuPalette, LuSmartphone, LuLayers } from "react-icons/lu";

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
    icon: <LuPalette className="text-primary" />,
  },
  {
    name: "Responsive Design",
    icon: <LuSmartphone className="text-primary" />,
  },
  { name: "Prototyping", icon: <LuLayers className="text-primary" /> },
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
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-primary"></div>
            <h2>Skills & Technologies</h2>
          </div>

          <div className="space-y-12">
            {/* Front-End Development */}
            <div>
              <h3 className="mb-4">Front-End Development</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {FRONTEND_ICONS.map((skill, index) => (
                  <SkillBadge key={index} name={skill.name} icon={skill.icon} />
                ))}
              </div>
            </div>

            {/* Design & UX */}
            <div>
              <h3 className="mb-4">Design & UX</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {DESIGN_ICONS.map((skill, index) => (
                  <SkillBadge key={index} name={skill.name} icon={skill.icon} />
                ))}
              </div>
            </div>

            {/* Tools & Workflow */}
            <div>
              <h3 className="mb-4">Tools & Workflow</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {TOOLS_ICONS.map((skill, index) => (
                  <SkillBadge key={index} name={skill.name} icon={skill.icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
