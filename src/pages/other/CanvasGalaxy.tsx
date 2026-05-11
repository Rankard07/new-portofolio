import { useEffect, useRef } from "react";

/*
  CanvasGalaxy.tsx
  =================
  Implementasi Galaxy Disk + Black Hole menggunakan Canvas 2D (bukan DOM).

  Keuntungan Canvas vs DOM:
  - 1 canvas element = bisa gambar 5000+ partikel tanpa ribuan <div>
  - Blur/glow via shadow API (lebih ringan dari CSS box-shadow per-elemen)
  - Full control render pipeline
  - Tidak perlu install library apa pun (Canvas 2D native browser)

  Cara pakai:
  1. Import CanvasGalaxy di tempat OtherSection
  2. Ganti <OtherSection ... /> dengan <CanvasGalaxy />
  3. Atau gunakan bersamaan (Canvas di background, DOM di foreground)
*/

/* ---------- KONFIGURASI ---------- */
const CONFIG = {
  PARTICLE_COUNT: 6000, // bintang
  GAS_COUNT: 600, // partikel kabut
  ARM_STRENGTH: 0.85,
  SPIRAL_ARMS: 3,
  SPIRAL_TURNS: 2.2,
  ORBIT_BASE_X: 180,
  ORBIT_EXPAND_X: 360,
  ORBIT_BASE_Y: 90,
  ORBIT_EXPAND_Y: 180,
  ACCRETION_DISK_TILT: 45,
};

/* Warna bintang per tipe spektral (RGB) */
const STAR_COLORS: Record<
  string,
  {
    r: number;
    g: number;
    b: number;
    sizeMult: number;
    glowMult: number;
  }
> = {
  o: {
    r: 120,
    g: 180,
    b: 255,
    sizeMult: 4.0,
    glowMult: 2.2,
  }, // paling besar & terang
  b: {
    r: 190,
    g: 220,
    b: 255,
    sizeMult: 3.0,
    glowMult: 1.8,
  },
  a: {
    r: 245,
    g: 250,
    b: 255,
    sizeMult: 2.0,
    glowMult: 1.2,
  },
  f: {
    r: 255,
    g: 245,
    b: 230,
    sizeMult: 1.5,
    glowMult: 0.9,
  },
  g: {
    r: 255,
    g: 235,
    b: 190,
    sizeMult: 1.0,
    glowMult: 0.7,
  },
  k: {
    r: 255,
    g: 205,
    b: 140,
    sizeMult: 0.8,
    glowMult: 0.5,
  },
  m: {
    r: 255,
    g: 170,
    b: 140,
    sizeMult: 0.5,
    glowMult: 0.4,
  }, // paling kecil & redup
};

/* Frekuensi bintang (M paling umum, O paling langka) */
const STAR_WEIGHTS = {
  o: 0.00003,
  b: 0.12,
  a: 0.61,
  f: 3.0,
  g: 7.6,
  k: 12,
  m: 76,
};

/* ---------- TYPES ---------- */
interface Particle {
  x: number;
  y: number;
  angle: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  size: number;
  color: { r: number; g: number; b: number };
  glow: number;
  opacity: number;
  kind: "star" | "gas";
  tiltSin: number;
  tiltCos: number;
}

/* ---------- HELPERS ---------- */
function pickStarType(): string {
  const entries = Object.entries(STAR_WEIGHTS) as [
    string,
    number,
  ][];
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [t, w] of entries) {
    r -= w;
    if (r <= 0) return t;
  }
  return "m";
}

