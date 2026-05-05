<template>
  <v-container fluid class="home-wrapper d-flex align-center pa-4 pa-md-10">
    
    <v-row no-gutters align="center" justify="center" class="main-layout">
      
      <!-- SECCIÓN IZQUIERDA: Visual -->
      <v-col cols="12" md="5" lg="5" class="pa-4 d-flex justify-center">
        <div class="image-frame">
          <v-img
            :src="useAsset('logo.png')"
            class="main-img"
            cover
          />
          <!-- Badge flotante decorativo -->
          <div class="floating-badge">
            <LeafAlt fill="#ffffff" size="24" />
            <span>Ciencias Naturales</span>
          </div>
        </div>
      </v-col>

      <!-- SECCIÓN DERECHA: Información -->
      <v-col cols="12" md="7" lg="6" class="pa-4">
        
        <header class="mb-6 text-center text-md-left">
          <h1 class="hero-title mb-2">Fotosíntesis <span class="green-text">Vegetal</span></h1>
          <p class="hero-desc">
            Unidad Didáctica Integrada sobre el proceso de conversión energética en las plantas.
          </p>
        </header>

        <!-- Equipo: Diseño Responsivo (2 cols en PC, 1 en Móvil) -->
        <div class="team-container mb-8">
          <h3 class="section-label mb-4">Equipo de Desarrollo</h3>
          <v-row dense>
            <v-col v-for="p in equipo" :key="p.nombre" cols="12" sm="6">
              <div class="member-card" :style="{ '--role-color': p.color }">
                <v-avatar size="50" class="elevation-2">
                  <v-img :src="useAsset(p.img)" />
                </v-avatar>
                
                <div class="member-details ml-3">
                  <span class="member-name">{{ p.nombre }}</span>
                  <div class="member-role">
                    <component :is="p.icon" :fill="p.color" size="14" class="mr-1" />
                    <span :style="{ color: p.color }">{{ p.rol }}</span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Botón de Acción -->
        <div class="d-flex align-center flex-wrap justify-center justify-md-start gap-4">
          <v-btn
            color="#2d6a4f"
            height="56"
            rounded="lg"
            elevation="0"
            class="start-btn px-10"
            @click="irAlDashboard"
          >
            <span class="text-white">Iniciar Aprendizaje</span>
            <v-icon end icon="mdi-chevron-right" color="white" />
          </v-btn>
          
          <div class="duration-tag">
            <v-icon icon="mdi-timer-outline" size="small" class="mr-2" />
            20 minutos
          </div>
        </div>

      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { LeafAlt, CodeAlt, ListUlSquare, Briefcase } from "@boxicons/vue";
import { useRouter } from '#imports'

const router = useRouter()

const equipo = [
  { nombre: 'Mario Castro', rol: 'Desarrollador', img: 'mario.png', color: '#ff8600', icon: CodeAlt },
  { nombre: 'Rosendo De Castro', rol: 'Desarrollador', img: 'rosendo.jpeg', color: '#ff8600', icon: CodeAlt },
  { nombre: 'Fabio Cantero', rol: 'QA Engineer', img: 'fabio.png', color: '#006aff', icon: ListUlSquare },
  { nombre: 'Andrea Hernandez', rol: 'Project Manager', img: 'andrea.png', color: '#ff40e3', icon: Briefcase }
]

function irAlDashboard() {
  sessionStorage.setItem('showMaintenance', 'true')
  router.push('/dashboard')
}
</script>

<style scoped>
.home-wrapper {
  background-color: #fdfdfd;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.main-layout {
  max-width: 1200px;
  margin: auto;
}

/* Imagen con efectos asiáticos/minimalistas */
.image-frame {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.main-img {
  border-radius: 40px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
}

.floating-badge {
  position: absolute;
  bottom: 20px;
  right: -10px;
  background: #2d6a4f;
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(45, 106, 79, 0.3);
}

/* Tipografía */
.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: #1b1b1b;
}

.green-text {
  color: #40916c;
}

.hero-desc {
  font-size: 1.1rem;
  color: #555;
  max-width: 500px;
}

/* Tarjetas de integrantes mejoradas */
.section-label {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #999;
}

.member-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 16px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.member-card:hover {
  background: #ffffff;
  border-color: var(--role-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.member-name {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #222;
}

.member-role {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

/* Botones y Tags */
.start-btn {
  font-weight: 700;
  text-transform: none;
  font-size: 1rem;
}

.duration-tag {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.gap-4 { gap: 24px; }

/* Responsive */
@media (max-width: 960px) {
  .hero-title { text-align: center; }
  .hero-desc { text-align: center; margin: 0 auto; }
  .image-frame { max-width: 300px; margin-bottom: 2rem; }
}
</style>