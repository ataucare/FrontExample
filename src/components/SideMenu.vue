<template>
  <div>
    <v-list>
      <span v-for="item in menu" :key="item.id">
        <v-list-item v-if="item.url != null" color="dark" link :to="item.url">
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-title v-text="item.nombre" />
        </v-list-item>

        <v-list-group
          v-else
          v-model="item.active"
          :key="item.id"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content v-if="item.url == null">
              <v-list-item-title v-text="item.nombre"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-if="item.menuItem.length == 0" disabled>
            <v-list-item-content>
              <v-list-item-title>N/A</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="child in item.menuItem"
            v-model="child.active"
            :key="child.id"
            :to="child.url"
            link
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.nombre"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </span>
    </v-list>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: 'Sidemenu',
  data: () => ({
    menu: []
  }),

  created() {
    const hasMenu = this.$store.getters.hasMenu;
    if (hasMenu) {
      this.menu = this.$store.getters.getMenu;
    }
  }
}
</script>

<style>
</style>