function generateParticles(): Particle[] {
  const tiltRad =
    (CONFIG.ACCRETION_DISK_TILT * Math.PI) / 180;
  const tiltSin = Math.sin(tiltRad);
  const tiltCos = Math.cos(tiltRad);

  const particles: Particle[] = [];

  for (
    let i = 0;
    i < CONFIG.PARTICLE_COUNT + CONFIG.GAS_COUNT;
    i++
  ) {
    const isGas = i >= CONFIG.PARTICLE_COUNT;
    const u = Math.sqrt(Math.random()); // kepadatan ke pusat
    const spiralT = u;

    const followArm = Math.random() < CONFIG.ARM_STRENGTH;
    const armIndex = Math.floor(
      Math.random() * CONFIG.SPIRAL_ARMS,
    );
    const baseAngle =
      (spiralT * 360 * CONFIG.SPIRAL_TURNS +
        (armIndex * 360) / CONFIG.SPIRAL_ARMS) %
      360;
    const armNoise = (Math.random() - 0.5) * 40;
    const angle0 = followArm
      ? baseAngle + armNoise
      : Math.random() * 360;

    const orbitJitter = 1 + (Math.random() - 0.5) * 0.3;
    const radiusX =
      (CONFIG.ORBIT_BASE_X + u * CONFIG.ORBIT_EXPAND_X) *
      orbitJitter;
    const radiusY =
      (CONFIG.ORBIT_BASE_Y + u * CONFIG.ORBIT_EXPAND_Y) *
      orbitJitter *
      (0.9 + Math.random() * 0.25);

    const speed = 6 + (1 - u) * 18;

    let color: { r: number; g: number; b: number };
    let size: number;
    let glow: number;
    let opacity: number;

    if (isGas) {
      /* Gas = warna nebula acak (ungu, biru, oranye muda) */
      const gasColors = [
        { r: 209, g: 190, b: 255 }, // ungu muda
        { r: 150, g: 201, b: 255 }, // biru muda
        { r: 255, g: 201, b: 150 }, // oranye muda
        { r: 180, g: 160, b: 255 }, // ungu
      ];
      color =
        gasColors[
          Math.floor(Math.random() * gasColors.length)
        ];
      size = 8 + Math.random() * 20;
      glow = 0.15;
      opacity = 0.18 + Math.random() * 0.2;
    } else {
      /* Star = berdasarkan tipe spektral */
      const type = pickStarType();
      const spec = STAR_COLORS[type];
      color = { r: spec.r, g: spec.g, b: spec.b };
      size = (0.3 + Math.random() * 0.8) * spec.sizeMult;
      glow = spec.glowMult;
      opacity = 0.8 + Math.random() * 0.2;
    }

    particles.push({
      x: 0,
      y: 0,
      angle: angle0,
      radiusX,
      radiusY,
      speed,
      size,
      color,
      glow,
      opacity,
      kind: isGas ? "gas" : "star",
      tiltSin,
      tiltCos,
    });
  }

  return particles;
}

/* ---------- COMPONENT ---------- */
interface CanvasGalaxyProps {
  /* Kalau true, canvas juga gambar black hole sederhana.
     Kalau false (default), hanya partikel — black hole
     ditangani oleh parent (DOM). */
  showBlackHole?: boolean;
}

export default function CanvasGalaxy({
  showBlackHole = false,
}: CanvasGalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Resize canvas ke ukuran container */
    function resize() {
      const parent = canvas!.parentElement!;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = parent.clientWidth * dpr;
      canvas!.height = parent.clientHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0); // CSS pixel scale
      canvas!.style.width = parent.clientWidth + "px";
      canvas!.style.height = parent.clientHeight + "px";
    }

    resize();
    particlesRef.current = generateParticles();

    /* ---------- ANIMATION LOOP ---------- */
    let lastTime = performance.now();

    function loop(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const w = canvas!.parentElement!.clientWidth;
      const h = canvas!.parentElement!.clientHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx!.clearRect(0, 0, w, h);

      /* ---- Draw Black Hole (opsional) ---- */
      if (showBlackHole) {
        /* Event horizon */
        ctx!.beginPath();
        ctx!.arc(cx, cy, 28, 0, Math.PI * 2);
        ctx!.fillStyle = "#000";
        ctx!.fill();

        /* Photon ring (glow tipis di sekitar) */
        ctx!.beginPath();
        ctx!.arc(cx, cy, 36, 0, Math.PI * 2);
        ctx!.strokeStyle = "rgba(255,255,255,0.06)";
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      /* ---- Update particle positions ---- */
      for (const p of particlesRef.current) {
        p.angle += p.speed * dt;
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * p.radiusX;
        const y = Math.sin(rad) * p.radiusY;
        p.x = cx + x * p.tiltCos - y * p.tiltSin;
        p.y = cy + x * p.tiltSin + y * p.tiltCos;
      }

      /* ---- Draw Gas (batch, no shadow) ---- */
      for (const p of particlesRef.current) {
        if (p.kind !== "gas") continue;
        ctx!.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      /* ---- Draw Star Glow (additive blending, batch) ---- */
      ctx!.globalCompositeOperation = "lighter";
      for (const p of particlesRef.current) {
        if (p.kind !== "star") continue;
        const glowSize = p.size * (1.5 + p.glow * 2);
        const glowOpacity = p.opacity * p.glow * 0.25;
        ctx!.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${glowOpacity})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";

      /* ---- Draw Star Cores (batch) ---- */
      for (const p of particlesRef.current) {
        if (p.kind !== "star") continue;
        ctx!.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      particlesRef.current = generateParticles();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [showBlackHole]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
