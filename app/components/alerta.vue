<!-- components/MaintenanceAlert.vue -->
<template>
  <v-dialog v-model="dialog" max-width="480" persistent>
    <v-card rounded="lg">

      <v-card-text class="pa-6 text-center">
        <v-icon size="64" color="warning" class="mb-4">
          mdi-wrench-clock
        </v-icon>

        <h2 class="text-h6 font-weight-bold mb-2">
          Página en mantenimiento
        </h2>

        <p class="text-body-2 text-medium-emphasis">
          Esta página se encuentra actualmente en mantenimiento.
          Es posible que presentes <strong>fallas en el diseño</strong> 
          y <strong>funcionamiento</strong>. Disculpa las molestias.
        </p>
      </v-card-text>

      <v-card-actions class="justify-center pb-5">
        <v-btn color="warning" variant="tonal" rounded="lg" @click="dialog = false">
          Entendido
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup>
const dialog = defineModel({ default: false })



</script>