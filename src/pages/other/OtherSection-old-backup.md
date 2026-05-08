# Backup: OtherSection.tsx Lama (Accretion Disk Orbit — Sebelum Rewrite)

File ini berisi kode `OtherSection.tsx` sebelum rewrite pada 2026-05-07. Kode ini menggunakan animejs untuk menganimasikan 1 object utama + 12 trail particles yang berputar mengelilingi pusat dengan efek accretion disk.

## Catatan Parameter Utama

| Parameter | Letak | Nilai Default |
|---|---|---|
| `radiusX` | Baris ~94 | `270` |
| `radiusY` | Baris ~96 | `270` |
| `tiltDeg` | Baris ~98 | `0` |
| `TRAIL_COUNT` | Baris ~14 | `12` |
| `duration` | Baris ~108 | `4000` ms per putaran |
| Object utama | `.object` CSS | garis 50×2px dengan gradient putih + glow |
| Trail particle | `.trail-particle` CSS | garis 2px dengan gradient redup + glow tipis |

---

## Kode Lengkap

```tsx
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { ArrowLeft } from "lucide-react";

interface OtherSectionProps {
  onBack?: () => void;
}

export function OtherSection({
  onBack,
}: OtherSectionProps) {
  const objectRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const TRAIL_COUNT = 12; // Menentukan jumlah Trail

  useEffect(() => {
    if (!objectRef.current) return;

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
        if (!objectRef.current) return;
        const rad = (state.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        objectRef.current.style.transform = `translate(${x}px, ${y}px)`;
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
        if (!objectRef.current) return;
        const rad = (state.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radiusX;
        const y = Math.sin(rad) * radiusY;
        objectRef.current.style.transform = `translate(${x}px, ${y}px)`;
      },
    });
    */

    /* Gerakan oval miring
    const radiusX = 270;
    const radiusY = 270;
    const tiltDeg = 0;
    const state = { angle: 0 };

    const animation = animate(state, {
      angle: 360,
      duration: 4000,
      loop: true,
      ease: "linear",
      onLoop: () => console.log("Loop"),
      onBegin: () => console.log("Begin"),
      onUpdate: () => {
        if (!objectRef.current) return;
        const rad = (state.angle * Math.PI) / 180;
        const tilt = (tiltDeg * Math.PI) / 180;

        const xOval = Math.cos(rad) * radiusX;
        const yOval = Math.sin(rad) * radiusY;

        const x = xOval * Math.cos(tilt) - yOval * Math.sin(tilt);
        const y = xOval * Math.sin(tilt) + yOval * Math.cos(tilt);

        objectRef.current.style.transform = `translate(${x}px, ${y}px)`;
      },
    });
    */

    // ============================================
    // Gerakan accretion disk (lingkaran + rotasi + trail)
    // ============================================

    // radiusX = jarak dari pusat ke kiri/kanan (sumbu horizontal)
    const radiusX = 270;
    // radiusY = jarak dari pusat ke atas/bawah (sumbu vertikal)
    const radiusY = 270;
    // tiltDeg = sudut miring oval dalam derajat (0 = tidak miring)
    const tiltDeg = 0;
    // state = objek dummy yang akan dianimasikan oleh animejs
    //         kita hanya animasi properti 'angle' dari 0 ke 360
    const state = { angle: 0 };

    // Memulai animasi dengan animejs
    const animation = animate(state, {
      // angle akan bergerak dari nilai awal (0) ke 360
      angle: 360,
      // durasi 1 putaran penuh = 4000ms (4 detik)
      duration: 4000,
      // loop terus menerus tanpa berhenti
      loop: true,
      // linear = kecepatan konstan (tidak memperlambat/mempercepat)
      ease: "linear",
      // callback saat animasi mulai loop baru
      onLoop: () => console.log("Loop"),
      // callback saat animasi pertama kali dimulai
      onBegin: () => console.log("Begin"),
      // ============================================
      // onUpdate = dijalankan SETIAP FRAME animasi
      //            inilah yang menggerakkan object & trail
      // ============================================
      onUpdate: () => {
        // --- LANGKAH 1: Posisi Object Utama ---

        // Cek jika object belum tersedia di DOM, hentikan
        if (!objectRef.current) return;

        // Konversi sudut dari derajat ke radian
        // karena Math.cos/sin hanya menerima radian
        const rad = (state.angle * Math.PI) / 180;

        // Konversi sudut miring ke radian juga
        const tilt = (tiltDeg * Math.PI) / 180;

        // --- Hitung posisi object pada orbit (sebelum dimiringkan) ---
        // xOval = posisi horizontal di orbit
        //         cos(θ) memberikan nilai -1 s/d 1
        //         dikali radiusX agar sesuai ukuran orbit
        const xOval = Math.cos(rad) * radiusX;
        // yOval = posisi vertikal di orbit
        //         sin(θ) memberikan nilai -1 s/d 1
        const yOval = Math.sin(rad) * radiusY;

        // --- Terapkan rotasi miring (jika tiltDeg != 0) ---
        // Rumus rotasi 2D:
        //   x' = x·cos(tilt) - y·sin(tilt)
        //   y' = x·sin(tilt) + y·cos(tilt)
        const x =
          xOval * Math.cos(tilt) - yOval * Math.sin(tilt);
        const y =
          xOval * Math.sin(tilt) + yOval * Math.cos(tilt);

        // --- LANGKAH 2: Rotasi Object mengikuti arah orbit ---

        // dxOval = turunan x terhadap sudut (arah tangen horizontal)
        //          turunan dari cos(rad) = -sin(rad)
        const dxOval = -radiusX * Math.sin(rad);
        // dyOval = turunan y terhadap sudut (arah tangen vertikal)
        //          turunan dari sin(rad) = cos(rad)
        const dyOval = radiusY * Math.cos(rad);

        // Terapkan rotasi miring juga ke arah tangen
        const dx =
          dxOval * Math.cos(tilt) - dyOval * Math.sin(tilt);
        const dy =
          dxOval * Math.sin(tilt) + dyOval * Math.cos(tilt);

        // atan2(dy, dx) = menghitung sudut arah vektor (dy, dx)
        //                 hasilnya dalam radian, dari -PI sampai PI
        // × (180/π) = konversi ke derajat untuk CSS rotate()
        const rotationDeg =
          Math.atan2(dy, dx) * (180 / Math.PI);

        // Terapkan transform ke object utama:
        // translate = pindahkan ke posisi (x, y) di orbit
        // rotate    = putar object mengikuti arah tangen orbit
        objectRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotationDeg}deg)`;

        // ============================================
        // LANGKAH 3: Update Trail Particles (Accretion Disk)
        // ============================================
        // trailRefs.current berisi array 12 elemen <div>
        // setiap particle akan berada di posisi yang
        // sedikit tertinggal di belakang object utama

        trailRefs.current.forEach((trail, i) => {
          // Jika elemen trail belum ter-render, lewati
          if (!trail) return;

          // offset = berapa derajat particle ini tertinggal
          //          particle ke-0 (i=0) tertinggal 5°
          //          particle ke-1 (i=1) tertinggal 10°
          //          dst. makin belakang makin besar offset-nya
          const offset = -(i + 1) * 5;

          // trailAngle = sudut object utama + offset (negatif)
          //              jadi particle berada di belakang object
          const trailAngle = state.angle + offset;

          // Konversi sudut trail ke radian
          const trailRad = (trailAngle * Math.PI) / 180;

          // --- Hitung posisi trail (sama persis rumusnya) ---
          const tXOval = Math.cos(trailRad) * radiusX;
          const tYOval = Math.sin(trailRad) * radiusY;
          const tX =
            tXOval * Math.cos(tilt) -
            tYOval * Math.sin(tilt);
          const tY =
            tXOval * Math.sin(tilt) +
            tYOval * Math.cos(tilt);

          // --- Hitung rotasi trail (sama persis rumusnya) ---
          const tDxOval = -radiusX * Math.sin(trailRad);
          const tDyOval = radiusY * Math.cos(trailRad);
          const tDx =
            tDxOval * Math.cos(tilt) -
            tDyOval * Math.sin(tilt);
          const tDy =
            tDxOval * Math.sin(tilt) +
            tDyOval * Math.cos(tilt);
          const tRotationDeg =
            Math.atan2(tDy, tDx) * (180 / Math.PI);

          // --- Efek memudar & mengecil (fade-out) ---
          // progress = 0 untuk particle terdepan, 1 untuk paling belakang
          const progress = (i + 1) / TRAIL_COUNT;

          // width = lebar particle, makin belakang makin sempit
          //         50px × (1 - 0.6×progress)
          //         particle depan = 50px, particle belakang = 20px
          const width = 50 * (1 - progress * 0.6);

          // opacity = transparansi, makin belakang makin tembus pandang
          //           1 - 0.85×progress
          //           particle depan = 100%, belakang = 15%
          const opacity = 1 - progress * 0.85;

          // Terapkan style ke elemen trail
          trail.style.width = `${width}px`;
          // marginLeft negatif = agar particle tetap centered
          trail.style.marginLeft = `${-width / 2}px`;
          trail.style.opacity = `${opacity}`;
          trail.style.transform = `translate(${tX}px, ${tY}px) rotate(${tRotationDeg}deg)`;
        });
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

      {/* ============================================ */}
      {/* BAGIAN RENDER / JSX                          */}
      {/* ============================================ */}
      <div className="p-8 flex justify-center items-center pt-36">
        {/* Container relatif untuk object & trail.
            w-150 h-150 = 600px x 600px (lebar & tinggi area animasi).
            relative = agar absolute children (object & trail)
                       diposisikan relatif ke container ini. */}
        <div className="relative w-150 h-150">
          {/* Membuat 12 elemen trail-particle secara dinamis.
              Array.from({ length: TRAIL_COUNT }) = buat array [0..11].
              .map() = iterasi setiap elemen, render <div>.
              key={i} = React membutuhkan key unik tiap list item.
              ref={(el) => { trailRefs.current[i] = el; }}
                     = simpan referensi DOM tiap trail ke trailRefs.current[i]
                       agar bisa diakses di useEffect untuk diubah posisi.
              className="trail-particle" = terapkan styling dari element.css. */}
          {Array.from({ length: TRAIL_COUNT }).map(
            (_, i) => (
              <div
                key={i}
                ref={(el) => {
                  trailRefs.current[i] = el;
                }}
                className="trail-particle"
              />
            ),
          )}
          {/* Object utama (garis putih bercahaya).
              ref={objectRef} = referensi DOM untuk diakses di useEffect.
              className="object" = styling utama dari element.css. */}
          <div ref={objectRef} className="object" />
        </div>
      </div>
    </section>
  );
}
```
