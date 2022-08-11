<template>
  <div>
    <v-navigation-drawer app v-model="drawer" clipped>
      <side-menu />

      <template v-if="usuario" v-slot:append>
        <!--<v-list-item two-line link dense @click="toggleTheme">
          <v-list-item-avatar>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              dark ? "Oscuro" : "Claro"
            }}</v-list-item-title>
            <v-list-item-subtitle>Tema</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>-->

        <v-list-item two-line>
          <v-list-item-avatar>
            <v-avatar color="blue darken-1">
              <span class="white--text">{{ usuario.avatar }}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ usuario.nombreCompleto }}</v-list-item-title>
            <v-list-item-subtitle>{{ usuario.locacion }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="blue" clipped-left dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          alt="Logo"
          class="shrink mx-3"
          contain
          :src="require('../assets/logo.png')"
          transition="scale-transition"
          width="36"
        />

        <v-toolbar-title class="font-weight-medium">
          Nombre del Sistema
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="onSalir" text>
        <span class="mr-2">Salir <i class="fas fa-home"></i></span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid >
        <div class="mx-2">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
      </v-container>
    </v-main>

    <v-footer app>
      <div class="caption text--secondary">v{{ $store.getters.appVersion }}</div>
      <v-spacer></v-spacer>
      <div class="caption" v-show="footer">
        <span class="font-weight-regular">Newtenberg</span> - Publicaciones Digitales Ltda. &copy; {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </div>
</template>

<script>
import Vue from "vue";
import SideMenu from "./SideMenu.vue";
import { envDisplayFooter } from "@/core/utilities";

export default {
  name: "AppLayout",
  components: {
    SideMenu,
  },
  data: () => ({
    drawer: null,
    usuario: null,
    version: process.env.VUE_APP_VERSION,
    footer: envDisplayFooter(),
    dark: false,
  }),
  created() {
    const hasUser = this.$store.getters.hasUser;
    const isDark = this.$store.getters.isDark;
    console.log(process.env.VUE_APP_VERSION);
    if (hasUser) {
      this.usuario = this.$store.state.usuario;
    }

    if(isDark) {
      console.log("isDark", isDark);
      
      this.dark = isDark;
      this.$vuetify.theme.dark = isDark;
      //this.$store.dispatch("toggleTheme", isDark);
    }
  },
  methods: {
    onSalir() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
    toggleTheme() {
      this.dark = !this.dark;
      this.$vuetify.theme.dark = this.dark;
      this.$store.dispatch("toggleTheme", this.dark);

    }
  },
};
</script>

<style>
.fondo {
  background-color: #f3f3f3;
}
</style>