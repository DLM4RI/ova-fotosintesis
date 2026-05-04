<template>
  <v-list-item :title="nombre" :subtitle="cargo">
    <template #prepend>
      <v-avatar size="60">
        <v-img :src="useAsset(persona)" />
      </v-avatar>
    </template>
    <template #append>
    </template>
  </v-list-item>
</template>

<script setup>




defineProps({
  nombre:    { type: String, required: true },
  cargo: { type: String, default: '' },
  persona:  { type: String, required: true },  // nombre del archivo, ej: 'foto.png'
})
</script>