<template>
  <v-main class="recursos-shell">
    <LoadingScreen :active="isLoading" :student-name="state.name" status-message="Cargando biblioteca de recursos..." />

    <!-- DECORACIONES BIO-DINÁMICAS (INTENSIFICADAS) -->
    <div class="grain-overlay" aria-hidden="true" />
    <div class="parallax-bg">
      <div class="glass-blob blob-1"></div>
      <div class="glass-blob blob-2 hide-mobile"></div>
      <div class="glass-blob blob-3 hide-mobile"></div>
      
      <!-- Rayos de Luz (Ocultos en móvil) -->
      <div class="sun-ray r-1 hide-mobile"></div>
      <div class="sun-ray r-2 hide-mobile"></div>

      <!-- Partículas y Burbujas (Ocultas en móvil para máxima optimización) -->
      <div v-if="!isMobile" class="particles-container">
        <div v-for="n in 15" :key="'p'+n" class="bio-particle" :style="particleStyles(n)"></div>
        <div v-for="n in 10" :key="'b'+n" class="oxygen-bubble" :style="bubbleStyles(n)"></div>
      </div>
    </div>

    <v-container class="recursos-container">
      <!-- HEADER -->
      <header class="recursos-header">
        <div class="header-badge">Material Complementario</div>
        <h1 class="recursos-title">Recursos Externos <span class="accent-dot">.</span></h1>
        <p class="recursos-subtitle">
          Amplía tu conocimiento con nuestra selección curada de documentos, videos y sitios web especializados.
        </p>
      </header>

      <!-- CATEGORY SELECTOR (TABS) -->
      <div class="tabs-container mb-12">
        <div class="custom-tabs">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            :class="['tab-btn', { active: activeTab === cat.id }]"
            @click="activeTab = cat.id"
          >
            <v-icon :icon="cat.icon" class="mr-2" size="20" />
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- CONTENT GRID -->
      <v-window v-model="activeTab" class="resources-window">
        <!-- PDFS -->
        <v-window-item value="pdf">
          <v-row>
            <v-col v-for="(pdf, index) in resources.pdfs" :key="index" cols="12" md="6" lg="4">
              <v-card class="resource-card glass-card" rounded="xl">
                <div class="card-icon-wrap pdf">
                  <v-icon icon="mdi-file-pdf-box" size="32" color="red-darken-1" />
                </div>
                <div class="card-body">
                  <h3 class="res-title">{{ pdf.title }}</h3>
                  <p class="res-desc">{{ pdf.description }}</p>
                  <v-btn
                    :href="pdf.link"
                    target="_blank"
                    block
                    variant="tonal"
                    color="primary"
                    rounded="lg"
                    class="mt-4 action-btn"
                  >
                    Ver Documento
                    <v-icon icon="mdi-open-in-new" end size="16" />
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- VIDEOS -->
        <v-window-item value="video">
          <v-row>
            <v-col v-for="(vid, index) in resources.videos" :key="index" cols="12" md="6">
              <v-card class="resource-card video-card glass-card" rounded="xl">
                <div class="video-preview">
                  <v-img :src="vid.thumbnail" height="200" cover>
                    <div class="play-overlay">
                      <v-icon icon="mdi-play-circle" size="64" color="white" />
                    </div>
                  </v-img>
                </div>
                <div class="card-body">
                  <h3 class="res-title">{{ vid.title }}</h3>
                  <p class="res-desc">{{ vid.description }}</p>
                  <v-btn
                    :href="vid.link"
                    target="_blank"
                    block
                    variant="flat"
                    color="primary"
                    rounded="lg"
                    class="mt-4 action-btn"
                  >
                    Ver en YouTube
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- WEBS -->
        <v-window-item value="web">
          <v-row>
            <v-col v-for="(web, index) in resources.webs" :key="index" cols="12" md="6" lg="4">
              <v-card class="resource-card glass-card" rounded="xl">
                <div class="card-icon-wrap web">
                  <v-icon icon="mdi-web" size="32" color="blue-darken-1" />
                </div>
                <div class="card-body">
                  <h3 class="res-title">{{ web.title }}</h3>
                  <p class="res-desc">{{ web.description }}</p>
                  <v-btn
                    :href="web.link"
                    target="_blank"
                    block
                    variant="tonal"
                    color="primary"
                    rounded="lg"
                    class="mt-4 action-btn"
                  >
                    Visitar Sitio
                    <v-icon icon="mdi-launch" end size="16" />
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>

      <!-- BACK BUTTON -->
      <footer class="action-footer text-center mt-12">
        <v-btn
          to="/dashboard"
          variant="flat"
          height="56"
          rounded="xl"
          class="btn-back-premium"
        >
          <v-icon icon="mdi-arrow-left" start />
          Volver al Dashboard
        </v-btn>
      </footer>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStudentProfile } from '@/composables/useStudentProfile';

