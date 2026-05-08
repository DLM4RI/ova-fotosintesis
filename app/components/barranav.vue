<template>
  <div class="nav-system-container">
    <!-- 1. BARRA LATERAL (NAVEGACIÓN) -->
    <div :class="['sidebar-panel', { 'sidebar-open': modelValue }]">
      <button
        class="sidebar-toggle"
        @click="toggleDrawer"
        aria-label="Toggle menu"
      >
        <i :class="modelValue ? 'bx bx-x' : 'bx bx-menu-alt-left'"></i>
      </button>

      <!-- CAMPANITA DE NOTIFICACIONES -->
      <button
        v-if="!modelValue"
        class="notif-bell-btn"
        @click="$emit('open-updates')"
        aria-label="Ver actualizaciones"
      >
        <i class="bx bx-bell"></i>
        <span class="bell-dot"></span>
      </button>

      <div v-if="modelValue" class="sidebar-content">
        <div class="sidebar-profile">
          <div class="avatar-ring">
            <i class="bx bx-user"></i>
          </div>
          <div class="profile-text">
            <span class="p-name">{{ state.name || "Invitado" }}</span>
            <span class="p-grade">{{
              state.grade ? state.grade + "° Grado" : "Sin Grado"
            }}</span>
          </div>
        </div>

        <div class="sidebar-divider"></div>

        <nav class="sidebar-links">
          <nuxt-link to="/dashboard" class="s-link" @click="close">
            <i class="bx bxs-dashboard"></i> <span>Inicio</span>
          </nuxt-link>
          <nuxt-link to="/contenidos" class="s-link" @click="close">
            <i class="bx bxs-book-content"></i> <span>Contenidos</span>
          </nuxt-link>
          <nuxt-link to="/recursos" class="s-link" @click="close">
            <i class="bx bxs-folder-open"></i> <span>Recursos</span>
          </nuxt-link>
          <nuxt-link to="/actividades" class="s-link" @click="close">
            <i class="bx bxs-extension"></i> <span>Actividades</span>
          </nuxt-link>
          <nuxt-link 
            :to="isComplete ? '/evaluacion' : ''" 
            class="s-link" 
            :class="{ 'locked-link': !isComplete }"
            @click="isComplete ? close : null"
          >
            <i class="bx" :class="isComplete ? 'bxs-edit' : 'bx-lock-alt'"></i> 
            <span>Evaluación</span>
            <v-chip v-if="!isComplete" size="x-small" color="orange" class="ml-auto">Bloqueado</v-chip>
          </nuxt-link>
          <nuxt-link to="/creditos" class="s-link" @click="close">
            <i class="bx bxs-group"></i> <span>Créditos</span>
          </nuxt-link>
        </nav>

        <div class="sidebar-footer">
          <button class="s-link logout-btn" @click="showLogoutModal = true">
            <i class="bx bx-log-out-circle"></i> <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. CARD DE CONTROL (PERSONALIZACIÓN Y PROGRESO) -->
    <transition name="card-slide">
      <div v-if="modelValue" class="control-center-card">
        <div class="card-header">
          <div class="header-icon">
            <LeafAlt size="20" color="var(--primary-color)" />
          </div>
          <h3>Centro de Personalización</h3>
        </div>

        <div class="card-body">
          <!-- Bloque de Progreso -->
          <div class="control-section">
            <div class="section-label">TU NIVEL ACTUAL</div>
            <div class="progress-info">
              <div class="progress-bar-container">
                <div
                  class="progress-fill"
                  :style="{ width: progressPercentage + '%', background: 'var(--primary-color)' }"
                ></div>
              </div>
              <div class="stats-row">
                <span class="progress-percent">{{ progressPercentage }}% OVA Completado</span>
                <span class="xp-count">{{ progressPercentage * 50 }} XP</span>
              </div>
            </div>
          </div>

          <!-- Bloque de Personalización -->
          <div class="control-section">
            <div class="section-label">APARIENCIA DEL SISTEMA</div>
            <div class="settings-grid">
              <div class="setting-item">
                <span>Esquema de Color</span>
                <div class="color-options">
                  <div
                    class="c-opt nature"
                    :class="{ active: settings.themeName === 'nature' }"
                    @click="setTheme('nature')"
                  ></div>
                  <div
                    class="c-opt dark"
                    :class="{ active: settings.themeName === 'dark' }"
                    @click="setTheme('dark')"
                  ></div>
                  <div
                    class="c-opt gold"
                    :class="{ active: settings.themeName === 'gold' }"
                    @click="setTheme('gold')"
                  ></div>
                </div>
              </div>
              <div class="setting-item">
                <span>Escala Visual</span>
                <div class="font-options">
                  <button
                    class="f-btn"
                    :class="{ active: settings.fontSize === 90 }"
                    @click="setFontSize(90)"
                  >
                    A-
                  </button>
                  <button
                    class="f-btn"
                    :class="{ active: settings.fontSize === 100 }"
                    @click="setFontSize(100)"
                  >
                    Aa
                  </button>
                  <button
                    class="f-btn"
                    :class="{ active: settings.fontSize === 115 }"
                    @click="setFontSize(115)"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Neuro-Marketing Visual Tip -->
          <div
            class="neuro-tip"
            :style="{ borderColor: 'var(--primary-color)' }"
          >
            <i
              class="bx bxs-check-shield"
              :style="{ color: 'var(--primary-color)' }"
            ></i>
            <p>
              El modo
              <strong>{{
                settings.themeName === "dark" ? "Noche" : "Naturaleza"
              }}</strong>
              está optimizado para
              {{
                settings.themeName === "dark"
                  ? "reducir la luz azul"
                  : "mejorar el enfoque"
              }}
              durante tu aprendizaje.
            </p>
          </div>
        </div>
      </div>
    </transition>

    <!-- 3. OVERLAY CON VIDEO/IMAGEN CINEMATOGRÁFICA -->
    <transition name="fade">
      <div v-if="modelValue" class="global-overlay" @click="close">
        <!-- Fondo Visual para que no se vea vacío -->
        <div class="overlay-visual-container" @click.stop>
          <v-img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
            cover
            class="visual-bg"
          />
          <div class="visual-overlay"></div>
          <div class="visual-content">
            <div class="visual-tag">VIVIR LA CIENCIA</div>
            <h2 class="visual-quote">
              "La fotosíntesis es la forma en que el sol se vuelve comida para
              el mundo."
            </h2>
            <div class="visual-decoration">
              <div class="floating-particle p-1"></div>
              <div class="floating-particle p-2"></div>
              <div class="floating-particle p-3"></div>
            </div>
          </div>
        </div>

        <!-- Blobs decorativos -->
        <div
          class="blur-blob b-1"
          :style="{ background: 'var(--primary-color)' }"
        ></div>
        <div class="blur-blob b-2"></div>
      </div>
    </transition>

    <!-- 4. MODAL DE LOGOUT -->
    <v-dialog v-model="showLogoutModal" max-width="450" persistent>
      <v-card class="premium-logout-card" rounded="xl">
        <div class="logout-hero">
          <v-img
            src="https://images.unsplash.com/photo-1501004318641-729e8e26bd05?q=80&w=1974&auto=format&fit=crop"
            height="180"
            cover
          />
          <div class="hero-overlay"></div>
          <div class="hero-icon">
            <i class="bx bx-power-off"></i>
          </div>
        </div>

        <v-card-text class="text-center pa-8">
          <h2 class="logout-title">¿Deseas salir del sistema?</h2>
          <p class="logout-subtitle">
            Al cerrar sesión se reiniciará tu sesión actual. Tu nombre y
            progreso guardado en este equipo serán eliminados.
          </p>

          <div class="logout-actions">
            <v-btn
              block
              height="56"
              rounded="xl"
              variant="flat"
              color="red-darken-1"
              class="confirm-logout-btn"
              @click="confirmLogout"
            >
              Sí, cerrar y borrar todo
            </v-btn>
            <v-btn
              block
              height="56"
              rounded="xl"
              variant="text"
              class="cancel-logout-btn mt-2"
              @click="showLogoutModal = false"
            >
              Volver al aprendizaje
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LeafAlt } from "@boxicons/vue";
import { useStudentProfile } from "@/composables/useStudentProfile";
import { useAppSettings } from "@/composables/useAppSettings";
import { useProgress } from "@/composables/useProgress";

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue", "open-updates"]);

