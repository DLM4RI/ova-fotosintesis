<template>
  <v-card>
    <div>
      <h3 style="display: flex; align-items: center; gap: 8px">
        <Gaming fill="#ffa400" /> Sopa de letras interactiva
      </h3>
    </div>

    <!--  -->

    <div>
      <p>Encuentra las palabras acorde a lo dado en los temas</p>
    </div>
    <div style="border-radius: 12px; overflow: hidden; display: inline-block">
      <iframe
        allow="fullscreen; autoplay; allow-top-navigation-by-user-activation"
        allowfullscreen
        width="795"
        height="690"
        frameborder="0"
        src="https://es.educaplay.com/juego/28964525-fotosintesis_basica.html"
        style="display: block"
      />
    </div>
  </v-card>
</template>

<script setup>
import { Gaming } from "@boxicons/vue";

definePageMeta({
  layout: "dashboard",
});
</script>
