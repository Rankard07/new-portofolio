import { ProjectCard } from "@/components/ui/created/ProjectCard";

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform with shopping cart, product filtering, and responsive design.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
      ],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task manager with drag-and-drop functionality and real-time updates.",
      technologies: [
        "React",
        "Firebase",
        "Material-UI",
      ],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "Beautiful weather app with location search, forecasts, and animated weather icons.",
      technologies: [
        "React",
        "API Integration",
        "CSS3",
      ],
      liveLink: "#",
      githubLink: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "Responsive portfolio site with smooth animations and modern design principles.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
      ],
      liveLink: "#",
      githubLink: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-primary"></div>
            <h2>Featured Projects</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Here are some projects I've built
            during my bootcamp and personal
            learning journey. Each one taught me
            valuable lessons about development and
            design.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
