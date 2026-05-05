<template>
  <v-main class="contenidos-main">
    <v-container fluid class="contenidos-container">
      <div class="contenidos-header mb-8">
        <h1 class="page-title">Explora los Conceptos</h1>
        <p class="page-subtitle">
          Aprende sobre los elementos clave de la fotosíntesis
        </p>
      </div>

      <v-row class="content-grid">
        <v-col cols="12" sm="12" md="6" lg="4" class="mb-6">
          <ContCardcontenidos
            titulo="¿Qué es la fotosíntesis?"
            texto="Conoce los conceptos básicos"
            class="h-100"
          >
            <v-img
              :src="useAsset('fotosintesis-1.png')"
              height="250"
              cover
              class="card-img rounded-lg"
            />

            <template #modal>
              <div class="modal-content">
                <h2 class="modal-title">El proceso de fotosíntesis</h2>
                <p class="modal-texto text-justify">
                  Fotosíntesis es el proceso mediante el cual las plantas
                  verdes, las algas y algunas bacterias convierten la energía
                  luminosa en energía química. Ocurre principalmente en los
                  cloroplastos de las células vegetales. Durante la
                  fotosíntesis, las plantas absorben dióxido de carbono del aire
                  y agua del suelo. Utilizando la luz solar, los transforman en
                  glucosa (un azúcar) y oxígeno. Este proceso es esencial para
                  producir alimentos y oxígeno, sustentando la vida en la
                  Tierra.
                </p>
                <p class="modal-texto font-weight-bold mt-6 mb-4">
                  La reacción general se puede resumir así:
                </p>
                <v-img
                  :src="useAsset('modal-1-fotosintesis.jpeg')"
                  rounded="lg"
                  class="mt-4 mb-4"
                />
                <p class="text-caption text-grey">
                  <em>(The Process of Photosynthesis, 2025)</em>
                </p>
              </div>
            </template>
          </ContCardcontenidos>
        </v-col>

        <v-col cols="12" sm="12" md="6" lg="4" class="mb-6">
          <ContCardcontenidos
            titulo="Los cloroplastos"
            texto="Organelo que realiza fotosíntesis"
            class="h-100"
          >
            <v-img
              :src="useAsset('cloroplastos.jpg')"
              height="250"
              cover
              class="card-img rounded-lg"
            />

            <template #modal>
              <div class="modal-content">
                <h2 class="modal-title">El cloroplasto</h2>
                <p class="modal-texto text-justify">
                  El cloroplasto es el orgánulo clave responsable de
                  fotosíntesis. Los cloroplastos son orgánulos de doble membrana
                  que se encuentran en las células vegetales y algunas algas,
                  responsables de la fotosíntesis. Esta estructura única permite
                  a los cloroplastos convertir eficientemente la energía
                  luminosa en energía química a través de la fotosíntesis.
                </p>
                <v-img
                  :src="useAsset('cloroplastos.png')"
                  rounded="lg"
                  class="mt-6 mb-6"
                />
                <p class="text-caption text-grey mb-6">
                  <em>(The Process of Photosynthesis, 2025)</em>
                </p>

                <div class="video-section">
                  <h3 class="modal-subtitle">Conoce los cloroplastos</h3>
                  <p class="text-body-2 mb-4">
                    Video interactivo donde te adentrarás en el interior de los
                    cloroplastos
                  </p>
                  <div class="video-container">
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/Ql-OuxsOUuI?si=hqoQbtMXGPjTrBW4"
                      title="YouTube video player"
                      frameborder="0"
                      allow="
                        accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture;
                        web-share;
                      "
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </template>
          </ContCardcontenidos>
        </v-col>

        <v-col cols="12" sm="12" md="6" lg="4" class="mb-6">
          <ContCardcontenidos
            titulo="Etapas de la Fotosíntesis"
            texto="Los ingredientes clave"
            class="h-100"
          >
            <v-img
              :src="useAsset('concepto.png')"
              height="250"
              cover
              class="card-img rounded-lg"
            />

            <template #modal>
              <div class="modal-content">
                <h2 class="modal-title">Ingredientes de la Fotosíntesis</h2>
                <v-img :src="useAsset('etapas-foto.png')">
                  
                </v-img>
                <p class="modal-texto text-justify">
                  El proceso bioquímico de la fotosíntesis ocurre en dos etapas
                  diferenciadas: la etapa luminosa (o lumínica) y la etapa
                  oscura. En la primera es indispensable la presencia de luz,
                  mientras que en la segunda no se requiere (lo cual no
                  significa que ocurra necesariamente en oscuridad). 
                  <br>
                  <br>
                  <b>Etapa luminosa o fotoquímica.</b> Durante esta fase, suceden las
                  reacciones que dependen de la luz. La planta capta la luz
                  solar por medio de la clorofila y la utiliza para producir
                  moléculas que almacenan energía, llamadas ATP y NADPH. En este
                  proceso se rompen moléculas de agua y se libera oxígeno. 
                  <br>
                  <br>
                  <b>Etapa oscura o sintética.</b> Esta fase tiene lugar dentro de los
                  cloroplastos de las células vegetales. En estas organelas, se
                  fabrican carbohidratos utilizando dióxido de carbono del aire
                  y las moléculas generadas durante la etapa luminosa (ATP y
                  NADPH). Este proceso ocurre a través de una serie de
                  reacciones químicas muy complejas, conocidas como el ciclo de
                  Calvin-Benson.
                </p>
                <iframe class="w-100" width="560" height="315" src="https://www.youtube.com/embed/WExnW5uk0gg?si=tmUe5yC6pPdZkZvg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </template>
          </ContCardcontenidos>
        </v-col>
      </v-row>

      <div class="actions-footer mt-8 mb-4">
        <v-btn
          to="/dashboard"
          variant="outlined"
          size="large"
          rounded="lg"
          class="btn-regresar"
        >
          <v-icon icon="mdi-arrow-left" start></v-icon>
          Regresar
        </v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.contenidos-main {
  width: 100%;
  min-height: 100%;
}

