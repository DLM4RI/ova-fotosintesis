<template>
  <v-container
    fluid
    class="home-wrapper d-flex align-center justify-center pa-4 pa-md-10"
  >
    <!-- GRAIN OVERLAY -->
    <div class="grain-overlay" aria-hidden="true" />

    <!-- ORBS DECORATIVOS -->
    <div class="orb orb--gold" aria-hidden="true" />
    <div class="orb orb--green" aria-hidden="true" />
    <div class="orb orb--warm" aria-hidden="true" />

    <!-- HOJAS FLOTANDO -->
    <!-- ✅ FIX: los valores aleatorios se calculan en el array para evitar
         hydration mismatch en SSR y conflicto de transform con @keyframes -->
    <div class="floating-leaves" aria-hidden="true">
      <LeafAlt
        v-for="leaf in leafData"
        :key="leaf.id"
        class="leaf"
        :style="{
          left: leaf.left,
          animationDuration: leaf.duration,
          animationDelay: leaf.delay,
          opacity: leaf.opacity,
          fontSize: leaf.size,
        }"
      />
    </div>

    <v-row
      no-gutters
      align="center"
      justify="center"
      class="main-layout text-center"
    >
      <!-- LOGO -->
      <v-col cols="12" class="d-flex justify-center mb-12">
        <div class="image-frame">
          <!-- Anillo decorativo exterior -->
          <div class="ring ring--outer" />
          <div class="ring ring--inner" />

          <div class="glow-circle" />

          <v-img :src="logoSrc" class="main-img" cover />

          <!-- Badge -->
          <div class="floating-badge">
            <LeafAlt fill="#ffffff" size="20" />
            <span>Ciencias Naturales</span>
          </div>
        </div>
      </v-col>

      <!-- CONTENIDO -->
      <v-col cols="12" md="9" lg="7">
        <header class="hero-section">
          <div class="mini-tag mb-6" style="color: #80a124">
            Aprendizaje Interactivo
          </div>

          <h1 class="hero-title mb-4">
            Foto&shy;síntesis
            <br />
            <span class="highlight-text">Vegetal</span>
          </h1>

          <p class="hero-desc mx-auto mb-10">
            Descubre cómo las plantas convierten la luz solar en energía
            mediante uno de los procesos biológicos más importantes para la
            vida.
          </p>
        </header>

        <!-- BOTONES -->
        <div class="actions-container">
          <v-btn
            to="/personalizar"
            height="70"
            rounded="xl"
            class="start-btn px-10"
            elevation="0"
          >
            <span>Empezar Aprendizaje</span>
            <v-icon end icon="mdi-arrow-right" />
          </v-btn>

          <div class="duration-tag">
            <v-icon icon="mdi-timer-outline" size="17" class="mr-2" />
            Duración aproximada: 20 minutos
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { LeafAlt } from "@boxicons/vue";
import { useRouter, navigateTo } from "#imports";

