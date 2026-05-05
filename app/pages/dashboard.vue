<template>
  <v-main class="ova-shell">
    <!-- ═══ PANEL IZQUIERDO — Ilustración ═══ -->
    <div class="panel panel-left">
      <div class="left-bg-blob"></div>
      <div class="left-content">
        <v-img :src="useAsset('logo.png')" class="hero-logo" contain />
        <div class="left-badge">
          <i class="bx bxs-leaf"></i>
          Aprende con las plantas
        </div>
      </div>
    </div>

    <!-- ═══ PANEL DERECHO — Contenido ═══ -->
    <div class="panel panel-right">
      <div class="right-inner">
        <!-- Chip materia -->
        <div class="subject-chip">
          <i class="bx bx-leaf"></i>
          Ciencias Naturales
        </div>

        <!-- Título -->
        <h1 class="main-title">
          Fotosíntesis
          <span class="title-accent">Vegetal</span>
        </h1>

        <!-- Subtítulo -->
        <p class="main-subtitle">
          Unidad Didáctica Integrada sobre el proceso de conversión energética
          en las plantas.
        </p>

        <!-- Equipo -->
        <div class="team-section">
          <p class="team-label">
            <i class="bx bx-group"></i>
            EQUIPO DE DESARROLLO
          </p>
          <div class="team-grid">
            <div v-for="member in team" :key="member.name" class="member-card">
              <div class="member-avatar">
                <v-avatar size="50" class="elevation-2">
                  <v-img :src="useAsset(member.img)" />
                </v-avatar>
              </div>
              <div class="member-info">
                <span class="member-name">{{ member.name }}</span>
                <span class="member-role" :style="{ color: member.color }">
                  <i :class="member.icon"></i>
                  {{ member.role }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-row">
          <button class="cta-btn mt-4" @click="$router.push('/contenidos')">
            Iniciar Aprendizaje
            <i class="bx bx-chevron-right"></i>
          </button>
          <div class="cta-meta mt-4">
            <i class="bx bx-time-five"></i>
            <span>20 minutos</span>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script setup>
definePageMeta({ layout: "dashboard" });

const team = [
  {
    name: "Mario Castro",
    initials: "MC",
    role: "DESARROLLADOR",
    icon: "bx bx-code-alt",
    color: "#e65100",
    img: "mario.png",
  },
  {
    name: "Rosendo De Castro",
    initials: "RC",
    role: "DESARROLLADOR",
    icon: "bx bx-code-alt",
    color: "#e65100",
    img: "rosendo.jpeg",
  },
  {
    name: "Fabio Cantero",
    initials: "FC",
    role: "QA ENGINEER",
    icon: "bx bx-list-check",
    color: "#1565c0",
    img: "fabio.png",
  },
  {
    name: "Andrea Hernandez",
    initials: "AH",
    role: "PROJECT MANAGER",
    icon: "bx bx-briefcase",
    color: "#6a1b9a",
    img: "andrea.png",
  },
];
</script>

<style scoped>
/* ─────────────────────────────────────────
   SHELL: ocupa exactamente 100% sin overflow
   ───────────────────────────────────────── */
.ova-shell {
  display: flex !important;
  width: 100%;
  height: 100%; /* hereda del layout padre */
  overflow: hidden;
  background: #ffffff;
}

/* ─────────────────────────────────────────
   PANELES
   ───────────────────────────────────────── */
.panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

/* Panel izquierdo: fondo verde suave */
.panel-left {
  flex: 0 0 44%;
  max-width: 44%;
  background: #f1f8e9;
  position: relative;
  align-items: center;
  justify-content: center;
}

.left-bg-blob {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 30% 30%,
      rgba(165, 214, 167, 0.45) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse at 75% 70%,
      rgba(129, 199, 132, 0.3) 0%,
      transparent 50%
    );
  pointer-events: none;
}

.left-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vh, 2rem);
  padding: clamp(1.5rem, 4vw, 3rem);
  height: 100%;
}

.hero-logo {
  width: clamp(140px, 22vw, 280px) !important;
  height: clamp(140px, 22vw, 280px) !important;
  flex-shrink: 0;
  animation: logoBob 4s ease-in-out infinite;
}

@keyframes logoBob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.left-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(129, 199, 132, 0.5);
  border-radius: 999px;
  font-size: clamp(0.72rem, 1.1vw, 0.85rem);
  font-weight: 700;
  color: #2e7d32;
  letter-spacing: 0.2px;
  animation: fadeSlide 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
}

.left-badge i {
  font-size: 1rem;
}

/* Panel derecho */
.panel-right {
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 3.5rem);
  background: #ffffff;
}

