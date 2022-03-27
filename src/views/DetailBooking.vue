<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h2 class="my-2 titulos text-center">Detalles de su reserva</h2>
        <v-alert type="success" v-if="confirm">
              Reserva realizada con éxito !!
        </v-alert>
        <v-card>
          <v-img height="250" :src="'https://usala-api.herokuapp.com/api/img/' + room.img" />
          <v-card-title class="order"> {{room.name}}
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-row 
              class="mx-0"
            >
              <v-rating 
                :value="room.stars" 
                color="pink" 
                dense 
                half-increments 
                readonly 
                size="14"
              ></v-rating>
              <p class="grey--text ms-4">{{room.stars}} (413)</p>
            </v-row>
            <v-card-title 
              class="text-subtitle-1 pl-0 pt-3 pb-2"
            >
              <p class="mb-2">
                <v-icon>mdi-map-marker-outline</v-icon>
                {{room.address}}, {{room.district}}
              </p>
            </v-card-title>
            <div>
              <p>{{room.description}}</p>
            </div>
          </v-card-text>
          <v-card-text class="pt-0">
            <div
              class="d-flex justify-space-between my-auto"
            >
              <v-card-subtitle
                class="px-0 py-0"
              >
              <p class="fs-initial">Precio por 1 hora: </p>
                
              </v-card-subtitle>
              <div class="align-y">
                <p class="pl-3 pt-1 fw fs-initial">$ {{ room.price }}</p>
               </div>
            </div>
            <div
              class="d-flex justify-space-between my-auto"
            >
              <v-card-subtitle
                class="px-0 py-0"
              >
              <p class="fs-initial">Fecha:</p>
                
              </v-card-subtitle>
              <div class="align-y">
                <p class="pl-3 pt-1 fw fs-bold"> {{booking.date}}</p>
               </div>
            </div>
            <div
              class="d-flex justify-space-between my-auto"
            >
              <v-card-subtitle
                class="px-0 py-0"
              >
              <p class="fs-initial">Horario:</p>
                
              </v-card-subtitle>
              <div class="align-y">
                <v-icon>mdi-clock-outline</v-icon>
                <p class="pl-3 pt-1 fw fs-bold"> {{booking.time}}</p>
               </div>
            </div>
            <div
              class="d-flex justify-space-between"
            >
              <!--<span>
                <v-icon>mdi-account-multiple-plus-outline</v-icon> 
                Max: {{ room.max_people }}
              </span>-->
              <span>
                <v-icon>mdi-texture-box</v-icon> 
                {{ room.meters }} m2
              </span>
              <span v-if="room.wifi == true">
                <v-icon>mdi-wifi</v-icon> 
                Wifi
              </span>
            </div>
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
                :to="{ name: 'Bookings', params: { id: room._id, date: booking.date, district: district }}"
              >Mis Reservas</v-btn>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import API from '../config.js'
  export default {
    data() {
      return {
        district: this.$route.params?.district,
        room: [],
        booking: {
          date : this.$route.params?.date,
          time: this.$route.params?.time,
        },
        id: 0,
        confirm: false,
      };
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
        this.confirm = true;
      },
    }
  }
</script>

<style scoped>
.order{
  justify-content: space-between;
}
.left{
  justify-content: flex-start !important;
}
.price{
    font-size: x-large;
    font-weight: bolder;
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
  font-size: 1.2rem;
}
.align-y{
  display: -webkit-box;
}
.fw{
  font-weight: 500;
}
.fs-initial{
  font-size: initial;
}
.f-bold{
  font-size: large !important;
  color: black !important;
  font-weight: bold !important;
}
</style>