<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-btn
          class="back pl-0"
          text
          color="accent-4"
          @click="reveal = true"
          :to="'/iniciar-sesion'"
          >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <h2 class="my-2 titulos text-center">Crear cuenta</h2>
        <v-form method="post" action="'/iniciar-sesion'" enctype="multipart/form-data">
          <v-card ref="form" class="my-1">
            <v-card-text>
              <v-text-field
                ref="name"
                v-model="user.name"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Nombre *"
                required
              ></v-text-field>
              <v-text-field
                ref="last_name"
                v-model="user.last_name"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Apellido *"
                required
              ></v-text-field>
              <v-text-field
                ref="email"
                v-model="user.email"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Email *"
                required
              ></v-text-field>
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
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="user.date_birth"
                  :active-picker.sync="activePicker"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                  min="1950-01-01"
                  locale="es"
                  color="#EA1F54"
                  @change="save"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                type="number"
                ref="phone"
                v-model="user.phone"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Teléfono *"
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
              <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña *"
                counter
                @click:append="show1 = !show1"
              ></v-text-field> <!-- :rules="[rules.required, rules.min]" -->
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
                @click="saveUser()"
                >Registrarme</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import API from "../../config.js";

export default {
data() {
    return {
      user: {
        name: "",
        last_name: "",
        email: "",
        date_birth: "",
        phone: "",
        user_name: "",
        password: "",
        type: "user",
        owner: false,
      },
      rules: {
          required: value => !!value || 'Campo obligatorio.',
          min: v => v.length >= 8 || 'Mínimo 8 caracteres.',
      },
      errorMessages: "",
      formHasErrors: false,
      menu: false,
      activePicker: null,
      show1: false,
      colorPicker: "#051A26",
      baseUrl: API,
      errorRegister: false,
    };
  },
  computed: {
    form() {
      return {
        name: this.name,
        last_name: this.last_name,
        email: this.email,
        date_birth: this.date_birth,
        phone: this.phone,
        user_name: this.user_name,
        password: this.password,
        type: this.type,
        owner: this.owner,
      };
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
  },

  methods: {
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    save (date) {
        this.$refs.menu.save(date)
    },
    saveUser() {
      if( this.user.name != "" && 
          this.last_name != "" && 
          this.user.email != "" &&
          this.user.user_name != "" && 
          this.user.password != ""){
        axios.post(this.baseUrl + "/register", this.user)
        .then(data => {
          console.log(data);
          this.$router.push({name: 'Login'})
        })
        .catch(error => {
          this.errorRegister = true;
          console.log({error : error, msg: 'Error al registrar usuario'});
        });
      }else{
        this.errorRegister = true;
      }
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