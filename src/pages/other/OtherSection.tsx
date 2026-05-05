import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { ArrowLeft } from "lucide-react";

interface OtherSectionProps {
  onBack?: () => void;
}

export function OtherSection({
  onBack,
}: OtherSectionProps) {
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!squareRef.current) return;

    /* Gerakan melingkar (radius sama untuk x dan y)
    const radius = 100;
    const state = { angle: 0 };

    const animation = animate(state, {
      angle: 360,
      duration: 3000,
      loop: true,
      ease: "linear",
      onLoop: () => console.log("Loop"),
      onBegin: () => console.log("Begin"),
      onUpdate: () => {
        if (!squareRef.current) return;
        const rad = (state.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        squareRef.current.style.transform = `translate(${x}px, ${y}px)`;
      },
    });
    */

    /* Gerakan oval (radius x > radius y)
    const radiusX = 270;
    const radiusY = 90;
    const state = { angle: 0 };

    const animation = animate(state, {
      angle: 360,
      duration: 4000,
      loop: true,
      ease: "linear",
      onUpdate: () => {
        if (!squareRef.current) return;
        const rad = (state.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radiusX;
        const y = Math.sin(rad) * radiusY;
        squareRef.current.style.transform = `translate(${x}px, ${y}px)`;
      },
    });
    */

    // Gerakan oval miring
    const radiusX = 270; // horizontal panjang
    const radiusY = 270; // vertikal pendek
    const tiltDeg = 0; // sudut miring oval dalam derajat
    const state = { angle: 0 };

    const animation = animate(state, {
      angle: 360,
      duration: 4000,
      loop: true,
      ease: "linear",
      onLoop: () => console.log("Loop"),
      onBegin: () => console.log("Begin"),
      onUpdate: () => {
        if (!squareRef.current) return;
        const rad = (state.angle * Math.PI) / 180;
        const tilt = (tiltDeg * Math.PI) / 180;

        // Koordinat oval sebelum dimiringkan
        const xOval = Math.cos(rad) * radiusX;
        const yOval = Math.sin(rad) * radiusY;

        // Rotasi koordinat agar oval jadi miring
        const x =
          xOval * Math.cos(tilt) - yOval * Math.sin(tilt);
        const y =
          xOval * Math.sin(tilt) + yOval * Math.cos(tilt);

        squareRef.current.style.transform = `translate(${x}px, ${y}px)`;
      },
    });

    return () => {
      animation.pause();
    };
  }, []);

  return (
    <section className="min-h-screen">
      {/* Custom Navbar for Other page */}
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center h-16 px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <span className="ml-4 font-medium">
            Other Works
          </span>
        </div>
      </nav>

      {/* Content */}
      <div className="p-8 flex justify-center items-center pt-36">
        <div ref={squareRef} className="square"></div>
      </div>
    </section>
  );
}
