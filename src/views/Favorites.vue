<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-btn
        class="back pl-0"
        text
        color="accent-4"
        @click="reveal = true"
        :to="'/'"
        >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2 class="my-2 titulos text-center mx-auto">Mis favoritos</h2>
      <v-flex
        xs12 
        md6
        v-for="room in rooms"
        :key="room.id"
      >
        <v-card
          class="mx-auto my-3"
        >
          <v-img 
            height="250" 
            :src="'http://localhost:8001/api/img/' + room.img"
          />
          <v-card-title class="order">
            {{ room.name }}
            <v-btn
              icon
              @click="deleteFavorite(room.idFav)"
            >
              <v-icon
                color="#ff7dd8"
              >
                mdi-heart
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row class="mx-0 order">
              <v-rating
                :value="room.stars"
                color="pink"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <p class="grey--text ms-4">{{ room.stars }} (413)</p>
              <p class="price">$ {{ room.price }}</p>
            </v-row>
            <v-card-title class="text-subtitle-1 pl-0 pt-3 pb-2">
              <p class="mb-2">
                <v-icon>mdi-map-marker-outline</v-icon>
                {{ room.address }}, {{ room.district}}.
              </p>
            </v-card-title>
            <div>
              <p>{{ room.description }}</p>
            </div>
          </v-card-text>
          <v-card-actions class="space action" block>
            <v-btn
              class="btn-call fs-large"
              color="white"
              text 
              block
              id="room.id"
              :to="{ name: 'BookingProcess', params: { id: room._id} }"
            >
              Reservar
            </v-btn>
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
        rooms: [],
        baseUrl: API + '/rooms/id?id=',
        favoritesIds: {},
      };
    },
    created(){
      this.checkFavorite ();
    },
    methods:{
      async checkFavorite () {
        const favoritesUrl = API + '/favorites/id?id=' + sessionStorage.id
        const res = await this.axios.get( favoritesUrl )
        if (res.data.length !== 0) {
          this.favorite = true
          this.favoritesIds = res.data
          for (const fav of this.favoritesIds) {
            await this.getFavorite(fav.roomid, fav._id)
          }
        } else {
          this.favorite = false
          this.favoriteid = null
        }
      },
      async getFavorite(id, idFav){
        const res = await this.axios.get( this.baseUrl + id )
        res.data.idFav = idFav
        this.rooms.push(res.data)
      },
      deleteFavorite (id) {
        const url = API + '/favorites/id?id=' + id
        axios.delete( url ).then((res) => {
          this.rooms = []
          this.checkFavorite()
          console.log('res', res)
        })
      }
    }
  }
</script>

<style>
.order {
  justify-content: space-between;
}
.space {
  justify-content: space-around;
}
.action {
  background-color: #ea1f54;
  color: white;
}
.price {
  font-size: larger;
  font-weight: bolder;
  color: #051a26;
}
.btn-call {
  letter-spacing: normal;
  text-transform: capitalize;
  font-size: 1.2rem;
}
.nav-room {
  text-align-last: center;
}
.center {
  text-align: center;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>