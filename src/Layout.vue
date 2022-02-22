<template>
  <v-app>
    <v-app-bar app color="indigo darken-4" dense dark>
      <!-- <v-toolbar-title>Fiche d'astreinte générateur</v-toolbar-title> -->
      <router-link :to="{ name: 'Home' }"
        ><v-btn class="btnMenu" color="indigo darken-1" elevation="4" rounded
          >Home</v-btn
        ></router-link
      >
      <router-link :to="{ name: 'ListFiche' }"
        ><v-btn class="btnMenu" color="indigo darken-1" elevation="4" rounded
          >Fiches d'asteintes</v-btn
        ></router-link
      >
      <router-link :to="{ name: 'ListAgents' }"
        ><v-btn class="btnMenu" color="indigo darken-1" elevation="4" rounded
          >Agents</v-btn
        ></router-link
      >
      <router-link :to="{ name: 'ListZones' }"
        ><v-btn class="btnMenu" color="indigo darken-1" elevation="4" rounded
          >Zones</v-btn
        ></router-link
      >
      <router-link :to="{ name: 'ImportAgents' }"
        ><v-btn class="btnMenu" color="indigo darken-1" elevation="4" rounded
          >Import/Export Agents</v-btn
        ></router-link
      >
    </v-app-bar>

    <v-main class="dark">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
* {
  text-decoration: none;
}
.btnMenu {
  margin-left: 0.8rem;
}
</style>
