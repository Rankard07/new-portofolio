import { useEffect, useRef, useMemo } from "react";
import { animate } from "animejs";
import { ArrowLeft } from "lucide-react";

interface OtherSectionProps {
  onBack?: () => void;
}

interface ParticleConfig {
  id: number;
  spawnSide: "bottomLeft" | "topRight";
  targetAngle: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  orbitSpeed: number;
  color: "warm" | "cool";
  size: number;
  entryDelay: number;
  entryDuration: number;
  extraSpins: number;
}

/* ================================================
   KONFIGURASI ORBIT — edit angka di bawah ini
   untuk mengubah bentuk & ukuran orbit
   ================================================ */
const ORBIT_BASE_X = 160; // radius X orbit terdalam (px)
const ORBIT_EXPAND_X = 480; // seberapa besar orbit meluas ke samping
const ORBIT_BASE_Y = 110; // radius Y orbit terdalam (px)
const ORBIT_EXPAND_Y = 180; // seberapa besar orbit meluas ke atas-bawah

/*
   ACCRETION_DISK_TILT = kemiringan SELURUH cakram orbit (derajat)
   Semua partikel mengikuti SATU bidang miring yang sama
   0   = orbit horizontal (tidak miring)
   -20 = miring ke kanan-atas (seperti gambar 3)
   30  = miring ke kiri-bawah
   Ubah angka ini untuk mengatur kemiringan SELURUH accretion disk
*/
const ACCRETION_DISK_TILT = 30;

/*
   Cara membuat OVAL: orbitBaseY jauh lebih kecil dari orbitBaseX
   Contoh oval horizontal sangat pipih:
     ORBIT_BASE_X = 400, ORBIT_BASE_Y = 80
     ORBIT_EXPAND_X = 300, ORBIT_EXPAND_Y = 60
   Contoh lingkaran (X ≈ Y):
     ORBIT_BASE_X = 200, ORBIT_BASE_Y = 200
     ORBIT_EXPAND_X = 200, ORBIT_EXPAND_Y = 200
*/

function generateParticles(
  // count = JUMLAH TOTAL PARTIKEL / ORBITAL
  //        Semakin besar = semakin padat / ramai visualnya
  //        Contoh: 50 (jarang), 150 (sedang), 288 (padat)
  count: number,
): ParticleConfig[] {
  return Array.from({ length: count }, (_, i) => {
    // spawnSide = sisi awal munculnya partikel
    //            Ganjil/genap menentukan dari bawah-kiri atau atas-kanan
    //            50% dari bottomLeft, 50% dari topRight
    const spawnSide =
      i % 2 === 0 ? "bottomLeft" : "topRight";
    const color = i % 2 === 0 ? "warm" : "cool";

    // baseAngle = posisi angular dasar (0° - 360°)
    //            i/count memastikan partikel tersebar MERATA di seluruh lingkaran
    const baseAngle = (i / count) * 360;

    // targetAngle = posisi akhir di orbit setelah entry selesai
    //               baseAngle = tersebar MERATA di 360°
    //               + variasi ±15° = partikel tidak berbaris terlalu rapi
    //               Nilai ini TETAP per partikel (bukan acak total)
    const targetAngle =
      baseAngle + (Math.random() - 0.5) * 30;

    // layer = "tingkatan" partikel dari pusat ke luar (0.0 - 1.0)
    //         Math.random() = partikel tersebar ACAK di SEMUA radius
    //         Sebelumnya i/count = partikel berdempetan mengikuti jalur spiral
    //         Sekarang: partikel menyebar seperti galaxy, tidak berdempetan
    const layer = Math.random();

    // orbitRadiusX = JARAK HORIZONTAL dari pusat ke orbit (px)
    //                Semakin besar = orbit semakin lebar ke samping
    const orbitRadiusX =
      ORBIT_BASE_X + layer * ORBIT_EXPAND_X;

    // orbitRadiusY = JARAK VERTIKAL dari pusat ke orbit (px)
    //                Beda X vs Y = orbit berbentuk OVAL (bukan lingkaran)
    const orbitRadiusY =
      ORBIT_BASE_Y + layer * ORBIT_EXPAND_Y;

    // orbitSpeed = KECEPATAN BERPUTAR (derajat per detik)
    //              Layer kecil (dekat pusat) = lebih cepat
    //              Layer besar (jauh pusat) = lebih lambat
    const orbitSpeed = 25 + (1 - layer) * 55;

    // size = UKURAN FISIK PARTIKEL dalam pixel (2-4px)
    const size = 0.1 + Math.random() * 0.9;

    // entryDelay = WAKTU TUNGGU sebelum partikel mulai masuk (ms)
    //              i * 5 = setiap partikel menunggu 5ms dari partikel sebelumnya
    //              TOTAL WAKTU TUNGGU SEMUA: count * 5 ms (kurang lebih)
    const entryDelay = i * 5 + Math.random() * 50;

    // entryDuration = LAMA WAKTU spiral dari pojok ke orbit (ms)
    //                 1000ms = cepat, 1400ms = lambat
    const entryDuration = 500 + Math.random() * 120;

    // extraSpins = JUMLAH PUTARAN TAMBAHAN saat entry spiral
    //              1-2 putaran ekstra sebelum sampai ke orbit target
    const extraSpins = 1 + Math.floor(Math.random() * 2);

    // Debug: Log 5 partikel pertama
    if (i < 5) {
      console.log(
        `Particle ${i}: side=${spawnSide}, target=${targetAngle.toFixed(1)}°, delay=${entryDelay}ms, spins=${extraSpins}`,
      );
    }

    return {
      id: i,
      spawnSide,
      targetAngle,
      orbitRadiusX,
      orbitRadiusY,
      orbitSpeed,
      color,
      size,
      entryDelay,
      entryDuration,
      extraSpins,
    };
  });
}

