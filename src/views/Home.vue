<template>
  <v-card class="home">
    <v-card-title>
      <h1 class="text-h1">Bienvenue dans F.Ast.</h1>
    </v-card-title>
    <v-card-text>
      <h2 class="text-h2">Le générateur de fiches d'astreintes</h2>
    </v-card-text>
    <v-card-subtitle>
      <p class="text-subtitle-1">
        Pour nous contacter: 
        <a href="mailto:ndie-it@enedis.fr">NDIE-IT@ENEDIS.FR</a>
        {{ this.$test() }}
      </p>
    </v-card-subtitle>
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>
