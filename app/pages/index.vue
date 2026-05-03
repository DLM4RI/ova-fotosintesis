<template>
  <v-container
    class="d-flex align-center justify-center"
    style="min-height: 100vh"
  >
    <v-card width="500" class="pa-6 text-center">
      <v-img
        :src="useAsset('home/logo.png')"
        width="250"
        height="250"
        class="mx-auto mb-6"
      />
      <v-card-title class="text-h5 mb-2 font-weight-black">
        Fotosíntesis en las plantas
      </v-card-title>

      <v-card-subtitle class="mb-4">
        ¿Como? y ¿Por que? Ocurre
      </v-card-subtitle>

      <v-divider class="mb-4" />

      <p class="text-overline mb-3">En esta OVA aprenderás</p>

      <v-list class="text-left">
        <v-list-item title="Qué es la fotosíntesis y por qué es vital">
          <template #prepend>
            <LeafAlt fill="#06b300" class="mr-4" removePadding />
          </template>
        </v-list-item>
        <v-list-item title="Los ingredientes: luz, agua y CO₂">
          <template #prepend>
            <LeafAlt fill="#06b300" class="mr-4" removePadding />
          </template>
        </v-list-item>
        <v-list-item title="Cómo la planta produce glucosa y oxígeno">
          <template #prepend>
            <LeafAlt fill="#06b300" class="mr-4" removePadding />
          </template>
        </v-list-item>
        <v-list-item title="El papel de la clorofila y los cloroplastos">
          <template #prepend>
            <LeafAlt fill="#06b300" class="mr-4" removePadding />
          </template>
        </v-list-item>
      </v-list>

      <v-divider class="mb-4" />

      <p class="text-overline font-weight-black mb-3">Creado por</p>

      <v-list class="text-left">
        <v-list-item title="Mario Castro" subtitle="Desarrollador/Programador">
          <template #prepend>
            <v-avatar size="60">
              <v-img :src="useAsset('home/personal/mario.png')" />
            </v-avatar>
          </template>
        </v-list-item>
        <v-list-item
          title="Rosendo De Castro"
          subtitle="Desarrollador/Programador"
        >
          <template #prepend>
            <v-avatar size="60">
              <v-img :src="useAsset('home/personal/rosendo.jpeg')" />
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>

      <v-divider class="mb-4" />

      <v-btn color="green" rounded="pill" size="large" to="/mantenimiento">
        Comenzar
      </v-btn>

      <p class="text-caption mt-3">Duración estimada: 20 minutos</p>
    </v-card>
  </v-container>
</template>

<script setup>
import { LeafAlt } from "@boxicons/vue"

definePageMeta({
  layout: "default",
})
</script>
