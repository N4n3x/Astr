<template>
  <v-card>
    <v-card-title>
      {{ propsGroupe.nom }}<v-spacer />
      <v-btn small rounded color="primary" @click="addAgent()">
        + Ajouter un agent
      </v-btn>
    </v-card-title>
    <v-card-text
      v-for="(agent, index) in this.$store.state.astreinte.fiche.groupes[indexG].astreintes"
      :key="index"
    >
      <select-agent
        @supprAgent="supprAgent"
        @setAstreinte="setAstreinte"
        :propsTech="agent"
        :propsNomGroupe="propsGroupe.nom"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import SelectAgent from "@/components/selectAgent.vue";
export default {
  components: { SelectAgent },
  props: {
    propsGroupe: Object,
  },
  data() {
    return {
      indexG: this.$store.state.astreinte.fiche.groupes.findIndex(
        (e) => e.nom == this.propsGroupe.nom
      ),
      astreintes: []
    };
  },
  methods: {
    addAgent() {
      let a = {
        agent: {
          nom: "",
          prenom: "",
          nni: "",
          commune: "",
          tel1: "",
          tel2: "",
        },
        remplacements: [],
      };
      // this.propsGroupe.astreintes.push(agent);
      this.$store.commit("astreinte/addAstreinte", [this.propsGroupe.nom, a]);
    },
    supprAgent(nni) {
      this.$store.commit("astreinte/delAstreinte", [this.propsGroupe.nom, nni]);
      console.log(this.$store.state.astreinte.fiche.groupes[this.indexG].astreintes);
    },
    setAstreinte(a) {
      this.$store.commit("astreinte/setAstreinte", [this.propsGroupe.nom, a]);
    },
  },
  mounted() {
    let a = {
      agent: {
        nom: "",
        prenom: "",
        nni: "",
        commune: "",
        tel1: "",
        tel2: "",
      },
      remplacements: [],
    };
    if (!this.propsGroupe.astreintes.length) {
      this.$store.commit("astreinte/addAstreinte", [this.propsGroupe.nom, a]);
    }
  },
};
</script>
<style>
</style>
