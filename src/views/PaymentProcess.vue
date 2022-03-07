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
                @click="saveBooking()"
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
import axios from 'axios'
import API from '../config.js'

export default {
  data () {
    return {
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      room: [],
      booking: {
        user_id: "",
        name: "",
        address: "",
        district: "",
        date : this.$route.params?.date,
        time: this.$route.params?.time,
        img: "",
      },
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
      errorRegister: false,
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
      this.room = res.data,
      this.booking.user_id = sessionStorage.id,
      this.booking.name = this.room.name,
      this.booking.address = this.room.address,
      this.booking.district = this.room.district,
      this.booking.img = this.room.img
    },
    saveBooking(){
      const startDate = `${this.booking.date}T${this.booking.time}:00-03:00`
      const hourArray = this.booking.time.split("")
      hourArray[1] = parseInt(hourArray[1]) + 2
      const endHour = hourArray.join('')
      const endDate = `${this.booking.date}T${endHour}:00-03:00`
      this.booking.startDate = startDate
      this.booking.endDate = endDate
      if( this.district != "" ){
        axios.post(API + "/bookings", this.booking)
        .then(data=> {
          console.log(data);
          this.$router.push({ name: 'DetailBooking', params: { id: this.room._id, date: this.booking.date, time: this.booking.time } })
        })
        .catch(error => {
          this.errorBookings = true;
          console.log({error : error, msg: 'Error al pagar/registrar la reserva'});
        }); 
      }else{
        this.errorRegister = true;
        this.$router.push({name: 'Home'})
      }        
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