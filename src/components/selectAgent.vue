<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col lg="8" mb="8" sm="8" cols="12">
          <v-autocomplete
            class="pa-0"
            clearable
            v-model="propsTech.agent"
            :items="items"
            :loading="isLoading"
            :filter="filter"
            :search-input.sync="search"
            hide-no-data
            item-text="nom"
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
      <div v-if="this.propsTech.remplacements">
        <v-row v-for="remplacement in this.propsTech.remplacements" :key="remplacement.id">
          <v-col class="pa-1">
            <select-remplacement
              :remplacement="remplacement"
              @deleteRemplacement="deleteRemplacement"
              v-model="remplacements"
            />
          </v-col>
        </v-row>
      </div>
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
      remplacements: [
        // {
        //  id: "",
        // agent: {
        //   nom: "",
        //   prenom: "",
        //   nni: "",
        // },
        // debut: "",
        // fin: ""
        // },
      ],
      model: null,
      search: null,
      items: [],
      entries: [],
      isLoading: false,
    };
  },
  props: {
    propsTech: Object,
    propsNomGroupe: String
  },
  watch: {
    search: function (v) {
      this.querySelections(v);
    },
    remplacements: function (v) {
      console.log("remplacements", v);
    }
  },
  methods: {
    setAstreinte(){
      this.$emit("setAstreinte", {
        agent: this.agent,
        remplacements: this.remplacements
      });
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
      // console.log(a, b, c);
      let indexGr = this.$store.state.astreinte.fiche.groupes.findIndex(e => e.nom == this.propsNomGroupe);
      let indexAg = this.$store.state.astreinte.fiche.groupes[indexGr].astreintes.findIndex(e => e.agent.nni == a.nni);
      if(indexAg < 0) {
        return a;
      }else{
        return false;
      }
    },
    addRemplacement() {
      this.remplacements.push({
        id: this.remplacements.length + 1,
        agent: {
          nom: "",
          prenom: "",
          nni: "",
        },
        debut: "",
        fin: "",
      });
      // console.log(this.remplacements);
    },
    deleteRemplacement(id) {
      // console.log(id);
      this.remplacements.splice(
        this.remplacements.findIndex((e) => {
          e.id == id;
        })
      );
    },
    supprAgent(){
      // console.log(this.propsTech.agent.nni)
      this.$emit("supprAgent", this.propsTech.agent.nni);
    }
  },
  mounted() {
    if (this.propsTech) {
      this.agent = this.propsTech.agent;
      this.remplacements = this.propsTech.remplacements;
    }
  },
};
</script>
