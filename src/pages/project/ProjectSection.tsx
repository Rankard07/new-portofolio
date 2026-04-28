import { CardHoverOverlays } from "@/components/ui/created/CardHoverOverlays";
import { ProjectCard } from "@/components/ui/created/ProjectCard";

export function ProjectsSection() {
  const projects = [
    {
      title: "POS Koemau",
      description:
        "A modern point of sale system for a local restaurant with inventory management and sales tracking.",
      technologies: [
        "Laravel",
        "React",
        "TypeScript",
        "InertiaJS",
        "TailwindCSS",
        "Shadcn/ui",
      ],
      liveLink: "#",
      githubLink: "https://github.com/Rankard07/pos-koemau",
      showcaseImage: "/img/pos-koemau/pos-koemau.1.png",
      moreImages: [
        "/img/pos-koemau/pos-koemau.2.png",
        "/img/pos-koemau/pos-koemau.3.png",
        "/img/pos-koemau/pos-koemau.4.png",
        "/img/pos-koemau/pos-koemau.5.png",
        "/img/pos-koemau/pos-koemau.6.png",
      ],
    },
    {
      title: "Landing Page KoeMau",
      description:
        "A landing page for a local restaurant with menu and contact information.",
      technologies: [
        "Astro",
        "React",
        "TypeScript",
        "TailwindCSS",
        "Shadcn/ui",
      ],
      liveLink:
        "https://rankard07.github.io/landing-page-koemau/#",
      githubLink:
        "https://github.com/Rankard07/landing-page-koemau",
      showcaseImage: "/img/landing-page/Landing-page.1.png",
      moreImages: [
        "/img/landing-page/Landing-page.2.png",
        "/img/landing-page/Landing-page.3.png",
        "/img/landing-page/Landing-page.4.png",
        "/img/landing-page/Landing-page.5.png",
        "/img/landing-page/Landing-page.6.png",
        "/img/landing-page/Landing-page.7.png",
        "/img/landing-page/Landing-page.8.png",
      ],
    },
    {
      title: "Perpustakaan",
      description:
        "A library management system with book inventory and borrowing tracking.",
      technologies: ["HTML", "CSS", "PHP"],
      liveLink: "#",
      githubLink:
        "https://github.com/Rankard07/haltev-exam2-perpustakaan",
      showcaseImage:
        "/img/exam2-perpustakaan/exam2-perpustakaan.1.png",
      moreImages: [
        "/img/exam2-perpustakaan/exam2-perpustakaan.2.png",
        "/img/exam2-perpustakaan/exam2-perpustakaan.3.png",
        "/img/exam2-perpustakaan/exam2-perpustakaan.4.png",
        "/img/exam2-perpustakaan/exam2-perpustakaan.5.png",
      ],
    },
    {
      title: "Old POS Koemau - Deprecated",
      description:
        "A deprecated POS system for a my mother frozen food.",
      technologies: [
        "Laravel",
        "PHP",
        "JavaScript",
        "TailwindCSS",
        "Shadcn/ui",
      ],
      liveLink: "#",
      githubLink: "https://github.com/Rankard07/koemau",
      showcaseImage: "/img/old-koemau/koemau.1.png",
      moreImages: [
        "/img/old-koemau/koemau.2.png",
        "/img/old-koemau/koemau.3.png",
        "/img/old-koemau/koemau.4.png",
        "/img/old-koemau/koemau.5.png",
      ],
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <CardHoverOverlays />
      <div className="max-w-7xl mx-auto">
        <div className="group relative bg-card border border-border rounded-xl p-8 lg:p-12 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-primary"></div>
            <h2>Featured Projects</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Here are some projects I've built during my
            bootcamp and personal learning journey. Each one
            taught me valuable lessons about development and
            design.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
