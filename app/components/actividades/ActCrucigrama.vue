<template>
  <div class="actividad-inner">
    <div class="actividad-body">
      <div class="iframe-wrapper">
        <iframe
          src="https://es.educaplay.com/juego/29022626-crucigrama_de_la_fotosintesis.html"
          class="styled-iframe"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["volver"]);
</script>

<style scoped>
.iframe-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.styled-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
