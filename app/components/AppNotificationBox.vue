<template>
  <v-card class="notification-box glass-card" rounded="xl">
    <div class="box-header">
      <div class="d-flex align-center">
        <div class="icon-circle">
          <v-icon icon="mdi-bell-outline" color="primary" size="20" />
        </div>
        <div class="ml-3">
          <h3 class="box-title">Novedades y Versión</h3>
          <span class="box-version">v1.9.2 - Beta</span>
        </div>
      </div>
      <div class="status-badge">Activo</div>
    </div>

    <v-card-text class="pa-5">
      <div class="notes-container">
        <div v-for="(note, i) in notes" :key="i" class="note-item">
          <div class="note-time">{{ note.date }}</div>
          <div class="note-content">
            <h4 class="note-title">{{ note.title }}</h4>
            <ul class="note-list">
              <li v-for="(item, j) in note.items" :key="j">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-4 justify-center">
      <span class="footer-msg">Próxima gran actualización: 8 Mayo</span>
    </v-card-actions>
  </v-card>
</template>

<script setup>
// TEMPLATE PARA PONER NOTAS DE ACTUALIZACIÓN
const notes = [
  {
    date: "08 Mayo, 2026",
    title: "LANZAMIENTO OFICIAL V2",
    status: "Oficial",
    items: [
      "Rediseño total de la OVA: Interfaz más fluida, moderna y minimalista.",
      "Nueva Evaluación Maestra: Se integró un banco renovado de 32 preguntas interactivas.",
      "Optimización de Actividades: Diseño premium con efectos Glassmorphism y fondos dinámicos.",
      "Lanzamiento al Público: La plataforma ya está disponible oficialmente para todos los usuarios.",
    ],
  },
  {
    date: "07 Mayo, 2026",
    title: "Actualización de Actividades",
    items: [
      "Se agregaron 3 nuevas actividades.",
      "Se modificaron y mejoraron las actividades existentes.",
      "Se optimizó el diseño del apartado de actividades.",
      "Se potenció la optimización de la página de contenidos y recursos.",
    ],
  },
  {
    date: "04 Mayo, 2026",
    title: "En Desarrollo",
    items: [
      "Actualmente se trabaja en una mejora visual del módulo de actividades.",
      "Próximamente se añadirá compatibilidad por grados.",
      "El contenido se adaptará automáticamente según el grado del estudiante.",
    ],
  },
];
</script>

<style scoped>
.notification-box {
  border: 1px solid rgba(0, 0, 0, 0.04) !important;
  background: white !important;
  height: 100%;
}

.box-header {
  padding: 20px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.02);
}

.icon-circle {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.box-title {
  font-size: 1rem;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
}

.box-version {
  font-size: 0.7rem;
  color: #80a124;
  font-weight: 800;
  text-transform: uppercase;
}

.status-badge {
  background: #f0fdf4;
  color: #15803d;
  font-size: 0.65rem;
  font-weight: 900;
  padding: 4px 10px;
  border-radius: 99px;
  text-transform: uppercase;
}

.notes-container {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 5px;
}

/* Scrollbar personalizado */
.notes-container::-webkit-scrollbar {
  width: 4px;
}
.notes-container::-webkit-scrollbar-track {
  background: transparent;
}
.notes-container::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.note-item {
  position: relative;
  padding-left: 20px;
  border-left: 2px solid #f1f5f9;
  margin-bottom: 25px;
}

.note-item::before {
  content: "";
  position: absolute;
  left: -5px;
  top: 0;
  width: 8px;
  height: 8px;
  background: #cbd5e1;
  border-radius: 50%;
  border: 2px solid white;
}

.note-item:first-child::before {
  background: #80a124;
}

.note-time {
  font-size: 0.7rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.note-title {
  font-size: 0.95rem;
  font-weight: 850;
  color: #334155;
  margin-bottom: 10px;
}

.note-list {
  padding-left: 15px;
  margin: 0;
}

.note-list li {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 6px;
  line-height: 1.4;
}

.footer-msg {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  font-style: italic;
}
</style>
