<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-regular white--text buscador">
      Buscar en tu zona
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="district"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                :items="districts"
                item-text="name"
                label="Barrio"
                prepend-icon="mdi-map-marker"
                placeholder="Balvanera"
                required
              ></v-autocomplete>
            </v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-col cols="12">
                  <v-text-field
                    v-model="date"
                    label="Elegir fecha"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </v-col>
              </template>
              <v-date-picker 
                v-model="date" 
                no-title scrollable
                :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                max="2022-12-31"
                locale="es"
                color="#EA1F54"
                @change="save"
              >
              </v-date-picker>
            </v-menu>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-alert type="error" class="error" v-if="errorRegister">Completa los datos para la búsqueda.</v-alert>
    <v-card-actions 
      class="space action" 
      block
    >
      <v-slide-x-reverse-transition>
        <v-tooltip 
          v-if="formHasErrors" 
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn  
              icon
              class="my-0"
              color="white" 
              v-bind="attrs"
              @click="resetForm"
              v-on="on"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-slide-x-reverse-transition>
      <v-btn 
        class="btn-call fs-large"
        color="white"
        text 
        block
        @click="saveSearch()"
      >Buscar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import API from "../config.js";

export default {
  data () {
    return {
      zone: "",
      district: "",
      districts: [],
      search: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      rules: {
        required: value => !!value || 'Campo obligatorio.',
      },
      errorMessages: "",
      formHasErrors: false,
      menu: false,
      baseUrl: API + "/districts",
      errorRegister: false,
    };
  },
  created() {
    this.getDistrict();
  },
  watch: {
    zone() {
      this.errorMessages = "";
    },
  },
  methods: {
    save (date) {
        this.$refs.menu.save(date)
    },
    saveSearch() {
      if( this.district != "" ){
        axios.get(this.baseUrl + '?district=' + this.district)
        .then((response) => {
          this.search = response.data,
          this.$router.push({ name: 'Rooms', params: { district: this.district, date: this.date } })
        })
        .catch(e => 
          console.log("e" + e));
      }else{
        this.errorRegister = true;
      }
    },
    async getDistrict() {
      const res = await this.axios.get(this.baseUrl);
      this.districts = res.data;
    },
  },
};
</script>

<style>
.buscador {
  background: #051a26;
}
.btn-menu {
  color: #051a26;
}
.action{
  background-color: #EA1F54;
  color: white;
}
.btn-call {
  letter-spacing: normal;
  text-transform: capitalize;
}
.fs-large{
  font-size: larger !important;
}
</style>