.contenidos-container {
  padding: clamp(1.5rem, 4vw, 3rem) !important;
  max-width: 1400px !important;
}

.contenidos-header {
  text-align: center;
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
}

.page-title {
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 800;
  color: #1b5e20;
  margin: 0 0 0.5rem 0;
  line-height: 1.1;
}

.page-subtitle {
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  color: #546e54;
  margin: 0;
  font-weight: 500;
}

.content-grid {
  width: 100%;
  margin: 0 !important;
}

.v-col {
  transition: all 0.3s ease;
  padding: clamp(0.75rem, 2vw, 1.5rem) !important;
}

/* Cards */
:deep(.v-card) {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  transition: all 0.3s ease;
}

:deep(.v-card:hover) {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.card-img {
  border-radius: 16px;
  margin-bottom: 1rem;
}

/* Modal Content */
.modal-content {
  width: 100%;
}

.modal-title {
  font-size: clamp(1.4rem, 4vw, 1.75rem);
  font-weight: 800;
  color: #1b5e20;
  margin: 0 0 1rem 0;
}

.modal-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  font-weight: 700;
  color: #2d6a4f;
  margin: 1.5rem 0 0.75rem 0;
}

.modal-texto {
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.8;
  color: #374151;
  margin-bottom: 1rem;
}

/* Video Section */
.video-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

/* Footer Actions */
.actions-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(1rem, 2vw, 2rem);
}

.btn-regresar {
  background: linear-gradient(135deg, #2d6a4f 0%, #1b5e20 100%) !important;
  color: white !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(45, 106, 79, 0.2);
}

.btn-regresar:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(45, 106, 79, 0.3);
}

/* Responsive */
@media (max-width: 960px) {
  .contenidos-container {
    padding: clamp(1rem, 3vw, 2rem) !important;
  }

  .page-title {
    margin-bottom: 0.25rem;
  }

  .v-col {
    margin-bottom: 0.5rem !important;
  }

  :deep(.v-card) {
    border-radius: 16px;
  }
}

@media (max-width: 600px) {
  .contenidos-container {
    padding: 1rem !important;
  }

  .contenidos-header {
    margin-bottom: 1.5rem;
  }

  .page-title {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .v-col {
    padding: 0.5rem !important;
    margin-bottom: 1rem !important;
  }

  .card-img {
    height: 200px !important;
  }

  .modal-title {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }

  .modal-texto {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .video-container {
    padding-bottom: 56.25%;
  }

  .actions-footer {
    padding: 1rem 0.5rem;
  }

  .btn-regresar {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .contenidos-container {
    padding: 0.75rem !important;
  }

  .page-title {
    font-size: 1.3rem;
  }

  .page-subtitle {
    font-size: 0.85rem;
  }

  .v-col {
    padding: 0.25rem !important;
  }

  :deep(.v-card) {
    border-radius: 12px;
  }

  .card-img {
    height: 150px !important;
  }

  .modal-content {
    padding: 0.5rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }

  .modal-texto {
    font-size: 0.85rem;
  }
}

/* Agrega o ajusta esto en el style de tu página principal */
@media (max-width: 600px) {
  /* Asegura que el contenido dentro del modal no se vea apretado en móviles */
  .modal-content {
    padding: 0.5rem 0;
  }

  /* Esto ayuda a que las imágenes dentro del modal no se deformen */
  .modal-content v-img {
    height: auto !important;
  }
}
</style>
