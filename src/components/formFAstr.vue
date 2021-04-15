<template>
  <v-sheet class="ma-2" elevation="4">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container>
        <div class="text-h6">Création fiche d'atreinte</div>
        <v-row>
          <v-col lg="2" mb="2" sm="12" cols="12">
            <v-text-field
              v-model="nni"
              label="NNI"
              :rules="txtRules"
              hide-details="auto"
              required
            ></v-text-field>
          </v-col>
          <v-col lg="5" mb="5" sm="6" cols="12">
            <v-text-field
              v-model="nom"
              label="Nom"
              :rules="txtRules"
              hide-details="auto"
              required
            ></v-text-field>
          </v-col>
          <v-col lg="5" mb="5" sm="6" cols="12">
            <v-text-field
              v-model="prenom"
              label="Prenom"
              :rules="txtRules"
              hide-details="auto"
              required
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
            ></v-text-field>
          </v-col>
          <v-col sm="4" cols="12">
            <v-text-field
              v-model="tel1"
              label="Tel 1"
              :rules="txtRules"
              hide-details="auto"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="4" cols="12">
            <v-text-field
              label="Tel 2"
              hide-details="auto"
              v-model="tel2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" cols="12">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Ajouter
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<script>
// @ is an alias to /src
// import Test from "@/components/test.vue";

export default {
  components: {},
  props: {
    agent: Object
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
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log(
          this.nni,
          this.nom,
          this.prenom,
          this.commune,
          this.tel1,
          this.tel2,
          this.$refs.form.validate()
        );
        const agent = {
          nom: this.nom,
          prenom: this.prenom,
          nni: this.nni,
          commune: this.commune,
          tel1: this.tel1,
          tel2: this.tel2
        };
        this.insertData(agent);
        this.$refs.form.reset();
        // this.resteForm();
        // console.log(res);
        // this.$emit("addAgent", this.agent._id);
      }
    },
    async insertData(d) {
      console.log(this.text);
      await this.$dbAgentInsert(d, this.createdAgent); 
      this.getAll();
    },
    async getAll() {
      this.items = await this.$getAllAgents();
      console.log(this.items);
    },
    createdAgent(err, agent){
      console.log("err insert agent", err);
      this.$emit("addAgent", agent._id);
    }
  },
  mounted() {
    // if(this.agent){

    // }
  }
};
</script>
