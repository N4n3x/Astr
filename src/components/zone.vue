<template>
  <v-card>
    <v-card-title
      >{{ zone.nom }}</v-card-title
    >
    <v-card-actions>
      <ul>
        <li class="font-italic text-caption">
          Créé le: {{ zone.fCreatedAt }}
        </li>
        <li class="font-italic text-caption">
          Modifié le: {{ zone.fUpdatedAt }}
        </li>
      </ul>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mr-2 ml-4" small @click="this.editZone"
        >Editer</v-btn
      >
      <v-btn color="red lighten-1" small @click="this.deleteZone"
        >Supprimer</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      zone: {},
    };
  },
  props: {
    zoneProps: Object,
  },
  mounted() {
    this.zone = this.zoneProps;
    this.zone.fCreatedAt = this.moment(this.zone.createdAt).format(
      "DD/MM/YYYY HH:MM"
    );
    this.zone.fUpdatedAt = this.moment(this.zone.updatedAt).format(
      "DD/MM/YYYY HH:MM"
    );
  },
  methods: {
    editZone() {
      this.$emit("editZone", this.zone._id);
    },
    deleteZone() {
      this.$emit("deleteZone", this.zone._id);
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
