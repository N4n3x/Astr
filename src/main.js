import Vue from "vue";
import Layout from "./Layout.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ipcRenderer } from "electron";
import moment from "moment";
let appPath = ipcRenderer.sendSync("synchronous-message", "ping");
console.log(appPath);
const Datastore = require("nedb");
const dbAgent = new Datastore({
  filename: appPath + "./agent",
  timestampData: true,
});
const dbFicheAstreinte = new Datastore({
  filename: appPath + "./ficheAstreinte",
  timestampData: true,
});
dbAgent.loadDatabase((err) => {
  console.log(err);
});
dbFicheAstreinte.loadDatabase((err) => {
  console.log(err);
});

Vue.prototype.moment = moment;

Vue.use({
  install(v) {
    v.prototype.$dbAgentInsert = async function(d, f) {
      await dbAgent.insert(d, f);
    };
    v.prototype.$getAllAgents = async function() {
      return new Promise((resolve) => {
        dbAgent.find({}, (err, res) => resolve(res));
      });
    };
    v.prototype.$findAgents = async function(v) {
      return new Promise((resolve) => {
        dbAgent.find(
          {
            $or: [
              {
                nom: new RegExp(v)
              },
              {
                prenom: new RegExp(v)
              },
              {
                nni: new RegExp(v)
              }
            ]
          },
          (err, res) => resolve(res)
        );
      });
    };
    v.prototype.$getZones = ["Manche Nord", "Manche Centre et Sud"];
    v.prototype.$modelFicheAstreinte = nom => {
      let model = [];
      // model.push({
      //   nom: "Chargé d'exploitation",
      //   maxAstreintes: 1,
      //   astreintes: []
      // });
      switch (nom) {
        case "Manche Nord":
          model.push(
            {
              nom: "Chargé d'exploitation ",
              maxAstreintes: 1,
              astreintes: []
            },
            {
              nom: "Maitrise de soutien",
              maxAstreintes: 1,
              astreintes: []
            },
            {
              nom: "Techniciens Saint Lô",
              maxAstreintes: 5,
              astreintes: []
            },
            {
              nom: "Techniciens Coutance",
              maxAstreintes: 5,
              astreintes: []
            },
            {
              nom: "Techniciens Avranches",
              maxAstreintes: 5,
              astreintes: []
            }
          );
          break;
        case "Manche Centre et Sud":
          model.push(
            {
              nom: "Chargé d'exploitation",
              maxAstreintes: 1,
              astreintes: []
            },
            {
              nom: "Maitrise de soutien Equeurdreville",
              maxAstreintes: 1,
              astreintes: []
            },
            {
              nom: "Techniciens Equeurdreville",
              maxAstreintes: 5,
              astreintes: []
            },
            {
              nom: "Maitrise de soutien Valognes",
              maxAstreintes: 1,
              astreintes: []
            },
            {
              nom: "Techniciens Valognes",
              maxAstreintes: 5,
              astreintes: []
            },
          );
          break;
        default:
          model = [];
          break;
      }
      return model;
    };
    v.prototype.$test = () => {
      return "truc";
    };
  },
});

Vue.config.productionTip = false;

Vue.use(vuetify, {
  theme: {
    dark: true,
  },
});
// Vue.use(DatetimePicker)
new Vue({
  dbAgent,
  router,
  store,
  vuetify,
  moment,
  render: (h) => h(Layout),
}).$mount("#app");
