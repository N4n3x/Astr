<template>
  <div>
    <v-btn small @click="generateReport()">PDF</v-btn>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      :filename="ficheProp.zone.nom"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <!-- PDF Content Here -->
        <!--                   _______________________________                 -->

        <html>
          <head>
            <meta charset="UTF-8" />
            <title>
              Fiche d'astreinte {{ ficheProp.debut }} du {{ ficheProp.fin }}
            </title>
          </head>

          <body>
            <div class="">
              <table width="100%">
                <tr>
                  <td align="left" style="width: 20%" class="textCenter">
                    Dépannage électricité<br />
                    09 72 67 50 50
                  </td>
                  <td align="center">
                    Créée le {{ ficheProp.fCreatedAt }}<br />
                    <h1>ASTREINTE {{ ficheProp.zone.nom }}</h1>
                  </td>
                  <td align="right" style="width: 20%" class="textCenter">
                    CAD<br />
                    CEX: 09 70 82 12 23<br />
                    Radio: 50224
                  </td>
                </tr>
                <tr class="green">
                  <td class="textCenter">
                    Dépannage gaz<br />
                    0 800 473 333
                  </td>
                  <td class="textCenter">
                    <h2>
                      {{
                        this.moment(ficheProp.debut)
                          .locale("fr")
                          .format("ddd DD MMMM")
                      }}
                      AU
                      {{
                        this.moment(ficheProp.fin)
                          .locale("fr")
                          .format("ddd DD MMMM YYYY")
                      }}
                    </h2>
                  </td>
                  <td class="textCenter"></td>
                </tr>
                <tr>
                  <td colspan="3"><br /></td>
                </tr>
                <tr>
                  <td colspan="3" class="entete" v-html="ficheProp.zone.informations.entete"></td>
                  <!-- <td class="textCenter">CHARGE DE CONDUITE</td>
                  <td class="textCenter">
                    ACR CAEN Salle de conduite tel: 02 31 70 31 48 fax: 02 31 34
                    25 78
                  </td>
                  <td>RADIO: 50300</td>
                </tr>
                <tr>
                  <td colspan="3"><br /></td>
                </tr>
                <tr class="bcGrey">
                  <td class="textCenter">
                    <h3>CHARGE D'EXPLOITATION ÉLECTRIQUE</h3>
                  </td>
                  <td>
                    <table>
                      <tr>
                        <td><h4>Salle d'exploitation heures ouvrables</h4></td>
                        <td align="right">Equeurdreville:</td>
                        <td><h2>02 31 28 25 05</h2></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td align="right">Valognes:</td>
                        <td><h2>02 31 28 25 17</h2></td>
                      </tr>
                      <tr>
                        <td><h4>Téléphone portable d'exploitation</h4></td>
                        <td></td>
                        <td><h2>06 07 28 11 08</h2></td>
                      </tr>
                    </table>
                  </td>
                  <td>RADIO: 14-3250</td> -->
                </tr>
              </table>
            </div>

            <div class="content">
              <table width="100%">
                <thead>
                  <tr>
                    <th align="left" style="width: 30%"></th>
                    <th align="center">Commune</th>
                    <th align="center" style="width: 15%">Tel pro</th>
                    <th align="center" style="width: 15%">Tel perso</th>
                  </tr>
                </thead>
              </table>
              <div v-for="(grp, i) in ficheProp.groupes" :key="i">
                <h3 v-if="i != 0">{{ grp.nom }}</h3>
                <table width="100%">
                  <tbody v-for="(ast, index) in grp.astreintes" :key="index">
                    <tr v-if="ast.agent.nom != ''">
                      <td style="width: 30%">{{ ast.agent.nom }} {{ ast.agent.prenom }}</td>
                      <td>{{ ast.agent.commune }}</td>
                      <td style="width: 15%">{{ ast.agent.tel1 }}</td>
                      <td style="width: 15%">{{ ast.agent.tel1 }}</td>
                    </tr>
                    <template v-if="ast.remplacements && ast.remplacements.length > 0">
                      <tr>
                        <td colspan="4">
                          <table width="100%" class="remplacement">
                            <thead>
                              <tr>
                                <th style="width: 10%">Du</th>
                                <th style="width: 10%">Au</th>
                                <th>Remplacé par:</th>
                                <th></th>
                                <th style="width: 12%"></th>
                                <th style="width: 12%"></th>
                              </tr>
                            </thead>
                            <tbody
                              v-for="(remp, id) in ast.remplacements"
                              :key="id"
                            >
                              <tr>
                                <td>{{ moment(remp.debut).locale("fr").format("DD/MM HH:MM") }}</td>
                                <td>{{ moment(remp.fin).locale("fr").format("DD/MM HH:MM") }}</td>
                                <td>
                                  {{ remp.agent.nom }} {{ remp.agent.prenom }}
                                </td>
                                <td>{{ remp.agent.commune }}</td>
                                <td>{{ remp.agent.tel1 }}</td>
                                <td>{{ remp.agent.tel2 }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="foot" v-html="ficheProp.zone.informations.pied">
              <!-- <table width="100%">
                <tbody>
                  <tr>
                    <td>Permanence territoire</td>
                    <td>Voir tableau d'astreinte mensuel direction</td>
                    <td>02 31 50 15 85</td>
                  </tr>
                  <tr>
                    <td>Permanence territoire</td>
                    <td>Voir tableau d'astreinte mensuel direction</td>
                    <td>02 31 46 40 52</td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      CEX Poste Source (dont recherche de défauts de câbles): 02
                      32 78 83 00
                    </td>
                  </tr>
                </tbody>
              </table> -->
            </div>
          </body>
        </html>

        <!--                ________________________________________              -->
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  components: {
    VueHtml2pdf,
  },
  props: {
    ficheProp: Object,
  },
  data() {
    return {
      contentRendered: false,
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
    };
  },
  methods: {
    /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    onProgress(progress) {
      this.progress = progress;
      console.log(`PDF generation progress: ${progress}%`);
    },
    startPagination() {
      console.log(`PDF has started pagination`);
    },
    hasPaginated() {
      console.log(`PDF has been paginated`);
    },
  },
};
</script>

<style type="text/css">
@page {
  margin: 0px;
}

body {
  margin: 0px;
  min-height: 1100px;
}

* {
  font-family: Verdana, Arial, sans-serif;
}

a {
  color: #fff;
  text-decoration: none;
}

table {
  font-size: 80%;
  border-collapse: collapse;
}

.entete {
  text-align: center;
}

.content td {
  border: 1px solid grey;
  padding: 3px;
}

.remplacement td {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 2px;
}

tfoot tr td {
  font-weight: bold;
  font-size: 80%;
}

h1,
h2,
h3,
h4,
h5 {
  display: inline;
}

.head {
  padding: 5px;
}

.content {
  padding: 5px;
}

.foot {
  position: absolute;
  bottom: 0;
  padding: 5px;
  min-width: 98%;
}

.textCenter {
  text-align: center;
}

.remplacement {
  padding-left: 5px;
}
</style>