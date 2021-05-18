<template>
  <v-container fluid>
    <FormAgent @addAgent="addAgent" :agent="agentPush" />
    <v-data-iterator
      v-if="isLoaded"
      :items.sync="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      class="mt-4 mx-2"
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="(item, i) in props.items"
            :key="i"
            cols="12"
            sm="12"
            md="12"
            lg="6"
          >
            <Agent
              :agentProps="item"
              @editAgent="editAgent"
              @suprAgent="suprAgent"
            />
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Agent from "@/components/agent.vue";
import FormAgent from "@/components/formAgent.vue";

export default {
  components: { Agent, FormAgent },
  props: {
    agentProps: Array,
  },
  data() {
    return {
      itemsPerPageArray: [8, 12, 16],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "updateAt",
      isLoaded: true,
      keys: [
        "Nom",
        "Prenom",
        "NNI",
        "Commune",
        "Tel1",
        "Tel2",
        "CreateAt",
        "UpdateAt"
      ],
      items: [],
      agentPush: null
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Nom");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    async getAgents() {
      return await this.$getAllAgents();
    },
    async editAgent(id) {
      console.log("edit", id);
      this.agentPush = await this.$agentByID(id);
    },
    async suprAgent(id) {
      console.log("supr", id);
      await this.$deleteAgent(id);
      this.items = await this.getAgents();
    },
    async addAgent(agent) {
      this.isLoaded = false;
      await this.$upsertAgent(agent);
      // const i = this.items.findIndex((e)=> e.nni === agent.nni);
      this.items = await this.getAgents();
      this.isLoaded = true;
    },
  },
  async beforeMount() {
    this.items = await this.getAgents();
  },
};
</script>
