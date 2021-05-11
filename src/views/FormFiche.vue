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
            @change="setDate"
          ></v-date-picker>
        </v-menu>
        <v-select
          :items="items"
          label="Choisir la zone"
          v-model="zone"
          @input="setZone"
        ></v-select>
        <v-row
          v-for="(grp, i) in ficheData.groupes"
          :key="i"
          :set="(v = $v.ficheData.groupes.$each[i])"
        >
          <v-col>
            <v-card>
              <v-card-title>
                {{ grp.nom }}<v-spacer />
                <v-btn v-if="grp.astreintes.length < grp.maxAstreintes" small rounded color="primary" @click="addAgent(i)">
                  + Ajouter un agent
                </v-btn>
              </v-card-title>
              <v-card-text
                v-for="(agent, index) in grp.astreintes"
                :key="index"
              >
                <select-agent
                  @supprAgent="supprAgent"
                  @setAstreinte="setAstreinte"
                  @addRemplacement="addRemplacement"
                  :propsTech="agent"
                  :propsIndexA="index"
                  :propsIndexG="i"
                />
              </v-card-text>
            </v-card>
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
import SelectAgent from "../components/agentPicker.vue";
import { required } from "vuelidate/lib/validators";
export default {
  components: { SelectAgent },
  props: {
    ficheId: String,
  },
  computed: {
    comPlage() {
      return this.date ? this.range(this.date) : "";
    },
  },
  data() {
    return {
      items: [],
      zone: "",
      dateRange: "",
      date: [
        this.moment().format("YYYY-MM-DD"),
        this.moment().add(7, "d").format("YYYY-MM-DD"),
      ],
      menu: false,
      modal: false,
      ficheData: {
        debut: "",
        fin: "",
        zone: "",
        groupes: [],
      },
    };
  },
  validations: {
    ficheData: {
      debut: {
        required
      },
      fin: {
        required
      },
      zone: {
        required
      },
      groupes: {
        $each: {
          astreintes: {
            $each: {
              agent: {
                required
              },
              remplacements: {
                
              }
            }
          },
        },
      },
    },
  },
  methods: {
    range(r) {
      // console.log(r);
      return (
        "Du " +
        this.moment(r[0]).locale("fr").format("ddd DD MMM") +
        " au " +
        this.moment(r[1]).locale("fr").format("ddd DD MMM YYYY")
      );
    },
    setZone(v) {
      this.ficheData.groupes = this.$modelFicheAstreinte(v);
      this.ficheData.zone = v;
    },
    async onSubmit() {
      console.log(this.$data);
      // set all fields to touched
      this.$v.$touch();

      // stop here if form is invalid
      alert(this.$v.$invalid + "\n\n" + JSON.stringify(this.$data, null, 4));
      if (this.$v.$invalid) return;

      // display form values on success
      
      if (this.$data.ficheData._id) {
        await this.updateFiche(this.$data.ficheData);
      } else {
        await this.createFiche(this.$data.ficheData);
      }
      this.$v.$reset();
      this.$router.push({ name: 'ListFiche', params: { etat: "Success" }})
    },
    onReset() {
      // reset form validation errors
      this.$v.$reset();

      // reset form data
      const initialData = this.$options.data.call(this);
      Object.assign(this.$data, initialData);
    },
    async createFiche(data) {
      const re = await this.$dbFicheInsert(data);
      console.log(re);
    },
    async updateFiche(data){
      const re = await this.$dbFicheUpdate(data);
      console.log(re);
    },
    async getFicheById() {
      const fiche = await this.$getFicheById(this.ficheId);
      // this.$store.commit("astreinte/setFiche", fiche);
      this.date = [fiche.debut, fiche.fin];
      this.zone = fiche.zone;
      this.ficheData = fiche;
      console.log(fiche);
    },
    supprAgent(indexA, indexG){
      console.log(indexA, indexG);
      this.ficheData.groupes[indexG].astreintes.splice(indexA, 1);
    },
    setAstreinte(agent, indexA, indexG){
      this.ficheData.groupes[indexG].astreintes[indexA].agent = agent;
    },
    addAgent(i){
      this.ficheData.groupes[i].astreintes.push({nni: ""});
    },
    setDate(){
      this.menu = false
      console.log(this.date[0])
      this.ficheData.debut = this.date[0];
      this.ficheData.fin = this.date[1];
    },
    addRemplacement(indexA, indexG){
      if (!this.ficheData.groupes[indexG].astreintes[indexA].remplacements) this.ficheData.groupes[indexG].astreintes[indexA].remplacements = [];
      this.ficheData.groupes[indexG].astreintes[indexA].remplacements.push({});
      console.log(this.ficheData.groupes[indexG].astreintes[indexA]);
    }
  },
  mounted() {
    this.items = this.$getZones;
    this.ficheData.debut = this.date[0];
    this.ficheData.fin = this.date[1];
    if (this.ficheId) {
      this.getFicheById();
    }
  },
};
</script>
