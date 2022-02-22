<template>
 <form-agent />
</template>

<script>
// @ is an alias to /src
import FormAgent from "@/components/formAgent.vue";

export default {
  components: { FormAgent },
  data() {
    return {
      txtRules: [
        (value) => !!value || "Obligatoire",
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
          tel2: this.tel2,
        };
        this.insertData(agent);
      }
    },
    async insertData(d) {
      console.log(this.text);
      const re = await this.$dbAgentInsert(d);
      console.log(re);
      this.getAll();
    },
    async getAll() {
      this.items = await this.$getAllAgents();
      console.log(this.items);
    },
  },
};
</script>
