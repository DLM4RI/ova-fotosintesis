<template>
  <v-main>
    <v-container fluid class="d-flex ga-4">
      <v-row class="pa-12">
        <v-col cols="12" md="4">
          <ContCardcontenidos
            titulo="¿Qué es la fotosíntesis?"
            texto="Conoce los conceptos basicos"
            class="text-center"
          >
            <v-img
              :src="useAsset('concepto.png')"
              height="200"
              cover
              class="card-img"
            />

            <template #modal>
              <h3>El proceso de fotosíntesis</h3>
              <p class="modal-texto text-justify">
                Fotosíntesises el proceso mediante el cual las plantas verdes,
                las algas y algunas bacterias convierten la energía luminosa en
                energía química. Ocurre principalmente en los cloroplastos de
                las células vegetales. Durante la fotosíntesis, las plantas
                absorben dióxido de carbono del aire y agua del suelo.
                Utilizando la luz solar, los transforman en glucosa (un azúcar)
                y oxígeno. Este proceso es esencial para producir alimentos y
                oxígeno, sustentando la vida en la Tierra. <br />
                <br />
                La reacción general se puede resumir así:
                <br /><br />
                <v-img
                  :src="useAsset('modal-1-fotosintesis.jpeg')"
                  rounded="lg"
                  class="mt-3"
                />
                <cite class="text-label-small"
                  >(The Process of Photosynthesis, 2025)</cite
                >
              </p>
            </template>
          </ContCardcontenidos>
        </v-col>
        <v-col cols="12" md="4">
          <ContCardcontenidos
            titulo="Los cloroplasto"
            texto="Organelo que realiza fotosíntesis."
            class="text-center"
          >
            <v-img
              :src="useAsset('cloroplastos.jpg')"
              height="200"
              cover
              class="card-img"
            />

            <template #modal >
              <h3>El cloroplasto</h3>
              <p class="modal-texto text-justify">
                El cloroplasto es el orgánulo clave responsable de fotosíntesis.
                Los cloroplastos son orgánulos de doble membrana que se
                encuentran en las células vegetales y algunas algas,
                responsables de la fotosíntesis. Esta estructura única permite a
                los cloroplastos convertir eficientemente la energía luminosa en
                energía química a través de la fotosíntesis.<br />
                <br />
              </p>
              <v-img
                :src="useAsset('cloroplastos.png')"
                rounded="lg"
                class="mt-3"
              />
              <cite class="text-label-small"
                >(The Process of Photosynthesis, 2025)</cite
              >
              <br />
              <br />
              <b> Conoce los cloroplasto </b>
              <p>
                Video interactivo, donde te adentraras en el interior de los
                cloroplastos
              </p>
              <iframe
                class="w-100"
                width="560"
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
            </template>
          </ContCardcontenidos>
        </v-col>

        <div class="d-flex justify-end w-100 mt-3">
          <v-btn to="/dashboard">regresar</v-btn>
        </div>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.v-col {
  transition: all 0.3s ease;
}

.fill-height {
  display: flex;
  flex-direction: column;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
