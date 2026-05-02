// import { Box } from "lucide-react";

export function OtherSection() {
  return (
    <section
      id="other-section"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2>Other</h2>
      </div>
    </section>
  );
  /* const blenderProjects = [
    {
      title: "Character Modeling",
      description:
        "Low-poly character model with rigging for game asset.",
      status: "In Progress",
      icon: <Box className="w-6 h-6" />,
    },
  ];

  return (
    <section
      id="other"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="group relative bg-card border border-border rounded-xl p-8 lg:p-12 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-primary"></div>
            <h2>Other</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            My journey and progress learning Blender 3D
            modeling. Here are some of my recent works and
            ongoing projects.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blenderProjects.map((project, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {project.icon}
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === "Completed"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="font-medium mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 aspect-video bg-muted rounded-lg border border-border/50 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    3D Preview Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ); */
}