const { state, loadProfile } = useStudentProfile();
const isLoading = ref(true);
const activeTab = ref('pdf');
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const categories = [
  { id: 'pdf', name: 'Documentos PDF', icon: 'mdi-file-document-outline' },
  { id: 'video', name: 'Videos Educativos', icon: 'mdi-play-box-outline' },
  { id: 'web', name: 'Sitios de Interés', icon: 'mdi-earth' }
];

const resources = {
  pdfs: [
    { 
      title: 'Guía Completa de Fotosíntesis', 
      description: 'Un manual detallado sobre las fases lumínica y oscura.',
      link: 'https://www.biologia.edu.ar/plantas/fotosint.htm' 
    },
    { 
      title: 'Importancia del CO2', 
      description: 'Artículo científico sobre el papel del carbono en la vida vegetal.',
      link: '#' 
    },
    { 
      title: 'Glosario Biológico', 
      description: 'Términos clave para entender los procesos celulares.',
      link: '#' 
    }
  ],
  videos: [
    { 
      title: 'El Ciclo de Calvin Explicado', 
      description: 'Video animado sobre la fase oscura de la fotosíntesis.',
      thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
      link: 'https://youtu.be/Ql-OuxsOUuI' 
    },
    { 
      title: 'Cloroplastos al Detalle', 
      description: 'Viaje microscópico dentro de una célula vegetal.',
      thumbnail: 'https://images.unsplash.com/photo-1501004318641-729e8e26bd05?q=80&w=1974&auto=format&fit=crop',
      link: 'https://youtu.be/WExnW5uk0gg' 
    }
  ],
  webs: [
    { 
      title: 'National Geographic: Plantas', 
      description: 'Enciclopedia visual sobre la biodiversidad vegetal.',
      link: 'https://www.nationalgeographic.com.es/temas/plantas' 
    },
    { 
      title: 'Britannica: Photosynthesis', 
      description: 'Recurso académico de alta fiabilidad sobre el proceso.',
      link: 'https://www.britannica.com/science/photosynthesis' 
    },
    { 
      title: 'Khan Academy: Biología', 
      description: 'Lecciones interactivas y ejercicios prácticos.',
      link: 'https://es.khanacademy.org/science/biology/photosynthesis-in-plants' 
    }
  ]
};

const particleStyles = (n) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  width: `${6 + Math.random() * 12}px`,
  height: `${6 + Math.random() * 12}px`,
  animationDuration: `${10 + Math.random() * 15}s`,
  animationDelay: `${Math.random() * 5}s`,
  opacity: 0.05 + Math.random() * 0.15
});

const bubbleStyles = (n) => ({
  left: `${Math.random() * 100}%`,
  bottom: `-60px`,
  width: `${12 + Math.random() * 22}px`,
  height: `${12 + Math.random() * 22}px`,
  animationDuration: `${12 + Math.random() * 18}s`,
  animationDelay: `${Math.random() * 10}s`,
  opacity: 0.05 + Math.random() * 0.15
});

onMounted(() => {
  loadProfile();
  checkMobile();
  window.addEventListener('resize', checkMobile);
  setTimeout(() => {
    isLoading.value = false;
  }, 1200);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.recursos-shell {
  min-height: 100vh;
  position: relative;
  background: #fbfcf8;
  overflow-x: hidden;
}

.recursos-container {
  padding: clamp(2rem, 5vw, 6rem) !important;
  max-width: 1440px !important;
  position: relative;
  z-index: 25;
}

/* DECORACIONES */
.grain-overlay {
  position: fixed;
  inset: 0;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.1;
  pointer-events: none;
  z-index: 10;
}

.parallax-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.parallax-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(128, 161, 36, 0.12) 0%, rgba(221, 174, 56, 0.12) 50%, rgba(45, 106, 79, 0.12) 100%);
  background-size: 400% 400%;
  animation: mesh-flow 18s ease infinite;
}

