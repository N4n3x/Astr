<template>
  <v-card>
    <v-card-title>Edition Fiche d'astreinte</v-card-title>
    <v-card-text>
      <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="computedDateFormattedMomentjs"
            clearable
            label="Début et fin de l'astreinte"
            readonly
            v-bind="attrs"
            v-on="on"
            @click:clear="date = null"
          ></v-text-field>
        </template>
        <v-date-picker
          range
          locale="fr-fr"
          :first-day-of-week="1"
          v-model="date"
          @change="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-select
        :items="items"
        label="Choisir la zone"
        v-model="zone"
      ></v-select>
      <v-row v-for="grp in fiche.groupes" :key="grp.nom">
        <v-col>
          <tech-picker :propsGroupe="grp" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-subtitle v-if="zone">
      <v-btn color="primary">Créer</v-btn>
    </v-card-subtitle>
  </v-card>
</template>

<script>
// @ is an alias to /src
// import Test from "@/components/test.vue";
// import SelectAgent from "@/components/selectAgent.vue";
import TechPicker from "../components/techPicker.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: { TechPicker },
  computed: {
    ...mapState("astreinte", ["fiche"]),
    computedDateFormattedMomentjs() {
      return this.date ? this.range(this.date) : "";
    },
  },
  data() {
    return {
      items: [],
      zone: "",
      start: "",
      end: "",
      date: [],
      menu: false,
      modal: false,
    };
  },
  methods: {
    ...mapMutations("astreinte", ["setZone", "setPlage", "initGroupes"]),
    range(r) {
      // console.log(r);
      return (
        "Du " +
        this.moment(r[0]).locale("fr").format("ddd DD MMM YYYY") +
        " au " +
        this.moment(r[1]).locale("fr").format("ddd DD MMM YYYY")
      );
    },
  },
  watch: {
    zone: function(v) {
      this.$store.commit("astreinte/setZone", v);
      this.$store.commit("astreinte/initGroupes", this.$modelFicheAstreinte(v));
      // console.log(this.fiche);
    },
  },
  mounted() {
    this.items = this.$getZones;
    this.$store.commit("astreinte/initGroupes", []);
  },
};
</script>
