<template>
  <v-card>
    <v-card-text>
      <v-row justify="center" align="center">
        <v-col lg="5" mb="5" sm="5" cols="12">
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :filter="filter"
            :search-input.sync="search"
            hide-no-data
            clearable
            item-text="nom"
            label="Remplaçant(e)"
            placeholder="Commencer à saisir pour rechercher un agent"
            prepend-icon="mdi-database-search"
            return-object
            class="ma-0"
            @change="setAgent()"
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
          <datetime-picker
            label="Début"
            dateFormat="dd/MM/yyyy"
            timeFormat="HH:mm"
            v-model="start"
            @change="setStart()"
          ></datetime-picker>
        </v-col>
        <v-col lg="3" mb="3" sm="3" cols="12">
          <datetime-picker
            label="Fin"
            dateFormat="dd/MM/yyyy"
            timeFormat="HH:mm"
            v-model="end"
            @change="setEnd()"
          ></datetime-picker>
        </v-col>
        <v-col lg="1" mb="1" sm="1" cols="12">
          <v-btn color="error" small icon @click="deleteRemplacement"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import DatetimePicker from "./DatetimePicker.vue";
export default {
  components: { DatetimePicker },
  props: {
    remplacement: Object,
    index: Number
  },
  data() {
    return {
      start: null,
      end: null,
      model: null,
      items: [],
      isLoading: false,
      search: null,

      agents: [],
      rempl: [],
      temp: {
        agent: {},
        debut: "?",
        fin: ""
      },
      descriptionLimit: 60,
      entries: [],
      id: null,
    };
  },
  watch: {
    end: function (v) {
      let e = this.moment(v);
      let s = this.moment(this.start);
      this.moment.duration(e.diff(s)) < 0 ? (this.end = this.start) : "";
      this.temp.fin = v;
      // console.log(this.moment.duration(e.diff(s)));
    },
    start: function (v) {
      let s = this.moment(v);
      let e = this.moment(this.end);
      this.moment.duration(e.diff(s)) < 0 ? (this.start = this.end) : "";
      this.temp.debut = v;
      // console.log(this.moment.duration(e.diff(s)));
    },
    search: function (v) {
      this.querySelections(v);
    },
  },
  methods: {
    querySelections(v) {
      if (v && v.length > 2) {
        this.loading = true;
        // Simulated ajax query
        setTimeout(async () => {
          this.items = await this.$findAgents(v);
          console.log(this.items);
          this.loading = false;
        }, 500);
      }
    },
    filter(a) {
      return a;
    },
    setAgent() {
      this.rempl.agent = this.model;
      if (this.start && this.end) {
        this.$emit("setRemplacement", this.rempl, this.index);
      }
    },
    setStart() {
      this.rempl.debut = this.start;
      if (this.rempl.agent && this.end) {
        this.$emit("setRemplacement", this.rempl, this.index);
      }
    },
    setEnd() {
      this.rempl.fin = this.end;
      if (this.rempl.agent && this.start) {
        this.$emit("setRemplacement", this.rempl, this.index);
      }
    },
    deleteRemplacement() {
      this.$emit("deleteRemplacement", this.index);
    },
  },
  mounted: function (){
    this.rempl = this.remplacement;
  }
};
</script>