@keyframes mesh-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glass-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.25;
  animation: float-blob 20s infinite ease-in-out alternate;
}

.blob-1 { width: 800px; height: 800px; background: #80a124; top: -10%; left: -10%; }
.blob-2 { width: 700px; height: 700px; background: #ddae38; bottom: -10%; right: -10%; animation-delay: -5s; }
.blob-3 { width: 500px; height: 500px; background: #2d6a4f; top: 40%; right: 10%; animation-delay: -10s; }

.sun-ray {
  position: absolute;
  top: -10%;
  width: 35vw;
  height: 120vh;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transform: rotate(-25deg);
  filter: blur(50px);
  animation: ray-move 12s infinite alternate ease-in-out;
}
.r-1 { left: 15%; }
.r-2 { left: 55%; animation-delay: -6s; }

@keyframes ray-move {
  from { transform: translateX(-15%) rotate(-25deg); }
  to { transform: translateX(15%) rotate(-25deg); }
}

.bio-particle {
  position: absolute;
  background: #80a124;
  border-radius: 50%;
  filter: blur(2px);
  animation: particle-float 12s infinite ease-in-out;
}

@keyframes particle-float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(60px, 40px); }
}

.oxygen-bubble {
  position: absolute;
  border: 1.5px solid rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
  backdrop-filter: blur(1px);
  animation: bubble-up 15s infinite linear;
}

@keyframes bubble-up {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 0.4; }
  90% { opacity: 0.4; }
  100% { transform: translateY(-120vh); opacity: 0; }
}

/* OPTIMIZACIÓN MÓVIL */
@media (max-width: 768px) {
  .hide-mobile {
    display: none !important;
  }

  .parallax-bg::before {
    animation-duration: 40s !important;
    opacity: 0.08;
  }

  .glass-blob {
    filter: blur(80px) !important;
    animation: none !important;
    opacity: 0.2;
  }

  .blob-1 {
    width: 300px;
    height: 300px;
    top: 5%;
    left: -5%;
  }

  .bio-particle, .oxygen-bubble {
    animation-duration: 25s !important;
    filter: none !important;
  }

  .oxygen-bubble {
    backdrop-filter: none !important;
  }

  .resource-card {
    backdrop-filter: none !important;
    transform: none !important;
  }

  .recursos-container {
    padding: 2rem 1.25rem !important;
  }

  .recursos-title {
    font-size: 2.2rem;
  }
}

/* HEADER */
.recursos-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 4rem;
}

.header-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(128, 161, 36, 0.1);
  color: #80a124;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
  border-radius: 99px;
  margin-bottom: 1.5rem;
}

.recursos-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 950;
  color: #1a1a1a;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.accent-dot { color: #80a124; }

.recursos-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
}

/* TABS */
.tabs-container {
  display: flex;
  justify-content: center;
}

.custom-tabs {
  background: white;
  padding: 8px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex;
  gap: 8px;
  border: 1px solid rgba(0,0,0,0.03);
}

.tab-btn {
  padding: 12px 24px;
  border-radius: 18px;
  font-weight: 800;
  color: #64748b;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.tab-btn:hover {
  background: #f8fafc;
  color: #1e293b;
}

.tab-btn.active {
  background: #1a1a1a;
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

/* CARDS */
.resource-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0,0,0,0.03) !important;
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
}

.resource-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.1) !important;
}

.card-icon-wrap {
  padding: 2rem 2rem 1rem;
}

.card-body {
  padding: 1.5rem 2rem 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.res-title {
  font-size: 1.4rem;
  font-weight: 850;
  color: #1e293b;
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
}

.res-desc {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.video-preview {
  position: relative;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.resource-card:hover .play-overlay {
  background: rgba(0,0,0,0.4);
}

.action-btn {
  font-weight: 800 !important;
  text-transform: none !important;
  letter-spacing: 0px !important;
}

/* FOOTER */
.btn-back-premium {
  background: white !important;
  color: #1a1a1a !important;
  font-weight: 800 !important;
  padding: 0 40px !important;
  border: 1px solid rgba(0,0,0,0.1) !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important;
  transition: all 0.3s ease !important;
}

.btn-back-premium:hover {
  transform: translateY(-5px);
  background: #1a1a1a !important;
  color: white !important;
}

@media (max-width: 600px) {
  .custom-tabs {
    flex-direction: column;
    width: 100%;
  }
  .tab-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
