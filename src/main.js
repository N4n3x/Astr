import Vue from "vue";
import Layout from "./Layout.vue";
// import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import el from "electron";
const elApp = el.remote.app;
console.log(elApp.getAppPath());
const Datastore = require("nedb");
const db = new Datastore({ filename: "./data", timestampData: true });

db.loadDatabase(err => {
  console.log(err);
});

// let doc = {
// test: "un test",
// tableau: [1, 2, 3]
// };

// db.insert(doc, function (err, newDoc) {
// console.log(err, newDoc);
// });

db.find({}, (err, docs) => {
  console.log(err, docs);
});

Vue.use({
  install(v) {
    v.prototype.$dbInsert = async function(d) {
      return await db.insert(d, (err, newRec) => {
        // console.log(err, newRec);
        return newRec;
      });
    };
    v.prototype.$getAll = async function() {
      return new Promise(resolve => {
        db.find({}, (err, res) => resolve(res));
      });
    };
    v.prototype.$test = () => {
      return "truc";
    };
  }
});

Vue.config.productionTip = false;

Vue.use(vuetify, {
  theme: { dark: true }
});

new Vue({
  db,
  router,
  store,
  vuetify,
  render: h => h(Layout)
}).$mount("#app");
