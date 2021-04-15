<template>
  <v-card>
    <v-card-title
      >{{ agent.nom }} {{ agent.prenom }} - {{ agent.nni }}</v-card-title
    >
    <v-card-text>
      <ul>
        <li>Commune: {{ agent.commune }}</li>
        <li>Tel 1: {{ agent.tel1 }}</li>
        <li>Tel 2: {{ agent.tel2 }}</li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <ul>
        <li class="font-italic text-caption">Créé le: {{ this.agent.fCreatedAt }}</li>
        <li class="font-italic text-caption">Modifié le: {{ this.agent.fUpdatedAt }}</li>
      </ul>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mr-2" small @click="this.editAgent">Editer</v-btn>
      <v-btn color="red lighten-1" small @click="this.suprAgent">Supprimer</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      agent: Object,
    };
  },
  props: {
    agentProps: Object,
  },
  mounted() {
    this.agent = this.agentProps;
    this.agent.fCreatedAt = this.moment(this.agent.createdAt).format(
      "DD/MM/YYYY"
    );
    this.agent.fUpdatedAt = this.moment(this.agent.updatedAt).format(
      "DD/MM/YYYY"
    );
  },
  methods: {
    editAgent() {
      this.$emit("editAgent", this.agent._id);
    },
    suprAgent() {
      this.$emit("suprAgent", this.agent._id);
    }
  }
};
</script>

<style>
ul {
  list-style: none;
}
</style>
