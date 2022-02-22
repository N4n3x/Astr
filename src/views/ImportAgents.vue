<template>
  <div>
    <v-card class="ma-2" style="height: 800px">
      <v-card-title>Import Agents</v-card-title>
      <v-card-text no-gutters justify="center" align="center">
        <v-col cols="8">
          <v-file-input
            show-size
            label="Import Excel"
            @change="upload"
          ></v-file-input>
        </v-col>
      </v-card-text>
      <v-card-subtitle v-if="agents.length != 0">
        Lignes importés: {{ agents.length }}
        <v-data-table
          :headers="headers"
          :items="agents"
          :items-per-page="10"
          class="elevation-1"
        ></v-data-table>
      </v-card-subtitle>
    </v-card>
    <v-card class="ma-2">
      <v-card-title
        >Export Agents <v-spacer /><v-btn
          color="primary"
          @click="exportAgents()"
          >Télécharger</v-btn
        ></v-card-title
      >
    </v-card>
  </div>
</template>
<script>
import { saveAs } from 'file-saver';
import XLSX from "xlsx";
export default {
  name: "upload-files",
  data() {
    return {
      currentFile: undefined,
      agents: [],
      headers: [
        { text: "NNI", value: "nni" },
        { text: "Nom", value: "nom" },
        { text: "Prénom", value: "prenom" },
        { text: "Commune", value: "commune" },
        { text: "Tel1", value: "tel1" },
        { text: "Tel2", value: "tel2" },
      ],
    };
  },
  methods: {
    selectFile(file) {
      this.currentFile = file;
    },
    upload(file) {
      if (!file) {
        return;
      }
      let res = 0;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach(async (sheetName) => {
          this.agents = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          this.agents.forEach(async (e) => {
            res += await this.$upsertAgent(e);
          });
          console.log(this.agents, res);
        });
      };
      reader.readAsBinaryString(file);
    },
    async exportAgents() {
      let data = await this.$getAllAgents();
      let wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "Agents",
        Subject: "Export agents",
        Author: "F.Ast",
        CreatedDate: new Date(),
      };
      wb.SheetNames.push("agents");
      let wsData = [];
      data.forEach((e) => {
        let temp = [e.nni, e.nom, e.prenom, e.commune, e.tel1, e.tel2];
        wsData.push(temp);
      });
      let ws = XLSX.utils.aoa_to_sheet(wsData);
      wb.Sheets["agents"] = ws;
      let wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), 'agents.xlsx');
      console.log(data);
    },
    s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    },
  },
};
</script>