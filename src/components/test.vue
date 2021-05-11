<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <div>
      <v-card>
        <v-card-title>Test BDD</v-card-title>
        <v-card-text>
          <v-autocomplete
            class="pa-0"
            clearable
            v-model="agent"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            item-text="nni"
            label="Technicien"
            placeholder="Commencer à saisir pour rechercher un agent"
            prepend-icon="mdi-database-search"
            return-object
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
          <v-btn @click="test">test</v-btn>
        </v-card-text>
        <button color="primary">Créer</button>
      </v-card>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data: () => ({
    text: "",
    items: [
      // {
      //   nom: "aaaaa",
      //   prenom: "bbbbb",
      //   nni: "ccccc"
      // },
      // {
      //   nom: "ddddd",
      //   prenom: "eeeee",
      //   nni: "fffff"
      // },
      // {
      //   nom: "ggggg",
      //   prenom: "hhhhh",
      //   nni: "iiiii"
      // }
    ],
    agent: {},
    isLoading: false,
    search: null,
  }),
  validations: {
    agent: {
      required
    }
  },
  watch: {
    search: function (v) {
      this.querySelections(v);
    },
  },
  methods: {
    test() {
      console.log(this.agent);
      this.agent = "A00000";
      console.log(this.agent);
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
    onSubmit(e) {
      console.log(e, this.$v);
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
};
</script>
