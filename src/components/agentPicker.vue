<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col lg="8" mb="8" sm="8" cols="12">
          <v-autocomplete
            class="pa-0"
            clearable
            v-model="agent"
            :items="items"
            :loading="isLoading"
            :filter="filter"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            item-text="nni"
            label="Technicien"
            placeholder="Commencer à saisir pour rechercher un agent"
            prepend-icon="mdi-database-search"
            return-object
            @change="setAstreinte()"
          >
            <template v-slot:selection="data">
              <v-chip>{{
                data.item.nom + " " + data.item.prenom + " - " + data.item.nni
              }}</v-chip>
            </template>
            <template v-slot:item="data">
              <v-list-item-content>{{
                data.item.nom + " " + data.item.prenom + " - " + data.item.nni
              }}</v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col lg="3" mb="3" sm="3" cols="12">
          <v-btn small rounded color="primary" @click="addRemplacement"
            ><v-icon dark> mdi-plus </v-icon>Remplacement</v-btn
          >
        </v-col>
        <v-col lg="1" mb="1" sm="1" cols="12">
          <v-btn color="error" small icon @click="supprAgent"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row v-for="(remplacement, index) in remplacements" :key="index">
        <v-col class="pa-1">
          <select-remplacement
            :remplacement="remplacement"
            :index="index"
            @setRemplacement="setRemplacement"
            @deleteRemplacement="deleteRemplacement"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import SelectRemplacement from "@/components/selectRemplacement.vue";

export default {
  components: { SelectRemplacement },
  data() {
    return {
      agent: {
        nom: "",
        prenom: "",
        nni: "",
      },
      model: null,
      search: null,
      items: [],
      entries: [],
      isLoading: false,
      remplacements: []
    };
  },
  props: {
    propsTech: Object,
    propsIndexA: Number,
    propsIndexG: Number,
  },
  watch: {
    search: function (v) {
      this.querySelections(v);
    },
  },
  methods: {
    setAstreinte() {
      this.$emit(
        "setAstreinte",
        this.agent,
        this.propsIndexA,
        this.propsIndexG
      );
    },
    setRemplacement(remplacement, index) {
      console.log(remplacement, index);
    },
    deleteRemplacement(index) {
      console.log(index);
      this.remplacements.splice(index, 1);
    },
    querySelections(v) {
      if (v && v.length > 2) {
        this.loading = true;
        // Simulated ajax query
        setTimeout(async () => {
          this.items = await this.$findAgents(v);
          // console.log(this.items);
          this.loading = false;
        }, 500);
      }
    },
    filter(a) {
      return a;
    },
    supprAgent() {
      this.$emit("supprAgent", this.propsIndexA, this.propsIndexG);
    },
    addRemplacement() {
      this.$emit("addRemplacement", this.propsIndexA, this.propsIndexG);
    },
  },
  beforeMount() {
    this.agent = this.propsTech.agent;
    this.remplacements = this.propsTech.remplacements;
    if (this.propsTech.agent && this.propsTech.agent.nni) {
      this.items.push(this.propsTech.agent);
    }
  },
};
</script>