const { state, loadProfile, logout } = useStudentProfile();
const { state: settings, setFontSize, setTheme } = useAppSettings();
const { progressPercentage, isComplete } = useProgress();
const showLogoutModal = ref(false);

onMounted(() => {
  loadProfile();
});

const toggleDrawer = () => {
  emit("update:modelValue", !props.modelValue);
};

const close = () => {
  emit("update:modelValue", false);
};

const confirmLogout = () => {
  logout();
  showLogoutModal.value = false;
  close();
  navigateTo("/");
};
</script>

<style scoped>
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");

/* =============================================
   CONTENEDOR PRINCIPAL
   ============================================= */
.nav-system-container {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2100;
  display: flex;
  align-items: flex-start;
  padding: 15px;
  gap: 15px;
}

.nav-system-container > * {
  pointer-events: auto;
}

/* =============================================
   SIDEBAR PANEL
   ============================================= */
.sidebar-panel {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  overflow: hidden;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-panel.sidebar-open {
  width: 290px;
  height: auto;
  max-height: 90vh;
  border-radius: 30px;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
}

.notif-bell-btn {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--primary-color);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.notif-bell-btn:hover {
  transform: scale(1.1);
  color: #ddae38;
}

.bell-dot {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
}

.sidebar-toggle {
  width: 60px;
  height: 60px;
  border: none;
  background: transparent;
  font-size: 28px;
  color: var(--primary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.sidebar-toggle:hover {
  transform: rotate(90deg);
}

.sidebar-content {
  padding: 0 25px;
  opacity: 0;
  animation: fadeIn 0.5s 0.3s forwards;
  overflow-y: auto;
  flex: 1;
}

.sidebar-content::-webkit-scrollbar {
  width: 4px;
}
.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.avatar-ring {
  width: 50px;
  height: 50px;
  background: #f8fafc;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--primary-color);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.profile-text {
  display: flex;
  flex-direction: column;
}

.p-name {
  font-weight: 900;
  font-size: 1.05rem;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}
.p-grade {
  font-size: 0.8rem;
  color: var(--primary-color);
  font-weight: 800;
  text-transform: uppercase;
}

.sidebar-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.05),
    transparent
  );
  margin: 0 -25px 25px;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.s-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  border-radius: 18px;
  color: #4b5563;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
}