.right-inner {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: clamp(0.6rem, 1.5vh, 1.2rem);
  animation: fadeSlide 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─────────────────────────────────────────
   CHIP MATERIA
   ───────────────────────────────────────── */
.subject-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 16px;
  background: #1b5e20;
  border-radius: 999px;
  font-size: clamp(0.75rem, 1.1vw, 0.85rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.3px;
  width: fit-content;
  animation: fadeSlide 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
}

.subject-chip i {
  font-size: 1rem;
}

/* ─────────────────────────────────────────
   TÍTULO
   ───────────────────────────────────────── */
.main-title {
  font-size: clamp(1.9rem, 4.5vw, 3.2rem);
  font-weight: 900;
  line-height: 1.1;
  color: #111;
  margin: 0;
  letter-spacing: -0.5px;
  animation: fadeSlide 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.title-accent {
  color: #2e7d32;
}

/* ─────────────────────────────────────────
   SUBTÍTULO
   ───────────────────────────────────────── */
.main-subtitle {
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  line-height: 1.65;
  color: #546e7a;
  margin: 0;
  animation: fadeSlide 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

/* ─────────────────────────────────────────
   EQUIPO
   ───────────────────────────────────────── */
.team-section {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vh, 0.85rem);
  animation: fadeSlide 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.team-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(0.65rem, 1vw, 0.75rem);
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #90a4ae;
  margin: 0;
  text-transform: uppercase;
}

.team-label i {
  font-size: 1rem;
}

.team-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(0.5rem, 1.2vw, 0.9rem);
}

.member-card {
  display: flex;
  align-items: center;
  gap: clamp(8px, 1.2vw, 12px);
  padding: clamp(8px, 1.5vw, 12px) clamp(10px, 1.5vw, 14px);
  background: #fafafa;
  border: 1px solid #eeeeee;
  border-radius: 14px;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;
  overflow: hidden; /* ← evita que el contenido interno desborde */
}

.member-card:hover {
  border-color: #c8e6c9;
  box-shadow: 0 4px 16px rgba(46, 125, 50, 0.1);
  transform: translateY(-2px);
}

.member-avatar {
  flex-shrink: 0;
  width: clamp(34px, 4.5vw, 44px);
  height: clamp(34px, 4.5vw, 44px);
  border-radius: 50%;
  background: #eceff1;
  border: 1.5px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.65rem, 1vw, 0.8rem);
  font-weight: 800;
  color: #607d8b;
  letter-spacing: 0.5px;
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0; /* ← permite que el texto haga truncate sin romper */
  overflow: hidden;
}

.member-name {
  font-size: clamp(0.75rem, 1.1vw, 0.9rem);
  font-weight: 700;
  color: #212121;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-role {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: clamp(0.6rem, 0.85vw, 0.7rem);
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.member-role i {
  font-size: 0.85rem;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────
   CTA
   ───────────────────────────────────────── */
.cta-row {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 1.4rem);
  flex-wrap: nowrap;
  overflow: hidden;
  animation: fadeSlide 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: clamp(10px, 1.5vh, 15px) clamp(18px, 3vw, 30px);
  background: #1b5e20;
  color: #fff;
  font-size: clamp(0.85rem, 1.3vw, 1rem);
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    background 0.25s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
  box-shadow: 0 4px 18px rgba(27, 94, 32, 0.35);
}

.cta-btn i {
  font-size: 1.2rem;
}

.cta-btn:hover {
  background: #2e7d32;
  transform: translateY(-3px);
  box-shadow: 0 8px 26px rgba(27, 94, 32, 0.4);
}

.cta-btn:active {
  transform: scale(0.97);
}

.cta-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(0.8rem, 1.1vw, 0.9rem);
  font-weight: 600;
  color: #78909c;
  white-space: nowrap;
  flex-shrink: 0;
}

.cta-meta i {
  font-size: 1.1rem;
}

/* ═══════════════════════════════════════════
   MOBILE — columna única, sin overflow
   ═══════════════════════════════════════════ */
@media (max-width: 768px) {
  .ova-shell {
    flex-direction: column;
  }

  /* Panel izquierdo: franja superior compacta */
  .panel-left {
    flex: 0 0 auto;
    max-width: 100%;
    width: 100%;
    height: auto;
    padding: clamp(1.2rem, 4vw, 2rem) 1.5rem 1rem;
  }

  .left-content {
    flex-direction: row;
    justify-content: flex-start;
    height: auto;
    gap: 1rem;
    padding: 0;
  }

  .hero-logo {
    width: clamp(64px, 18vw, 90px) !important;
    height: clamp(64px, 18vw, 90px) !important;
  }

  .left-badge {
    font-size: 0.78rem;
  }

  /* Panel derecho: resto del espacio */
  .panel-right {
    flex: 1 1 0;
    min-height: 0;
    overflow: hidden;
    padding: 1.2rem 1.5rem 1.5rem;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .right-inner {
    max-width: 100%;
    gap: 0.75rem;
  }

  .main-title {
    font-size: clamp(1.6rem, 7vw, 2.2rem);
  }

  .main-subtitle {
    font-size: 0.88rem;
    line-height: 1.55;
  }

  .team-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.55rem;
  }

  .member-card {
    padding: 8px 10px;
    border-radius: 12px;
  }

  .cta-btn {
    padding: 11px 20px;
    font-size: 0.9rem;
    border-radius: 10px;
  }
}

/* Pantallas muy pequeñas (≤360px) */
@media (max-width: 360px) {
  .team-grid {
    grid-template-columns: 1fr;
  }

  .main-title {
    font-size: 1.5rem;
  }
}
</style>
