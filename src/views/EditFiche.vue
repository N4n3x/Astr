<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <v-card>
      <v-card-title>Edition Fiche d'astreinte</v-card-title>
      <v-card-text>
        <v-menu v-model="menu" :close-on-content-click="false" max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="comPlage"
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
          @input="setZone"
        ></v-select>
        <v-row v-for="(grp, i) in ficheData.groupes" :key="i" :set="v = $v.ficheData.groupes.$each[i]">
          <v-col>
            <tech-picker :propsGroupe="grp" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-subtitle v-if="zone">
        <button color="primary">Créer</button>
      </v-card-subtitle>
    </v-card>
  </form>
</template>

<script>
// @ is an alias to /src
// import Test from "@/components/test.vue";
// import SelectAgent from "@/components/selectAgent.vue";
import TechPicker from "../components/techPicker.vue";
import { mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  components: { TechPicker },
  props: {
    ficheId: String,
  },
  computed: {
    ...mapState("astreinte", ["fiche"]),
    comPlage() {
      return this.date ? this.range(this.date) : "";
    },
  },
  data() {
    return {
      items: [],
      zone: "",
      dateRange: "",
      start: "",
      end: "",
      date: [
        this.moment().format("YYYY-MM-DD"),
        this.moment().add(7, "d").format("YYYY-MM-DD"),
      ],
      menu: false,
      modal: false,
      ficheData: {
        start: "",
        end: "",
        zone: "",
        groupes: [],
      }
    };
  },
  validations: {
    zone: {
      required
    },
    comPlage: {},
    ficheData: {
      groupes: {
        $each: {
          astreintes: {}
        }
      }
    },
  },
  methods: {
    ...mapMutations("astreinte", ["setZone", "setPlage", "initGroupes"]),
    range(r) {
      // console.log(r);
      return (
        "Du " +
        this.moment(r[0]).locale("fr").format("ddd DD MMM") +
        " au " +
        this.moment(r[1]).locale("fr").format("ddd DD MMM YYYY")
      );
    },
    async createFiche() {
      if (this.ficheId) {
        this.$store.commit("astreinte/setPlage", this.date);
        const re = await this.$dbFicheUpdate(this.$store.state.astreinte.fiche);
        console.log(re);
      } else {
        this.$store.commit("astreinte/setPlage", this.date);
        const re = await this.$dbFicheInsert(this.$store.state.astreinte.fiche);
        console.log(re);
        // const f = await this.$getAllFiches();
        // console.log(f);
      }
    },
    async getFicheById() {
      console.log(this.ficheId);
      const fiche = await this.$getFicheById(this.ficheId);
      this.$store.commit("astreinte/setFiche", fiche);
      this.date = [fiche.debut, fiche.fin];
      this.zone = fiche.zone;
    },
    setZone(v) {
      this.$store.commit("astreinte/setZone", v);
      this.$store.commit("astreinte/initGroupes", this.$modelFicheAstreinte(v));
      this.ficheData.groupes = this.$modelFicheAstreinte(v);
    },
    onSubmit(e) {
      console.log(e);
      // set all fields to touched
      this.$v.$touch();

      // stop here if form is invalid
      if (this.$v.$invalid) return;

      // display form values on success
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.$data, null, 4));
    },
    onReset() {
      // reset form validation errors
      this.$v.$reset();

      // reset form data
      const initialData = this.$options.data.call(this);
      Object.assign(this.$data, initialData);
    },
  },
  // watch: {
  //   zone: function(v) {
  //     this.$store.commit("astreinte/setZone", v);
  //     this.$store.commit("astreinte/initGroupes", this.$modelFicheAstreinte(v));
  //     // console.log(this.fiche);
  //   },
  // },
  mounted() {
    this.items = this.$getZones;
    this.$store.commit("astreinte/resetFiche");
    if (this.ficheId) {
      this.getFicheById();
    } else {
      this.items = this.$getZones;
      this.$store.commit("astreinte/initGroupes", []);
    }
  },
};
</script>
