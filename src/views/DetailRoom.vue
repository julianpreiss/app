<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-btn
          class="back pl-0"
          text
          color="accent-4"
          @click="reveal = true"
          :to="{ name: 'Rooms', params: { date: date, district: district }}"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <h2 class="my-2 titulos text-center">{{ room.name }}</h2>
        <v-card>
          <v-img 
            height="250" 
            :src="'https://usala-api.herokuapp.com/api/img/' + room.img"
          />
          <v-card-title class="order"> {{room.name}}
            <v-btn
              icon
              @click="saveFavorite()"
            >
              <v-icon
                :color="favorite? '#ff7dd8' : '#b5b5b5'"
              >
                mdi-heart
              </v-icon>
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
                {{room.address}}, {{room.district}}.
              </p>
            </v-card-title>
            <div>
              <p>{{room.description}}</p>
            </div>
          </v-card-text>
          <v-card-text class="pt-0">
            <div
              class="d-flex justify-space-between"
            >
              <v-card-subtitle
                class="px-0 py-0"
              >
                <p class="fs-initial">Precio por 1 hora: </p>
              </v-card-subtitle>
              <p class="price">$ {{ room.price }}</p> 
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
                <p class="pl-3 pt-1 fw fs-initial"> {{ room.opening }} - {{ room.closing }}</p>
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
                id="room.id"
                @click="url(room._id)"
              >Reservar</v-btn>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import API from '../config.js'
  import axios from 'axios'
  export default {
    data() {
      return {
        date: this.$route.params?.date,
        district: this.$route.params?.district,
        favorite: false,
        favoriteid: null,
        room: {
          img: null,
        },
        roomid: null,
      };
    },
    created(){
      this.roomid = this.$route.params.id;
      this.getOne()
    },
    methods:{
      async checkFavorite () {
        const params = {
          roomid: this.roomid,
          userid: sessionStorage.id
        }
        this.baseUrl = API + '/favorites/check'
        const res = await this.axios.get( this.baseUrl, { params } )
        if (res.data !== null) {
          this.favorite = true
          this.favoriteid = res.data._id
        } else {
          this.favorite = false
          this.favoriteid = null
        }
      },
      async getOne(){
        this.baseUrl = API + '/rooms/id?id=' + this.roomid
        const res = await this.axios.get( this.baseUrl )
        this.room = res.data

        this.checkFavorite()
      },
      url(idroom){
        sessionStorage.name ?  this.$router.push({name: 'BookingProcess', params: { id: idroom, date: this.date, district: this.district }}) : this.$router.push({name: 'Login'});
      },
      saveFavorite: function(){
        if(!this.favorite) {
          const room = {
            roomid: this.roomid,
            userid: sessionStorage.id,
          }
          axios.post(API + '/favorites', room)
            .then(data => {
              console.log(data)
              this.checkFavorite()
            })
            .catch(error => {
              console.log({error : error, msg: 'Error al agregar favorito'});
            });
        } else {
          this.baseUrl = API + '/favorites/id?id=' + this.favoriteid
          axios.delete( this.baseUrl ).then((res) => {
            this.checkFavorite()
            console.log('res', res)
          })
        }
      }
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
</style>
