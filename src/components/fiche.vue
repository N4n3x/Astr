<template>
  <v-card>
    <v-card-title
      >{{ fiche.zone.nom }} - Du {{ this.moment(fiche.debut).locale("fr").format("ddd DD MMM") }} au {{ this.moment(fiche.fin).locale("fr").format("ddd DD MMM YYYY") }}</v-card-title
    >
    <v-card-actions>
      <ul>
        <li class="font-italic text-caption">
          Créé le: {{ fiche.fCreatedAt }}
        </li>
        <li class="font-italic text-caption">
          Modifié le: {{ fiche.fUpdatedAt }}
        </li>
      </ul>
      <v-spacer></v-spacer>
      <fiche-pdf :ficheProp="fiche" />
      <v-btn color="primary" class="mr-2 ml-4" small @click="this.editFiche"
        >Editer</v-btn
      >
      <v-btn color="red lighten-1" small @click="this.suprFiche"
        >Supprimer</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import FichePdf from "@/components/fichePdf.vue";
export default {
  components: {
    FichePdf
  },
  data() {
    return {
      fiche: {},
    };
  },
  props: {
    ficheProps: Object,
  },
  beforeMount() {
    this.fiche = this.ficheProps;
    this.fiche.fCreatedAt = this.moment(this.fiche.createdAt).format(
      "DD/MM/YYYY HH:MM"
    );
    this.fiche.fUpdatedAt = this.moment(this.fiche.updatedAt).format(
      "DD/MM/YYYY HH:MM"
    );
    const t = String(this.fiche.zone.informations.entete);
    this.fiche.zone.informations.entete = t.replace(/<table>/g, '<table style="width:100%; text-align:center">');
    const u = String(this.fiche.zone.informations.pied);
    this.fiche.zone.informations.pied = u.replace(/<table>/g, '<table style="width:100%; text-align:center">');

  },
  methods: {
    editFiche() {
      this.$emit("editFiche", this.fiche._id);
    },
    suprFiche() {
      this.$emit("suprFiche", this.fiche._id);
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