export function OtherSection({
  onBack,
}: OtherSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleElsRef = useRef<
    Record<number, HTMLDivElement | null>
  >({});
  const particleStatesRef = useRef<
    Record<
      number,
      {
        phase: "entering" | "orbiting";
        orbitAngle: number;
        entryAnim: ReturnType<typeof animate> | null;
      }
    >
  >({});

  // ============================================================
  // GENERATE PARTIKEL — ubah angka di bawah untuk mengatur jumlah
  // 288 = banyak partikel (padat, maksimal ~15 detik semua masuk)
  // 50  = sedikit partikel (jarang, cepat selesai)
  // ============================================================
  const configs = useMemo(() => generateParticles(400), []);

  // Initialize particle states and start entry animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // vw/vh = ukuran viewport (layar)
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // targetSpawnDistance = jarak spawn dari pusat (px)
    //                       0.55 = 55% dari sisi terpanjang viewport
    //                       Semakin besar = spawn lebih dekat tepi layar
    const targetSpawnDistance = Math.max(vw, vh) * 0.55;

    // Start entry animations for all particles
    configs.forEach((config) => {
      const state: {
        phase: "entering" | "orbiting";
        orbitAngle: number;
        entryAnim: ReturnType<typeof animate> | null;
      } = {
        phase: "entering",
        orbitAngle: 0,
        entryAnim: null,
      };
      particleStatesRef.current[config.id] = state;

      // ENTRY ANIMATION — SEMUA DARI LUAR (INWARD)
      // spawnSide = bottomLeft: masuk dari kiri-bawah, searah jarum jam
      // spawnSide = topRight:  masuk dari kanan-atas, searah jarum jam

      // startRadiusScale = dihitung agar partikel spawn di targetSpawnDistance
      //                    orbit kecil butuh scale lebih besar untuk spawn jauh
      //                    orbit besar minimal scale 2.0
      const orbitRadius = Math.max(
        config.orbitRadiusX,
        config.orbitRadiusY,
      );
      const startRadiusScale = Math.max(
        2.0,
        targetSpawnDistance / orbitRadius,
      );
      const endRadiusScale = 1.0;

      // startAngle = sudut awal di luar layar (screen coordinates, y ke bawah)
      //              angle bertambah = searah jarum jam di layar
      const startAngle =
        config.spawnSide === "bottomLeft"
          ? 135 + Math.random() * 45 // dari kiri-bawah (135°-180°)
          : -45 + Math.random() * 45; // dari kanan-atas (-45°-0°)

      // endAngle = berputar searah jarum jam sampai target + putaran ekstra
      const endAngle =
        config.targetAngle + config.extraSpins * 360;

      // entryState yang akan dianimasikan oleh animejs
      const entryState = {
        angle: startAngle,
        radiusScale: startRadiusScale,
        scale: 4 + Math.random() * 2, // ukuran awal 4-6x lebih besar
      };

      // ENTRY ANIMATION (animejs) — mengikuti OVAL + TILT orbit
      state.entryAnim = animate(entryState, {
        angle: endAngle, // berputar searah jarum jam ke target
        radiusScale: endRadiusScale, // menyusut dari 2x ke 1x
        scale: 1, // mengecil dari besar ke ukuran normal
        duration: config.entryDuration,
        delay: config.entryDelay,
        ease: "easeOutCubic",
        onUpdate: () => {
          const el = particleElsRef.current[config.id];
          if (!el) return;

          const rad = (entryState.angle * Math.PI) / 180;
          const tilt =
            (ACCRETION_DISK_TILT * Math.PI) / 180;

          // RUMUS OVAL (sama persis dengan orbit berkelanjutan)
          // radiusScale menyusut dari 2.0 → 1.0 = partikel dari jauh ke orbit
          const xOval =
            Math.cos(rad) *
            config.orbitRadiusX *
            entryState.radiusScale;
          const yOval =
            Math.sin(rad) *
            config.orbitRadiusY *
            entryState.radiusScale;

          // TILT / MIRING (sama persis dengan orbit berkelanjutan)
          const x =
            xOval * Math.cos(tilt) - yOval * Math.sin(tilt);
          const y =
            xOval * Math.sin(tilt) + yOval * Math.cos(tilt);

          el.style.transform = `translate(${x}px, ${y}px) scale(${entryState.scale})`;
        },
        onComplete: () => {
          state.phase = "orbiting";
          state.orbitAngle = config.targetAngle;
        },
      });
    });

    // Orbit loop using requestAnimationFrame
    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      configs.forEach((config) => {
        const ps = particleStatesRef.current[config.id];
        if (!ps || ps.phase !== "orbiting") return;

        const el = particleElsRef.current[config.id];
        if (!el) return;

        ps.orbitAngle += config.orbitSpeed * dt;

        const rad = (ps.orbitAngle * Math.PI) / 180;
        const tilt = (ACCRETION_DISK_TILT * Math.PI) / 180;

        const xOval = Math.cos(rad) * config.orbitRadiusX;
        const yOval = Math.sin(rad) * config.orbitRadiusY;

        const x =
          xOval * Math.cos(tilt) - yOval * Math.sin(tilt);
        const y =
          xOval * Math.sin(tilt) + yOval * Math.cos(tilt);

        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      Object.values(particleStatesRef.current).forEach(
        (ps) => {
          ps.entryAnim?.pause();
        },
      );
      particleStatesRef.current = {};
    };
  }, [configs]);

  return (
    <section className="min-h-screen relative overflow-hidden">
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

      {/* ============================================ */}
      {/* LAYER ANIMASI — fullscreen di belakang konten */}
      {/* ============================================ */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Black Hole Center — placeholder untuk animasi user nanti */}
        <div className="black-hole-center" />
        <div className="black-hole-pulse" />
        <div className="black-hole-ring" />
        {/* ADDED: Event Horizon element */}
        {/* <div className="event-horizon" /> */}

        {/* Particles */}
        {configs.map((config) => (
          <div
            key={config.id}
            ref={(el) => {
              particleElsRef.current[config.id] = el;
            }}
            className={`
              glow-sphere 
              glow-sphere-${config.color}
              `}
            style={{
              width: `${config.size}px`,
              height: `${config.size}px`,
              marginTop: `${-config.size / 2}px`,
              marginLeft: `${-config.size / 2}px`,
            }}
          />
        ))}
      </div>

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
