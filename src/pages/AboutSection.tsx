import { Code2, Palette, Sparkles } from "lucide-react";

// ============================================
// INTERFACES (Type Definitions)
// ============================================

// About Section Props
interface AboutSectionProps {
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  skills?: SkillItem[];
}

// Skills Section Type
interface SkillItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

// ============================================
// CONSTANTS (Default Content)
// ============================================

// Bio Section Constants
const DEFAULT_PARAGRAPH_1 =
  "I recently completed an intensive Full-Stack Web Development Bootcamp, where I discovered my true passion lies in front-end development and UI/UX design. I love the creative process of bringing designs to life and crafting intuitive user experiences.";

const DEFAULT_PARAGRAPH_2 =
  "I'm choosing to specialize in front-end development because I believe great interfaces are what make applications truly memorable and enjoyable to use. I embrace Agentic Engineering principles—combining AI-assisted development with human oversight to build high-quality, maintainable software.";

const DEFAULT_PARAGRAPH_3 =
  "I'm currently seeking opportunities where I can contribute to building beautiful, accessible, and performant web applications while continuing to grow my design skills.";

// Skills Section Constants
const DEFAULT_SKILLS: SkillItem[] = [
  {
    icon: <Code2 className="text-primary" size={24} />,
    title: "Clean Code",
    description:
      "Writing maintainable, semantic code following best practices and modern standards.",
  },
  {
    icon: <Palette className="text-primary" size={24} />,
    title: "Design Thinking",
    description:
      "User-centered approach to problem-solving with attention to detail and aesthetics.",
  },
  {
    icon: <Sparkles className="text-primary" size={24} />,
    title: "Continuous Learning",
    description:
      "Always exploring new technologies, design trends, and development techniques.",
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export function AboutSection({
  paragraph1 = DEFAULT_PARAGRAPH_1,
  paragraph2 = DEFAULT_PARAGRAPH_2,
  paragraph3 = DEFAULT_PARAGRAPH_3,
  skills = DEFAULT_SKILLS,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-primary"></div>
            <h2>About Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Bio Section */}
            <div>
              <p className="text-muted-foreground mb-4">{paragraph1}</p>
              <p className="text-muted-foreground mb-4">{paragraph2}</p>
              <p className="text-muted-foreground">{paragraph3}</p>
            </div>

            {/* Skills Section */}
            <div className="flex flex-col gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="mb-2">{skill.title}</h4>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
