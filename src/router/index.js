import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ListFiche from "../views/ListFiche.vue";
import EditFiche from "../views/FormFiche.vue";
import EditAgent from "../views/EditAgent.vue";
import ListAgents from "../views/ListAgents.vue";
import ListZones from "../views/ListZones.vue";
import EditZone from "../views/EditZone.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/listFiche",
    name: "ListFiche",
    component: ListFiche
  },
  {
    path: "/listAgents",
    name: "ListAgents",
    component: ListAgents
  },
  {
    path: "/editFiche/:ficheId",
    name: "EditFiche",
    component: EditFiche,
    props: true
  },
  {
    path: "/editAgent",
    name: "EditAgent",
    component: EditAgent
  },
  {
    path: "/listZones",
    name: "ListZones",
    component: ListZones
  },
  {
    path: "/editZone",
    name: "EditZone",
    component: EditZone,
    props: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
