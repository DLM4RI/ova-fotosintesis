<template>
  <div class="text-center">
    <v-img
      src="/loading/girasol.png"
      width="200"
      height="200"
      class="girasol mx-auto mb-6"
    />
    <p class="font-weight-black mt-2">{{ titulo }}</p>
    <p class="font-weight-bold text-grey">{{ mensaje }}</p>
  </div>
</template>
<script lang="js" setup>
defineProps({
  titulo: String,
  mensaje: String,
});
</script>

<style>
@keyframes grow {
  0% {
    transform: scale(1);
    transform: rotate(0deg);
  }
  50% {
    transform: scale(1.1);
    transform: rotate(180deg);
  }
  100% {
    transform: scale(1);
    transform: rotate(360deg);
  }
}

.girasol {
  animation: grow 5s linear infinite;
}
</style>