.s-link:hover {
  background: rgba(128, 161, 36, 0.05);
  color: var(--primary-color);
  transform: translateX(8px);
}

.s-link.router-link-active {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 10px 20px rgba(128, 161, 36, 0.2);
}

.locked-link {
  opacity: 0.7;
  cursor: not-allowed !important;
}

.locked-link:hover {
  background: rgba(255, 165, 0, 0.05) !important;
  color: #ff9800 !important;
  transform: none !important;
}

.s-link i {
  font-size: 22px;
}

.sidebar-footer {
  margin-top: 50px;
}

.logout-btn {
  color: #f87171;
}
.logout-btn:hover {
  background: #fff1f2;
  color: #ef4444;
}

/* =============================================
   CONTROL CENTER CARD
   ============================================= */
.control-center-card {
  width: 400px;
  background: white;
  border-radius: 32px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
  padding: 30px;
  z-index: 1001;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
  max-height: 90vh;
  overflow-y: auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: #f8fafc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -1px;
}

.control-section {
  margin-bottom: 30px;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 900;
  color: #94a3b8;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progress-bar-container {
  height: 10px;
  background: #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 1s ease-in-out;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-percent {
  font-size: 0.85rem;
  font-weight: 800;
  color: #1e293b;
}
.xp-count {
  font-size: 0.75rem;
  font-weight: 900;
  color: var(--primary-color);
  background: rgba(128, 161, 36, 0.1);
  padding: 4px 10px;
  border-radius: 10px;
}

.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: #334155;
}

.color-options,
.font-options {
  display: flex;
  gap: 12px;
}

.c-opt {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s ease;
}

.c-opt:hover {
  transform: scale(1.2);
}
.c-opt.active {
  border-color: #1a1a1a;
  transform: scale(1.1);
}

.c-opt.nature {
  background: #80a124;
}
.c-opt.dark {
  background: #1f2937;
}
.c-opt.gold {
  background: #ddae38;
}

.f-btn {
  background: #f1f5f9;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 850;
  cursor: pointer;
  transition: all 0.2s ease;
}

.f-btn.active {
  background: #1e293b;
  color: white;
}

.neuro-tip {
  background: #fdfcf6;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  gap: 15px;
  border: 2px solid #fef3c7;
}

.neuro-tip i {
  font-size: 24px;
  flex-shrink: 0;
}
.neuro-tip p {
  font-size: 0.85rem;
  color: #475569;
  font-weight: 600;
  line-height: 1.5;
  margin: 0;
}

