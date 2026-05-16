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
  PARTICLE_COUNT: 6000, // Jumlah total bintang. (Mempengaruhi kepadatan visual galaksi)
  GAS_COUNT: 100, // Jumlah awan nebula. (Mempengaruhi ketebalan kabut warna di latar belakang)
  ARM_STRENGTH: 0.85, // Kerapatan spiral. (Mempengaruhi seberapa jelas bentuk lengan galaksi terbentuk)
  SPIRAL_ARMS: 3, // Jumlah lengan galaksi. (Mempengaruhi struktur percabangan galaksi)
  SPIRAL_TURNS: 1, // Putaran lengan. (Mempengaruhi seberapa melilit lengan spiral ke arah pusat)
  ORBIT_BASE_X: 180, // Ukuran inti horizontal. (Mempengaruhi lebar kekosongan di tengah galaksi)
  ORBIT_EXPAND_X: 360, // Jangkauan luar horizontal. (Mempengaruhi bentangan sayap galaksi ke samping)
  ORBIT_BASE_Y: 90, // Ukuran inti vertikal. (Mempengaruhi tinggi/ketebalan piringan galaksi)
  ORBIT_EXPAND_Y: 180, // Jangkauan luar vertikal. (Mempengaruhi volume sebaran partikel ke atas/bawah)
  ACCRETION_DISK_TILT: 45, // Sudut pandang kamera. (Mempengaruhi kemiringan orientasi galaksi di layar)
  ROTATION_SPEED: 0.2, // Kecepatan putar. (Mempengaruhi seberapa cepat partikel mengorbit pusat)
  VISUAL_MULTIPLIER: 2, // Pengganda simetris. (Mempengaruhi jumlah visual tanpa menambah beban kalkulasi berat)
  GAS_SIZE_BASE: 150, // Radius dasar gas. (Mempengaruhi lebar satu gumpalan kabut nebula)
  GAS_SIZE_VAR: 12, // Variasi ukuran gas. (Mempengaruhi perbedaan ukuran antar gumpalan agar tidak seragam)
  STAR_GLOW_INTENSITY: 3.5, // Kekuatan pendaran bintang. (Mempengaruhi ukuran aura cahaya di sekitar bintang)
  GAS_OPACITY_BASE: 0.08, // Transparansi dasar gas. (Mempengaruhi kepekatan warna nebula)
  GAS_OPACITY_VAR: 0.02, // Variasi kecerahan gas. (Mempengaruhi kontras antar bagian nebula)
  STAR_GLOW_FALLOFF: 1.0, // Titik pemudaran bintang (0.0 - 1.0). (Mempengaruhi ketajaman tepi pendaran cahaya bintang)
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

    const speed =
      (6 + (1 - u) * 18) * CONFIG.ROTATION_SPEED;

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
      size =
        CONFIG.GAS_SIZE_BASE +
        Math.random() * CONFIG.GAS_SIZE_VAR;
      glow = 0.15;
      opacity =
        CONFIG.GAS_OPACITY_BASE +
        Math.random() * CONFIG.GAS_OPACITY_VAR;
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

    /* Helper untuk pre-render tekstur glow/gas (Offscreen Canvas) agar tidak lag */
    const spriteCache = new Map<
      string,
      HTMLCanvasElement
    >();
    function getGlowSprite(
      r: number,
      g: number,
      b: number,
      falloff: number = 1.0,
    ) {
      const key = `${r},${g},${b},${falloff}`;
      if (spriteCache.has(key))
        return spriteCache.get(key)!;

      const canvas = document.createElement("canvas");
      const size = 64; // Resolusi sprite cukup kecil agar hemat memori
      canvas.width = size;
      canvas.height = size;
      const tCtx = canvas.getContext("2d")!;
      const center = size / 2;
      const grad = tCtx.createRadialGradient(
        center,
        center,
        0,
        center,
        center,
        size / 2,
      );
      grad.addColorStop(0, `rgb(${r},${g},${b})`); // Warna pekat di pusat
      grad.addColorStop(
        Math.max(0.01, Math.min(falloff, 1.0)),
        `rgba(${r},${g},${b},0)`,
      ); // Transparan total di titik falloff
      tCtx.fillStyle = grad;
      tCtx.fillRect(0, 0, size, size);
      spriteCache.set(key, canvas);
      return canvas;
    }

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
      // for (const p of particlesRef.current) {
      //   p.angle += p.speed * dt;
      //   const rad = (p.angle * Math.PI) / 180;
      //   const x = Math.cos(rad) * p.radiusX;
      //   const y = Math.sin(rad) * p.radiusY;
      //   p.x = cx + x * p.tiltCos - y * p.tiltSin;
      //   p.y = cy + x * p.tiltSin + y * p.tiltCos;
      // }

      ctx!.clearRect(0, 0, w, h);

      /* ---- Update particle logic (Hanya update sudut) ---- */
      for (const p of particlesRef.current) {
        p.angle += p.speed * dt;
      }

      /* Helper untuk menghitung dan menggambar instance secara simetris */
      const drawInstances = (
        p: Particle,
        drawFn: (x: number, y: number) => void,
      ) => {
        for (let m = 0; m < CONFIG.VISUAL_MULTIPLIER; m++) {
          // Hitung sudut virtual: sudut asli + offset simetris (360 derajat dibagi jumlah multiplier)
          const virtualAngle =
            p.angle + (m * 360) / CONFIG.VISUAL_MULTIPLIER;
          const rad = (virtualAngle * Math.PI) / 180;

          const x = Math.cos(rad) * p.radiusX;
          const y = Math.sin(rad) * p.radiusY;
          const dx = cx + x * p.tiltCos - y * p.tiltSin;
          const dy = cy + x * p.tiltSin + y * p.tiltCos;

          drawFn(dx, dy);
        }
      };

      /* ---- Draw Gas (batch, no shadow) ---- */
      for (const p of particlesRef.current) {
        if (p.kind !== "gas") continue;
        // Ambil sprite dari cache dan gunakan globalAlpha untuk transparansi
        // Gas selalu menggunakan falloff 1.0 agar tetap halus
        const sprite = getGlowSprite(
          p.color.r,
          p.color.g,
          p.color.b,
          1.0,
        );
        ctx!.globalAlpha = p.opacity;
        drawInstances(p, (x, y) => {
          // drawImage jauh lebih cepat daripada menggambar path lingkaran + gradien di setiap frame
          ctx!.drawImage(
            sprite,
            x - p.size,
            y - p.size,
            p.size * 2,
            p.size * 2,
          );
        });
      }
      ctx!.globalAlpha = 1.0; // Reset alpha

      /* ---- Draw Star Glow (additive blending, batch) ---- */
      ctx!.globalCompositeOperation = "lighter";
      for (const p of particlesRef.current) {
        if (p.kind !== "star") continue;
        const glowSize =
          p.size *
          (CONFIG.STAR_GLOW_INTENSITY + p.glow * 2);
        const glowOpacity = p.opacity * p.glow * 0.25;
        const sprite = getGlowSprite(
          p.color.r,
          p.color.g,
          p.color.b,
          CONFIG.STAR_GLOW_FALLOFF,
        );
        ctx!.globalAlpha = glowOpacity;

        drawInstances(p, (x, y) => {
          ctx!.drawImage(
            sprite,
            x - glowSize,
            y - glowSize,
            glowSize * 2,
            glowSize * 2,
          );
        });
      }
      ctx!.globalAlpha = 1.0;
      ctx!.globalCompositeOperation = "source-over";

      /* ---- Draw Star Cores (batch) ---- */
      for (const p of particlesRef.current) {
        if (p.kind !== "star") continue;
        ctx!.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity})`;
        drawInstances(p, (x, y) => {
          ctx!.beginPath();
          ctx!.arc(x, y, p.size, 0, Math.PI * 2);
          ctx!.fill();
        });
      }

      rafRef.current = requestAnimationFrame(loop);

      /* ---- Draw Gas (batch, no shadow) ---- */
      // for (const p of particlesRef.current) {
      //   if (p.kind !== "gas") continue;
      //   ctx!.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity})`;
      //   ctx!.beginPath();
      //   ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      //   ctx!.fill();
      // }

      /* ---- Draw Star Glow (additive blending, batch) ---- */
      // ctx!.globalCompositeOperation = "lighter";
      // for (const p of particlesRef.current) {
      //   if (p.kind !== "star") continue;
      //   const glowSize = p.size * (1.5 + p.glow * 2);
      //   const glowOpacity = p.opacity * p.glow * 0.25;
      //   ctx!.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${glowOpacity})`;
      //   ctx!.beginPath();
      //   ctx!.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
      //   ctx!.fill();
      // }
      // ctx!.globalCompositeOperation = "source-over";

      /* ---- Draw Star Cores (batch) ---- */
      // for (const p of particlesRef.current) {
      //   if (p.kind !== "star") continue;
      //   ctx!.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.opacity})`;
      //   ctx!.beginPath();
      //   ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      //   ctx!.fill();
      // }

      // rafRef.current = requestAnimationFrame(loop);
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
