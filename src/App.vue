<template>
  <v-app class="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import Topbar from '@/components/Layout/LayoutResolver';

export default {
  name: 'App',
  components: {
      Topbar
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.app {
  --background-color: #fafafa !important;
}

.v-application {
  background-color: var(--v-background-base) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>