/* =============================================
   OVERLAY GLOBAL
   ============================================= */
.global-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  z-index: 999;
  pointer-events: auto;
}

/* La imagen se muestra en el fondo del overlay, a la derecha */
.overlay-visual-container {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 45%;
  max-width: 600px;
  display: flex;
  align-items: center;
  padding: 40px;
  overflow: hidden;
}

.visual-bg {
  position: absolute;
  inset: 0;
  filter: brightness(0.6) saturate(1.2);
}

.visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
}

.visual-content {
  position: relative;
  z-index: 2;
  animation: slideInRight 0.8s ease-out;
}

.visual-tag {
  color: var(--primary-color);
  font-weight: 900;
  letter-spacing: 4px;
  font-size: 0.8rem;
  margin-bottom: 20px;
}

.visual-quote {
  font-size: 2.4rem;
  font-weight: 950;
  color: white;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 30px;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.blur-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  pointer-events: none;
}

.b-1 {
  width: 500px;
  height: 500px;
  top: -10%;
  right: -5%;
}
.b-2 {
  width: 400px;
  height: 400px;
  background: #ddae38;
  bottom: -5%;
  left: 10%;
}

/* =============================================
   PREMIUM LOGOUT MODAL
   ============================================= */
.premium-logout-card {
  overflow: hidden;
  border: none !important;
}

.logout-hero {
  position: relative;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.hero-icon {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.4);
  border: 4px solid white;
}

.logout-title {
  font-size: 1.8rem;
  font-weight: 950;
  color: #1e293b;
  letter-spacing: -1.5px;
  margin-top: 20px;
}
.logout-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 30px;
  font-weight: 500;
}

.confirm-logout-btn {
  color: white !important;
  font-weight: 900 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
}
.cancel-logout-btn {
  color: #94a3b8 !important;
  font-weight: 800 !important;
  text-transform: none !important;
}

/* =============================================
   TRANSITIONS
   ============================================= */
.card-slide-enter-active,
.card-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-slide-enter-from,
.card-slide-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =============================================
   RESPONSIVE — TABLET (≤ 1200px)
   ============================================= */
@media (max-width: 1200px) {
  .overlay-visual-container {
    width: 38%;
    padding: 30px;
  }

  .visual-quote {
    font-size: 1.9rem;
  }

  .control-center-card {
    width: 340px;
  }
}

/* =============================================
   RESPONSIVE — TABLET PEQUEÑA (≤ 900px)
   La imagen se oculta, la card de control
   se posiciona debajo del sidebar en el overlay
   ============================================= */
@media (max-width: 900px) {
  /* El nav-container se convierte en columna */
  .nav-system-container {
    flex-direction: column;
    gap: 10px;
    /* Limitar al ancho para no ocupar toda la pantalla */
    max-width: calc(100vw - 30px);
  }

  /* La imagen decorativa desaparece en tablet pequeña */
  .overlay-visual-container {
    display: none;
  }

  .blur-blob {
    display: none;
  }

  /* La card de control se adapta al ancho del sidebar */
  .control-center-card {
    width: 290px;
    max-height: calc(100vh - 200px);
    padding: 24px;
  }

  /* Animación ahora desde abajo (viene debajo del sidebar) */
  .card-slide-enter-from,
  .card-slide-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }

  /* El overlay solo es backdrop, sin flex centering */
  .global-overlay {
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.4);
  }
}

/* =============================================
   RESPONSIVE — MÓVIL (≤ 600px)
   ============================================= */
@media (max-width: 600px) {
  .nav-system-container {
    top: 10px;
    left: 10px;
    padding: 0;
    gap: 10px;
    max-width: calc(100vw - 20px);
  }

  /* Sidebar ocupa casi todo el ancho en móvil */
  .sidebar-panel.sidebar-open {
    width: calc(100vw - 20px);
    max-height: 80vh;
    border-radius: 24px;
  }

  /* La card de control se oculta en móvil:
     el sidebar ya tiene toda la info necesaria */
  .control-center-card {
    display: none;
  }

  /* Notif bell se mantiene visible */
  .notif-bell-btn {
    width: 52px;
    height: 52px;
    margin-left: 12px;
  }

  /* Overlay más sutil en móvil */
  .global-overlay {
    backdrop-filter: blur(6px);
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
