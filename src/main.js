import Vue from "vue";
import Vuelidate from 'vuelidate'
import Layout from "./Layout.vue";
import path from "path";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ipcRenderer } from "electron";
import moment from "moment";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import 'vuetify/dist/vuetify.min.css';
let appPath = ipcRenderer.sendSync("synchronous-message", "ping");
appPath = appPath.replace("\\app.asar", "");
console.log(path.join(appPath, "/../db/agent.db"));
const Datastore = require("nedb");
const dbAgent = new Datastore({
  filename: path.join(appPath, "/../db/agent.db"),
  autoload: true,
  timestampData: true,
});
const dbFicheAstreinte = new Datastore({
  filename: path.join(appPath, "/../db/ficheAstreinte.db"),
  autoload: true,
  timestampData: true,
});
const dbZones = new Datastore({
  filename: path.join(appPath, "/../db/zones.db"),
  autoload: true,
  timestampData: true,
});
dbAgent.loadDatabase((err) => {
  console.log(err);
});
dbFicheAstreinte.loadDatabase((err) => {
  console.log(err);
});
dbZones.loadDatabase((err) => {
  console.log(err);
});

Vue.prototype.moment = moment;

Vue.use({
  install(v) {
    v.prototype.$dbAgentInsert = async function(d, f) {
      await dbAgent.insert(d, f);
    };
    v.prototype.$upsertAgent = async function(d) {
      return await dbAgent.update({nni: d.nni}, d, {upsert: true}, (err, a) => {
        return a;
      });
    };
    v.prototype.$deleteAgent = async function(d) {
      await dbAgent.remove({ _id: d }, {});
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
    v.prototype.$agentByID = async function(id) {
      return new Promise((resolve) => {
        dbAgent.findOne({ _id: id }, (err, res) => resolve(res));
      });
    };
    v.prototype.$nniExist = async function(nni) {
      return new Promise((resolve) => {
        dbAgent.count({ nni: nni }, (err, res) => resolve(res));
      });
    };
    v.prototype.$upsertZone = async function(d) {
      await dbZones.update({nom: d.nom}, d, {upsert: true});
    };
    v.prototype.$deleteZone = async function(d) {
      await dbZones.remove({ _id: d }, {});
    };
    v.prototype.$getAllZones = async function() {
      return new Promise((resolve) => {
        dbZones.find({}, (err, res) => resolve(res));
      });
    };
    v.prototype.$getZoneByID = async function(id) {
      return new Promise((resolve) => {
        dbZones.findOne({ _id: id }, (err, res) => resolve(res));
      });
    };
    v.prototype.$dbFicheInsert = async function(d) {
      await dbFicheAstreinte.insert(d);
    };
    v.prototype.$dbFicheUpdate = async function(d) {
      await dbFicheAstreinte.update({_id: d._id}, d);
    };
    v.prototype.$dbFicheDelete = async function(d) {
      await dbFicheAstreinte.remove({_id: d}, {});
    };
    v.prototype.$getAllFiches = async function() {
      return new Promise((resolve) => {
        dbFicheAstreinte.find({}, (err, res) => resolve(res));
      });
    };
    v.prototype.$getFicheById = async function(id) {
      return new Promise((resolve) => {
        dbFicheAstreinte.findOne({_id: id}, (err, res) => resolve(res));
      });
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

Vue.use(Vuelidate);

Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
});

// Vue.use(VueCsvImportPlugin);

new Vue({
  dbAgent,
  router,
  store,
  vuetify,
  moment,
  render: (h) => h(Layout),
}).$mount("#app");
