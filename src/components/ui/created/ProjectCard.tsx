import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
}

export function ProjectCard({
  title,
  description,
  technologies,
  liveLink,
  githubLink,
  image,
}: ProjectCardProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {image ?
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        : <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-6xl opacity-20">
              💻
            </span>
          </div>
        }
      </div>
      <div className="p-6">
        <h3 className="mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline">
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline">
              <FaGithub size={16} />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
