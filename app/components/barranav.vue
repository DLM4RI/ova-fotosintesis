<template>
  <v-navigation-drawer v-model="drawerOpen" temporary>
    <!-- Logo -->
    <div class="pa-5 pb-3">
      <p
        class="text-subtitle2 font-weight-bold"
        style="color: #1a1a1a; letter-spacing: -0.3px"
      >
        FOTOSÍNTESIS
      </p>
      <p class="text-caption" style="color: #9ca3af">Version 0.0.9 PreAlpha</p>
    </div>

    <v-divider class="mb-2" />

    <v-list nav class="px-3">
      <v-list-item
        to="/dashboard"
        rounded="lg"
        class="nav-item mb-1"
        @click="drawerOpen = false"
      >
        <template #prepend>
          <i class="bx bxs-home-alt-2 nav-icon mr-3" />
        </template>
        <v-list-item-title class="nav-text">Inicio</v-list-item-title>
      </v-list-item>

      <v-list-item
        to="/contenidos"
        rounded="lg"
        class="nav-item mb-1"
        @click="drawerOpen = false"
      >
        <template #prepend>
          <i class="bx bx-search-alt-2 nav-icon mr-3" />
        </template>
        <v-list-item-title class="nav-text">Contenidos</v-list-item-title>
      </v-list-item>

      <v-list-item
        to="/404"
        rounded="lg"
        class="nav-item mb-1"
        @click="drawerOpen = false"
      >
        <template #prepend>
          <i class="bx bxs-book-open nav-icon mr-3" />
        </template>
        <v-list-item-title class="nav-text">Actividades</v-list-item-title>
      </v-list-item>

      <v-list-item
        to="/404"
        rounded="lg"
        class="nav-item mb-1"
        @click="drawerOpen = false"
      >
        <template #prepend>
          <i class="bx bxs-bar-chart-alt-2 nav-icon mr-3" />
        </template>
        <v-list-item-title class="nav-text">Mi progreso</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const drawerOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});
</script>

<style scoped>
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");

.nav-icon {
  font-size: 20px;
  color: #9ca3af;
  transition: color 0.2s;
}

.nav-text {
  font-size: 14px !important;
  font-weight: 500;
  color: #374151;
}

.nav-item {
  min-height: 46px !important;
}

.nav-item:hover .nav-icon {
  color: #3b82f6;
}

:deep(.v-list-item--active) .nav-icon {
  color: #3b82f6;
}

:deep(.v-list-item--active) .nav-text {
  color: #3b82f6;
  font-weight: 600;
}

:deep(.v-list-item--active) {
  background: #eff6ff !important;
}
</style>