const router = useRouter();
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// ✅ FIX: datos aleatorios calculados UNA VEZ en el script (no en el template)
// Esto evita el hydration mismatch de SSR y el conflicto de transform con @keyframes
const leafData = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 8.2) % 90)}%`, // pseudo-aleatorio estable
  duration: `${9 + ((i * 1.7) % 8)}s`,
  delay: `${(i * 0.8) % 5}s`,
  opacity: 0.02 + (i % 1) * 0.04,
  size: `${22 + (i % 4) * 6}px`,
}));

const logoSrc = useAsset("logo.png");

function irAlDashboard() {
  console.log("Accediendo al dashboard principal...");
  navigateTo("/dashboard");
}


</script>

<style scoped>
/*
 * ✅ FIX: CSS variables definidas en el elemento raíz del componente
 * usando :deep() no aplica; en <style scoped> hay que declararlas en
 * el selector del elemento raíz o en un bloque sin scope.
 * La solución correcta en Vue SFC es declararlas en el elemento raíz
 * del template con una clase específica y referenciarlas desde ahí.
 */

/* ─── TOKENS ─────────────────────────────────────────── */
.home-wrapper {
  --c-gold: #ddae38;
  --c-gold-dark: #c69622;
  --c-green: #a8c93d2a;
  --c-green-dark: #80a12462;
  --c-bg: #f6f4ec;
  --c-surface: #ffffff;
  --c-text: #2a2a1e;
  --c-text-soft: #6b6a5a;
  --c-border: rgba(221, 174, 56, 0.22);

  --shadow-gold: 0 18px 50px rgba(221, 174, 56, 0.22);
  --shadow-green: 0 18px 50px rgba(168, 201, 61, 0.2);
  --radius-card: 32px;

  /* Fuente refinada — diferente de Inter */
  font-family: "DM Sans", "Nunito", sans-serif;
}

/* ─── FONDO ───────────────────────────────────────────── */
.home-wrapper {
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  background:
    radial-gradient(
      ellipse 60% 45% at 5% 10%,
      rgba(221, 174, 56, 0.14) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 50% 40% at 95% 90%,
      rgba(168, 201, 61, 0.13) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 40% 35% at 50% 50%,
      rgba(255, 252, 235, 0.9) 0%,
      transparent 100%
    ),
    linear-gradient(175deg, #fffef7 0%, var(--c-bg) 100%);
}

/* ─── GRAIN ───────────────────────────────────────────── */
.grain-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.028;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px;
}

/* ─── ORBS DECORATIVOS ────────────────────────────────── */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(70px);
  z-index: 1;
  animation: orbFloat 12s ease-in-out infinite alternate;
}

.orb--gold {
  width: 520px;
  height: 520px;
  top: -15%;
  left: -12%;
  background: radial-gradient(
    circle,
    rgba(221, 174, 56, 0.18),
    transparent 70%
  );
  animation-delay: 0s;
}

.orb--green {
  width: 420px;
  height: 420px;
  bottom: -10%;
  right: -8%;
  background: radial-gradient(
    circle,
    rgba(168, 201, 61, 0.16),
    transparent 70%
  );
  animation-delay: -4s;
}

.orb--warm {
  width: 300px;
  height: 300px;
  top: 40%;
  left: 55%;
  background: radial-gradient(circle, rgba(221, 200, 56, 0.1), transparent 70%);
  animation-delay: -8s;
}

@keyframes orbFloat {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(30px, -20px) scale(1.06);
  }
}

/* ─── HOJAS FLOTANTES ─────────────────────────────────── */
.floating-leaves {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
}

.leaf {
  position: absolute;
  top: -8%;
  color: var(--c-green-dark);

  /* ✅ FIX: NO ponemos transform aquí; el @keyframes lo gestiona todo.
     El size ahora se controla con font-size en lugar de width/height
     para no crear conflicto con la propiedad transform del keyframe. */
  width: 1em;
  height: 1em;

  animation-name: fallingLeaf;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* ✅ FIX: keyframe unificado — un solo eje de transform sin conflicto */
@keyframes fallingLeaf {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg) scale(0.9);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  50% {
    transform: translateY(52vh) translateX(28px) rotate(190deg) scale(1.05);
  }
  92% {
    opacity: 1;
  }
  100% {
    transform: translateY(112vh) translateX(-18px) rotate(370deg) scale(0.85);
    opacity: 0;
  }
}

/* ─── LAYOUT ──────────────────────────────────────────── */
.main-layout {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 960px;
}

/* ─── LOGO FRAME ──────────────────────────────────────── */
.image-frame {
  position: relative;
  width: 100%;
  max-width: 300px;
}

/* Anillos orbitales decorativos */
.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid;
  animation: ringPulse 4s ease-in-out infinite alternate;
}

.ring--outer {
  inset: -28px;
  border-color: rgba(221, 174, 56, 0.18);
  animation-delay: 0s;
}

.ring--inner {
  inset: -14px;
  border-color: rgba(168, 201, 61, 0.15);
  animation-delay: -2s;
}

@keyframes ringPulse {
  from {
    opacity: 0.5;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(1.03);
  }
}

.glow-circle {
  position: absolute;
  inset: -30px;

  background: radial-gradient(
    circle,
    rgba(221, 174, 56, 0.28) 0%,
    rgba(168, 201, 61, 0.1) 45%,
    transparent 70%
  );

  filter: blur(22px);
  z-index: 0;
  animation: glowBreath 5s ease-in-out infinite alternate;
}

@keyframes glowBreath {
  from {
    opacity: 0.7;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1.04);
  }
}

.main-img {
  position: relative;
  z-index: 2;
  border-radius: var(--radius-card);
  border: 5px solid rgba(255, 255, 255, 0.95);
  background: white;

  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.09),
    0 8px 24px rgba(221, 174, 56, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s ease;
}

.main-img:hover {
  transform: translateY(-6px) scale(1.018);
  box-shadow:
    0 32px 72px rgba(0, 0, 0, 0.12),
    0 12px 32px rgba(168, 201, 61, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* ─── BADGE ───────────────────────────────────────────── */
.floating-badge {
  position: absolute;
  z-index: 3;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);

  background: linear-gradient(
    135deg,
    var(--c-gold-dark) 0%,
    var(--c-green-dark) 100%
  );
  color: white;

  padding: 10px 20px;
  border-radius: 14px;

  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
  letter-spacing: 0.3px;

  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.16),
    0 2px 8px rgba(221, 174, 56, 0.3);

  animation: badgeBob 3.5s ease-in-out infinite alternate;
}

@keyframes badgeBob {
  from {
    transform: translateX(-50%) translateY(0);
  }
  to {
    transform: translateX(-50%) translateY(-4px);
  }
}

/* ─── HERO ────────────────────────────────────────────── */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-tag {
  display: inline-flex;
  align-items: center;

  background: rgba(255, 255, 255, 0.82);
  border: 1.5px solid var(--c-border);
  color: var(--c-green-dark);

  font-weight: 700;
  font-size: 0.88rem;
  padding: 10px 20px;
  border-radius: 999px;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  animation: fadeSlideDown 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.hero-title {
  font-size: clamp(2.8rem, 7vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  color: var(--c-text);
  letter-spacing: -2.5px;

  animation: fadeSlideUp 0.8s 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.highlight-text {
  background: linear-gradient(
    125deg,
    var(--c-gold-dark) 20%,
    var(--c-green-dark) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  max-width: 680px;
  font-size: 1.08rem;
  line-height: 1.85;
  color: var(--c-text-soft);
  font-weight: 450;

  animation: fadeSlideUp 0.8s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* ─── BOTONES ─────────────────────────────────────────── */
.actions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  animation: fadeSlideUp 0.8s 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.start-btn {
  background: linear-gradient(
    130deg,
    var(--c-gold-dark) 0%,
    var(--c-green) 100%
  ) !important;

  color: white !important;
  font-size: 1rem;
  font-weight: 800;

  text-transform: none;
  letter-spacing: 0.4px;

  box-shadow:
    0 14px 36px rgba(221, 174, 56, 0.28),
    0 2px 8px rgba(168, 201, 61, 0.18);

  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.35s ease;

  position: relative;
  overflow: hidden;
}

/* Shimmer en hover */
.start-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 35%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 65%
  );
  transform: translateX(-100%);
  transition: transform 0.55s ease;
}

.start-btn:hover::after {
  transform: translateX(100%);
}

.start-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 20px 44px rgba(168, 201, 61, 0.3),
    0 4px 12px rgba(221, 174, 56, 0.2);
}

/* ─── DURACIÓN ────────────────────────────────────────── */
.duration-tag {
  display: flex;
  align-items: center;

  background: rgba(255, 255, 255, 0.82);
  border: 1.5px solid var(--c-border);
  padding: 11px 20px;
  border-radius: 999px;

  color: var(--c-text-soft);
  font-size: 0.9rem;
  font-weight: 600;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

/* ─── ANIMACIONES DE ENTRADA ──────────────────────────── */
@keyframes fadeSlideDown {
  from {
    opacity: 0;
    transform: translateY(-18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.6rem;
    letter-spacing: -1.5px;
  }

  .hero-desc {
    font-size: 0.98rem;
    line-height: 1.8;
  }

  .image-frame {
    max-width: 240px;
  }

  .orb--gold {
    width: 320px;
    height: 320px;
  }
  .orb--green {
    width: 260px;
    height: 260px;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.1rem;
    letter-spacing: -1px;
  }

  .start-btn {
    width: 100%;
  }

  .duration-tag {
    font-size: 0.82rem;
  }

  /* OPTIMIZACIONES DE RENDIMIENTO */
  .hide-mobile {
    display: none !important;
  }
  
  .orb {
    filter: blur(40px) !important;
    animation: none !important;
  }

  .orb--gold {
    width: 250px;
    height: 250px;
  }

  .leaf {
    animation-duration: 20s !important;
  }

  .ring, .glow-circle {
    animation: none !important;
  }
  
  .glow-circle {
    filter: blur(15px);
  }
}
</style>
