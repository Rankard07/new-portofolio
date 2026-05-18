import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import CanvasGalaxy from "./CanvasGalaxy";
// import { ArrowLeft } from "lucide-react";

interface OtherSectionProps {
  onBack?: () => void;
}

/*
  ================================================================
  LEGACY DOM PARTICLE CODE (dikomentari)
  Sekarang partikel & gas di-render oleh CanvasGalaxy (Canvas 2D).
  Code ini disimpan untuk referensi jika perlu revert ke DOM.
  ================================================================

function generateGasBlobs(count: number): GasBlobConfig[] { ... }
interface ParticleConfig { ... }
interface GasBlobConfig { ... }
type StarType = "o" | "b" | "a" | "f" | "g" | "k" | "m";
const STAR_TYPE_WEIGHTS: Record<StarType, number> = { ... };
function pickStarType(): StarType { ... }

const ORBIT_BASE_X = 180;
const ORBIT_EXPAND_X = 360;
const ORBIT_BASE_Y = 90;
const ORBIT_EXPAND_Y = 180;
const ACCRETION_DISK_TILT = 45;
const PARTICLE_COUNT = 2000;
const ENTRY_DURATION_MIN = 900;
const ENTRY_DURATION_VAR = 700;
const SPIRAL_ARMS = 3;
const SPIRAL_TURNS = 2.2;
const SPIRAL_ARM_SPREAD_DEG = 18;
const ORBIT_JITTER = 0.18;
const TILT_JITTER_DEG = 7;
const ARM_STRENGTH = 0.32;
const GAS_COUNT = 0;
const GAS_BLOB_COUNT = 20;

function generateParticles(starCount: number, gasCount: number): ParticleConfig[] { ... }
*/

