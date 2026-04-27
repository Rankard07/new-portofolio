import { ExternalLink, Images, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  showcaseImage?: string;
  moreImages?: string[];
}

export function ProjectCard({
  title,
  description,
  technologies,
  liveLink,
  githubLink,
  showcaseImage,
  moreImages,
}: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {showcaseImage ? (
          <img
            src={showcaseImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-6xl opacity-20">💻</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {liveLink && liveLink !== "#" ? (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          ) : (
            <span className="flex items-center gap-2 text-muted-foreground cursor-not-allowed">
              <ExternalLink size={16} />
              Live Demo
            </span>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <FaGithub size={16} />
              Code
            </a>
          )}
          {moreImages && moreImages.length > 0 && (
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 text-primary hover:underline cursor-pointer"
            >
              <Images size={16} />
              More Images
            </button>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl w-full max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title} - Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {moreImages?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className="rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer p-0 bg-transparent"
              >
                <img
                  src={img}
                  alt={`${title} screenshot ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="sm:max-w-6xl w-full max-h-[95vh] p-0 overflow-hidden bg-background/95">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Fullscreen view"
              className="w-full h-full object-contain max-h-[90vh]"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
