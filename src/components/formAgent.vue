<template>
  <v-sheet class="ma-2" elevation="4">
    <v-form @submit.prevent="onSubmit" @reset="onReset" id="formAgent">
      <v-container>
        <div class="text-h6">Nouvel agent</div>
        <v-row>
          <v-col lg="2" mb="2" sm="12" cols="12">
            <v-text-field
              v-model="nni"
              label="NNI"
              :rules="txtRules"
              hide-details="auto"
              required
              @change="() => validAgent.nni = nni"
              :error="errNNI"
              :error-messages="errNNIMsg"
            ></v-text-field>
          </v-col>
          <v-col lg="5" mb="5" sm="6" cols="12">
            <v-text-field
              v-model="nom"
              label="Nom"
              :rules="txtRules"
              hide-details="auto"
              required
              @change="() => validAgent.nom = nom"
            ></v-text-field>
          </v-col>
          <v-col lg="5" mb="5" sm="6" cols="12">
            <v-text-field
              v-model="prenom"
              label="Prenom"
              :rules="txtRules"
              hide-details="auto"
              required
              @change="() => validAgent.prenom = prenom"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="4" cols="12">
            <v-text-field
              v-model="commune"
              label="Commune"
              :rules="txtRules"
              hide-details="auto"
              required
              @change="() => validAgent.commune = commune"
            ></v-text-field>
          </v-col>
          <v-col sm="4" cols="12">
            <v-text-field
              v-model="tel1"
              label="Tel 1"
              :rules="txtRules"
              hide-details="auto"
              required
              @change="() => validAgent.tel1 = tel1"
            ></v-text-field>
          </v-col>
          <v-col sm="4" cols="12">
            <v-text-field
              label="Tel 2"
              hide-details="auto"
              v-model="tel2"
              @change="() => validAgent.tel2 = tel2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12">
            <v-btn :disabled="this.$v.$invalid" color="primary" type="submit" form="formAgent">Créer</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script>
// @ is an alias to /src
// import Test from "@/components/test.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  components: {},
  props: {
    agent: Object,
  },
  data() {
    return {
      txtRules: [
        (value) => !!value || "Obligatoire",
        //   value => (value && value.length >= 3) || "Min 3 characters"
      ],
      valid: true,
      nni: "",
      nom: "",
      prenom: "",
      commune: "",
      tel1: "",
      tel2: "",
      errNNI: false,
      errNNIMsg: "",
      validAgent: {
        nni: "",
        nom: "",
        prenom: "",
        commune: "",
        tel1: "",
        tel2: "",
      },
    };
  },
  validations: {
    validAgent: {
      nni: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10)
      },
      nom: { required },
      prenom: { required },
      commune: { required },
      tel1: { required },
      tel2: {}
    }
  },
  watch: {
    agent: function (nv) {
      if (nv) {
        this.nni = nv.nni;
        this.nom = nv.nom;
        this.prenom = nv.prenom;
        this.commune = nv.commune;
        this.tel1 = nv.tel1;
        this.tel2 = nv.tel2;

        this.validAgent.nni = nv.nni;
        this.validAgent.nom = nv.nom;
        this.validAgent.prenom = nv.prenom;
        this.validAgent.commune = nv.commune;
        this.validAgent.tel1 = nv.tel1;
        this.validAgent.tel2 = nv.tel2;
      }
    },
  },
  methods: {
    async onSubmit() {
      // set all fields to touched
      this.$v.$touch();

      // alert(this.$v.$invalid + "\n\n" + JSON.stringify(this.$data, null, 4));
      if (this.$v.$invalid) return;
      console.log(this.$data);
      this.$emit("addAgent", this.$data.validAgent);
      this.$v.$reset();
    },
    onReset() {
      // reset form validation errors
      this.$v.$reset();

      // reset form data
      const initialData = this.$options.data.call(this);
      Object.assign(this.$data, initialData);
    },
  }
};
</script>
