<template>
  <form @submit.prevent="onSubmit" id="formZone">
    <v-card>
      <v-card-title>Edition Zone</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="zoneNom"
          clearable
          label="Nom de la zone"
          @input="() => (zoneData.nom = zoneNom)"
        ></v-text-field>
        <v-card>
          <v-card-title
            >Groupes d'astreintes<v-spacer />
            <v-btn small rounded color="primary" @click="addZone()">
              + Groupe
            </v-btn>
          </v-card-title>
          <v-card-text
            v-for="(grp, i) in zoneData.groupes"
            :key="i"
            :set="(v = $v.zoneData.groupes.$each[i])"
          >
            <v-text-field
              v-model="grp.nom"
              clearable
              label="Nom de la zone"
            ></v-text-field>
            <v-text-field
              v-model="grp.nombreAstreintes"
              clearable
              label="Nombre d'astreinte max"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Edition de l'Entête</v-card-title>
          <v-card-text>
            <tiptap-vuetify
              v-model="infoEntete"
              :extensions="extensions"
              @input="() => (zoneData.informations.entete = infoEntete)"
            />
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Edition du Pied de page</v-card-title>
          <v-card-text>
            <tiptap-vuetify
              v-model="infoPied"
              :extensions="extensions"
              @input="() => (zoneData.informations.pied = infoPied)"
            />
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-subtitle>
        <v-btn
          :disabled="this.$v.$invalid"
          color="primary"
          type="submit"
          form="formZone"
          >Créer</v-btn
        >
      </v-card-subtitle>
    </v-card>
  </form>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "tiptap-vuetify";
export default {
  components: { TiptapVuetify },
  data() {
    return {
      zoneNom: "",
      infoEntete: "",
      infoPied: "",
      groupe: {
        nom: "",
        nombreAstreintes: 1,
      },
      zoneData: {
        nom: "",
        groupes: [],
        informations: {
          entete: "",
          pied: "",
        },
      },
      extensions: [
        History,
        Blockquote,
        Link,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  validations: {
    zoneData: {
      nom: { required },
      groupes: {
        $each: {
          nom: { required },
          nombreAstreintes: { required },
        },
      },
      informations: {
        entete: {},
        pied: {},
      },
    },
  },
  methods: {
    async onSubmit() {
      console.log(this.$data);
      // set all fields to touched
      this.$v.$touch();

      // stop here if form is invalid
      alert(this.$v.$invalid + "\n\n" + JSON.stringify(this.$data, null, 4));
      if (this.$v.$invalid) return;

      // display form values on success

      // if (this.$data.ficheData._id) {
      //   await this.updateFiche(this.$data.ficheData);
      // } else {
      //   await this.createFiche(this.$data.ficheData);
      // }
      this.$v.$reset();
      // this.$router.push({ name: 'ListFiche', params: { etat: "Success" }})
    },
    addZone() {
      this.zoneData.groupes.push({
        nom: "",
        nombreAstreintes: 1,
      });
    },
  },
};
</script>