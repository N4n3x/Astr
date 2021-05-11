import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    astreinte: {
      namespaced: true,
      state: {
        fiche: {
          zone: "",
          debut: "",
          fin: "",
          groupes: [],
        },
      },
      mutations: {
        setFiche(state, value){
          state.fiche = value;
        },
        resetFiche(state){
          state.fiche = {
            zone: "",
            debut: "",
            fin: "",
            groupes: [],
          }
        },
        setZone(state, value) {
          state.fiche.zone = value;
        },
        setPlage(state, plage) {
          state.fiche.debut = plage[0];
          state.fiche.fin = plage[1];
        },
        initGroupes(state, value) {
          state.fiche.groupes = value;
        },
        setGroupe(state, i, value) {
          state.fiche.groupes[i] = value;
        },
        addAstreinte(state, p) {
          console.log(p)
          let indexGr = state.fiche.groupes.findIndex(e => {
            return e.nom === p[0];
          });
          if (indexGr >= 0) {
            let indexAg = state.fiche.groupes[indexGr].astreintes.findIndex(
              e => {
                console.log(e)
                return e.agent.nni == p[1].agent.nni;
              }
            );
            console.log(indexAg)
            if(indexAg < 0){
              state.fiche.groupes[indexGr].astreintes.push(p[1]);
            }
          }
        },
        delAstreinte(state, p) {
          console.log(p)
          let indexGr = state.fiche.groupes.findIndex(e => {
            return e.nom === p[0];
          });
          if (indexGr >= 0) {
            let indexAg = state.fiche.groupes[indexGr].astreintes.findIndex(e => {
              console.log(e.agent.nni, p[1]);
              return e.agent.nni === p[1];
            });
            state.fiche.groupes[indexGr].astreintes.splice(indexAg,1);
            console.log(state.fiche.groupes[indexGr].astreintes,indexAg)
          }
        },
        setAstreinte(state, p) {
          let indexGr = state.fiche.groupes.findIndex(e => {
            return e.nom === p[0];
          });
          if (indexGr >= 0) {
            let indexAg = state.fiche.groupes[indexGr].astreintes.findIndex(
              e => {
                return e.agent.nni == "";
              }
            );
            if (indexAg >= 0) {
              console.log(indexAg, p[1])
              state.fiche.groupes[indexGr].astreintes.splice(indexAg, 1);
              state.fiche.groupes[indexGr].astreintes.push(p[1]);
            }else{
              state.fiche.groupes[indexGr].astreintes.push(p[1]);
            }
          }
        },
      },
    },
  },
  actions: {},
});
