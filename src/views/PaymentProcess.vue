<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <h2 class="my-2 titulos text-center">Método de pago</h2>
        <v-form method="post" action="#" enctype="multipart/form-data">
          <v-card ref="form" class="my-1">
            <v-card-text>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
              </v-menu>
              <v-radio-group
                v-model="radios"
                mandatory
              >
                <v-radio
                  label="Efectivo"
                  value="efectivo"
                />
                <v-radio
                  label="Débito"
                  value="debito"
                />
                <v-radio
                  label="Crédito"
                  value="credito"
                />
              </v-radio-group>
              <div v-if="(radios == 'debito' || radios == 'credito')">
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="payment.number"
                      label="Número de tarjeta"
                      hide-details="auto"
                      maxlength="20"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="payment.fullName"
                      label="Nombre y apellido"
                      hide-details="auto"
                      maxlength="40"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="payment.expirationDate"
                      label="Fecha de expiración"
                      hide-details="auto"
                      maxlength="4"
                    />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-text-field
                      v-model="payment.cvv"
                      label="CVV"
                      hide-details="auto"
                      maxlength="4"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-divider 
              class="mt-2"
            />
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
              >
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>  
import API from '../config.js'
  export default {
    data () {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        room: [],
        id: null,
        radios: null,
        payment: {
          number : null,
          time: null,
          fullName: null,
          expirationDate: null,
          cvv: null,
        },
        formHasErrors: false,
      }
    },
    created(){
      this.id = this.$route.params.id;
      this.getOne();
    },
    methods:{
      async getOne(){
        this.baseUrl = API + '/rooms/id?id=' + this.id
        const res = await this.axios.get( this.baseUrl ) //Repasar el tallar para ver si podemos cambiar axios por otra conexión
        this.room = res.data
      },
      save (date) {
          this.$refs.menu.save(date)
      },
      saveUser(){
        this.$router.push('/mis-reservas')
      }
    }
  }
</script>

<style scoped>
  .action{
    background-color: #EA1F54;
    color: white;
  }
  .btn-call{
    letter-spacing: normal;
    text-transform: capitalize;
    font-size: 1.2rem;
  }
</style>