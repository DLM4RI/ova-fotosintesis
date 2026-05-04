<template>
  <div class="d-flex align-center justify-center" style="min-height: 80vh">
    <v-card width="400" class="pa-6">
      <Loading
        titulo="Pagina En Mantenimiento"
        mensaje="Porfavor vuelve pronto"
        tiempo="03/05/2026 - 05/05/2026"
      >
      </Loading>
    </v-card>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>

<style></style>
