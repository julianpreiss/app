<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-btn
          class="back pl-0"
          text
          color="accent-4"
          @click="reveal = true"
          :to="'/perfil'"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <h2 class="my-2 titulos text-center">Editar Perfil</h2>
        <v-form method="post" action="'/perfil'" enctype="multipart/form-data">
          <v-card ref="form" class="my-1">
            <v-card-text>
              <v-text-field
                ref="name"
                v-model="user.name"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Nombre *"
                required
                >{{ user.name }}
              </v-text-field>
              <v-text-field
                ref="last_name"
                v-model="user.last_name"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Apellido *"
                required
              >{{ user.last_name }}</v-text-field>
              <v-text-field
                ref="email"
                v-model="user.email"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Email *"
                required
              >{{ user.email }}</v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="user.date_birth"
                    label="Fecha de Nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  >{{ user.date_birth }}</v-text-field>
                </template>
                <v-date-picker
                  v-model="user.date_birth"
                  :active-picker.sync="activePicker"
                  :max="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)"
                  locale="es"
                  min="1950-01-01"
                  color="#EA1F54"
                  @change="save"
                >{{ user.date_birth }}</v-date-picker>
              </v-menu>
              <v-text-field
                type="number"
                ref="phone"
                v-model="user.phone"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Teléfono"
                required
              ></v-text-field>
              <v-text-field
                ref="user_name"
                v-model="user.user_name"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Nombre de usuario *"
                required
              ></v-text-field>
              <p class="mt-2 mb-0">(*) Campos obligatorios</p>
            </v-card-text>
            <v-alert type="error" class="error" v-if="errorRegister">Completa los campos obligatorios.</v-alert>
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
                class="btn-call"
                color="white" 
                text
                block
                @click="editUser()"
                >Modificar Perfil</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import API from "../config.js";

export default {
  data() {
    return {
      user: [],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      colorPicker: "#051A26",
      errorMessages: "",
      //baseUrl: API,
      formHasErrors: false,
      menu: false,
      activePicker: false,
      show1: false,
      errorRegister: false,
      id: 0,
    };
  },
  created() {
    //No está llegando el ID, si lo pongo a mano
    //me trae los datos correctamente
    this.id = sessionStorage.id;
    console.log(this.id);
    this.getUser();
  },
  methods: {
    async getUser() {
      this.baseUrl = API + '/users/id?id=' + this.id
      const res = await this.axios.get(this.baseUrl);
      this.user = res.data;
      console.log("Hola" + this.user);
    },
    editUser() {
      const formData = {
        name: this.user.name,
        last_name: this.user.last_name,
        email: this.user.email,
        date_birth: this.user.date_birth,
        phone: this.user.phone,
        user_name: this.user.user_name,
      };
      axios.patch(API + "/users/id?id=" + this.id, formData).then((res) => {
        console.log(res);
        this.$router.push("/");
        sessionStorage.name = this.user.name;
      });
    },
  },
};
</script>

<style>
  .titulos{
    color: #051A26;
  }
  .action{
    background-color: #EA1F54;
  }
  .back{
    position: absolute;
    margin-top: 0.5rem;
    justify-content: flex-start;
  }
  .btn-call{
    letter-spacing: normal;
    text-transform: capitalize;
    font-size: 1.2rem !important;
  }
  .error{
    background-color: red;
    color: white;
  }
</style>