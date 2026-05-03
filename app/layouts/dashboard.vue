<template>
  <v-app>
    <v-app-bar title="Not Found" elevation="1" />

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Home" to="/" prepend-icon="mdi-home" link />
        <v-list-item title="Mantenimiento" to="/mantenimiento" prepend-icon="mdi-tools" link />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-6">
        <v-sheet
          border="dashed md"
          color="surface-light"
          rounded="lg"
          width="100%"
          min-height="500"
          class="d-flex align-center justify-center"
        >
          <slot />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="js" setup>

</script>

<style>



</style>