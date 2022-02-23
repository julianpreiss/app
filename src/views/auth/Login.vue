<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-btn
            class="back pl-0"
            text
            color="accent-4"
            @click="reveal = true"
            :to="'/'"
            >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <h2 class="my-2 titulos text-center">Iniciar sesión</h2>
          <v-form class="my-1">
            <v-alert type="error" v-if="error">
              Las credenciales no son correctas
            </v-alert>
            <v-alert type="success" v-if="logout">
              Hasta pronto {{nameSession}} !!
            </v-alert>
            <v-card ref="form" class="my-1">
              <v-card-text>
                <v-text-field
                  ref="email"
                  v-model="email"
                  :rules="[rules.required]"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-card-text>
              <v-card-actions
                class="space action" 
                block
              >
              <v-btn 
                class="btn-call"
                color="white" 
                text 
                block
                v-on:click="login()"
              >Iniciar Sesión</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
          <div class="mx-auto text-center mt-5">                
            <v-btn class="btn-buscar-false size" text :to="'/registro-usuario'">Creá cuenta acá</v-btn>
            <v-btn class="btn-buscar-false size" text :to="'/'">¿Has olvidado la contraseña?</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        email: '',
        password: '',
        error: false,
        success: false,
        show1: false,
        logout: false,
        nameSession: '',
        rules: {
          required: value => !!value || 'Campo obligatorio.',
        },
        errorMessages: '',
      }
    },
    mounted(){
      if(sessionStorage.logout){
        this.logout = true;
        //this.$set(this.nameSession, sessionStorage.name);
        this.nameSession = sessionStorage.name;
        this.idSession = sessionStorage.id;
        sessionStorage.clear();
      }
    },
    methods: {
      login(){
        let dataLogin = {
          "email" : this.email,
          "password" : this.password,
        }
        
        axios.post('http://localhost:8001/api/login', dataLogin)
          .then( data =>{
            if(data.data.status == "ok"){
              sessionStorage.token = data.data.token
              sessionStorage.name = data.data.user.name
              sessionStorage.login = true;
              sessionStorage.id = data.data.user._id
              this.$router.push({name: 'Home', params: {sessionStorage}})
            }else{
              this.error = true
              this.errorMessages = data.data.msg
            }
          })
      }
    },
    computed: {
      form () {
        return {
          email: this.email,
        }
      },
    },

    watch: {
      email () {
        this.errorMessages = ''
      },
    },
  }
</script>

<style scoped>
  .btn-buscar-false{
    color: #EA1F54;
    text-transform: none;
  }
  .action{
    background-color: #EA1F54;
  }
  .back{
    position: absolute;
    margin-top: 0.5rem;
    justify-content: flex-start;
  }
  .size{
    font-size: 1rem !important;
    font-weight: 500;
    letter-spacing: normal;
  }
  .btn-call{
    letter-spacing: normal;
    text-transform: capitalize;
    font-size: 1.2rem;
  }
</style>