export function OtherSection({
  onBack,
}: OtherSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerWrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  /*
    DOM particle refs & state — DIKOMENTARI karena
    sekarang partikel diganti dengan CanvasGalaxy (Canvas 2D).
    Code ini disimpan untuk referensi jika perlu revert.
  */
  /*
  const particleElsRef = useRef<Array<HTMLDivElement | null>>([]);
  const gasElsRef = useRef<Array<HTMLDivElement | null>>([]);
  const particleStatesRef = useRef({ orbitAngle: [], scale: [], opacity: [], entryAnim: [] });

  const configs = useMemo(() => generateParticles(PARTICLE_COUNT, GAS_COUNT), []);
  const gasBlobs = useMemo(() => generateGasBlobs(GAS_BLOB_COUNT), []);
  */

  // ============================================================
  // INTRO ANIMATION: Scene + Black Hole zoom-out & fade-in
  // ============================================================
  useEffect(() => {
    const container = containerRef.current;
    const centerWrapper = centerWrapperRef.current;
    if (!container || !centerWrapper) return;

    container.style.opacity = "0";
    container.style.transform = "scale(2.6)";

    centerWrapper.style.opacity = "0";
    centerWrapper.style.transform =
      "translate(-50%, -50%) scale(3.5)";

    const sceneState = { scale: 2.6, opacity: 0 };
    animate(sceneState, {
      scale: 1,
      opacity: 1,
      duration: 1600,
      ease: "easeOutCubic",
      onUpdate: () => {
        container.style.transform = `scale(${sceneState.scale})`;
        container.style.opacity = String(
          sceneState.opacity,
        );
      },
    });

    const centerState = { scale: 3.5, opacity: 0 };
    animate(centerState, {
      scale: 1,
      opacity: 1,
      duration: 1700,
      delay: 150,
      ease: "easeOutCubic",
      onUpdate: () => {
        centerWrapper.style.transform = `translate(-50%, -50%) scale(${centerState.scale})`;
        centerWrapper.style.opacity = String(
          centerState.opacity,
        );
      },
    });
  }, []);

  // ============================================================
  // OUTRO ANIMATION: Black Hole Expansion then Scene Zoom-In
  // ============================================================
  const handleBackWithAnimation = () => {
    if (isExiting) return;
    setIsExiting(true);

    const container = containerRef.current;
    const centerWrapper = centerWrapperRef.current;
    if (!container || !centerWrapper) {
      onBack?.();
      return;
    }

    // 1. Animasi Black Hole membesar sangat cepat (Efek menelan layar)
    const centerState = { scale: 1 };
    animate(centerState, {
      scale: 30, // Sangat besar agar menutupi seluruh pandangan
      duration: 800,
      ease: "easeInExpo",
      onUpdate: () => {
        centerWrapper.style.transform = `translate(-50%, -50%) scale(${centerState.scale})`;
      },
    });

    // 2. Animasi Scene Zoom In & Fade Out (Kebalikan dari Intro)
    const sceneState = { scale: 1, opacity: 1 };
    animate(sceneState, {
      scale: 2.6,
      opacity: 0,
      duration: 1000,
      delay: 200, // Mulai sedikit setelah black hole mulai membesar
      ease: "easeInQuart",
      onUpdate: () => {
        container.style.transform = `scale(${sceneState.scale})`;
        container.style.opacity = String(
          sceneState.opacity,
        );
      },
      complete: () => {
        onBack?.();
      },
    });
  };

  /*
    ============================================================
    PARTICLE ENTRY + ORBIT LOOP (LEGACY — DOM version)
    Sekarang partikel diganti dengan CanvasGalaxy (Canvas 2D).
    Code ini disimpan untuk referensi.
    ============================================================
  */
  /*
  useEffect(() => {
    ... (DOM particle RAF loop code) ...
  }, [configs, gasBlobs]);
  */

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Custom Navbar for Other page */}
      {/* <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
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
      </nav> */}

      {/* ============================================ */}
      {/* LAYER ANIMASI — fullscreen di belakang konten */}
      {/* ============================================ */}
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden galaxy-scene ${isHovered ? "bh-hovered" : ""}`}
      >
        <div className="galaxy-disk" />
        {/* {gasBlobs.map((g, idx) => (
          <div
            key={`gas-${g.id}`}
            ref={(element) => {
              gasElsRef.current[idx] = element;
            }}
            className="gas-blob"
            style={{
              width: `${g.width}px`,
              height: `${g.height}px`,
              marginTop: `${-g.height / 2}px`,
              marginLeft: `${-g.width / 2}px`,
              opacity: g.opacity,
              borderRadius: g.borderRadius,
            }}
          />
        ))} */}
        {/* <div className="galaxy-cloud galaxy-cloud-1" />
        <div className="galaxy-cloud galaxy-cloud-2" />
        <div className="galaxy-cloud galaxy-cloud-3" /> */}

        {/* <div
          // onClick={onBack}
          // onMouseEnter={() => setIsHovered(true)}
          onClick={handleBackWithAnimation}
          onMouseEnter={() =>
            !isExiting && setIsHovered(true)
          }
          onMouseLeave={() => setIsHovered(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (
              (e.key === "Enter" || e.key === " ") &&
              !isExiting
            ) {
              handleBackWithAnimation();
            }
          }}
          aria-label="Go back"
          className={
            isExiting
              ? "pointer-events-none"
              : "cursor-pointer"
          }
        > */}

        {/* Interactive Layer for Black Hole */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {/* Black Hole Center Wrapper — menampung center, pulse, dan ring */}
          <div
            ref={centerWrapperRef}
            className="black-hole-center-wrapper"
          >
            <div
              className={`black-hole-center pointer-events-auto ${isExiting ? "pointer-events-none" : "cursor-pointer"}`}
              onClick={handleBackWithAnimation}
              onMouseEnter={() =>
                !isExiting && setIsHovered(true)
              }
              onMouseLeave={() => setIsHovered(false)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (
                  (e.key === "Enter" || e.key === " ") &&
                  !isExiting
                ) {
                  handleBackWithAnimation();
                }
              }}
              aria-label="Go back"
            />
            <div className="black-hole-pulse" />
            <div className="black-hole-ring" />
          </div>
          {/* <div className="event-horizon" /> */}
        </div>

        {/* Galaxy particles via Canvas (performant) */}
        <CanvasGalaxy showBlackHole={false} />
      </div>

      {/*
      Legacy implementation (kept for backup):
      - Particle entry spiral by spawnSide
      - Phase transition entering -> orbiting
      - glow-sphere warm/cool styling
      */}

      {/* ============================================ */}
      {/* CONTENT LAYER */}
      {/* ============================================ */}
      {/* <div className="relative z-10 pt-20 pb-16 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl md:text-5xl font-heading mb-4 text-foreground">
          Other Works
        </h1>
        <p className="text-muted-foreground text-center max-w-lg">
          A collection of experiments, creative coding, and
          miscellaneous projects.
        </p>
      </div> */}
    </section>
  );
}
