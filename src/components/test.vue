<template>
  <div>
    <v-card>
      <v-card-title>Test BDD</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field v-model="text" label="text" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="insertData">OK</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="getAll">load</v-btn>
              <p v-for="item in items" :key="item._id">{{ item.test }}</p>
            </v-col>
          </v-row>
					<v-row>
						<v-btn @click="testTruc">test</v-btn>
					</v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
		text: "",
		items: []
  }),
  methods: {
    async insertData() {
      console.log(this.text);
      const d = { test: this.text };
      const re = await this.$dbInsert(d);
			console.log(re);
			this.getAll();
    },
    async getAll() {
      this.items = await this.$getAll();
      console.log(this.items);
    },
    testTruc() {
      // console.log(__dirname);
    },
  },
};
</script>
