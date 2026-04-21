import { Mail } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-primary"></div>
            <h2>Get In Touch</h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-xl text-muted-foreground mb-12">
              I'm currently looking for front-end
              developer or UI/UX designer
              opportunities. Whether you have a
              question or just want to say hi,
              feel free to reach out!
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <a
                href="mailto:your.email@example.com"
                className="flex flex-col items-center gap-3 p-6 border border-border rounded-lg hover:border-primary transition-colors">
                <Mail
                  size={32}
                  className="text-primary"
                />
                <span className="text-muted-foreground">
                  Email
                </span>
                <span>
                  your.email@example.com
                </span>
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 border border-border rounded-lg hover:border-primary transition-colors">
                <FaGithub
                  size={32}
                  className="text-primary"
                />
                <span className="text-muted-foreground">
                  GitHub
                </span>
                <span>@yourusername</span>
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 border border-border rounded-lg hover:border-primary transition-colors">
                <FaLinkedin
                  size={32}
                  className="text-primary"
                />
                <span className="text-muted-foreground">
                  LinkedIn
                </span>
                <span>/in/yourprofile</span>
              </a>
            </div>
            <div className="text-center">
              <a
                href="mailto:your.email@example.com"
                className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Send Me a Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
