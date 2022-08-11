<template>
  <v-main>
    <v-container fluid fill-height align-center justify-center>
        <transition name="fade">
          <router-view></router-view>
        </transition>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PublicLayout"
});
</script>
