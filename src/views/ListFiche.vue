<template>
  <v-card>
    <v-card-title
      >Fiches d'astreintes<v-spacer /><router-link :to="{ name: 'EditFiche' }"
        ><v-btn class="btnMenu" color="primary" elevation="4" rounded
          >+ Nouvelle fiche</v-btn
        ></router-link
      ></v-card-title
    >
  </v-card>
</template>

<script>
// @ is an alias to /src
// import Test from "@/components/test.vue";

export default {
  components: {},
};
</script>
