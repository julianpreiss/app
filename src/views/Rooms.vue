<template>
  <v-container grid-list-md>
    <v-layout>
      <v-flex class="nav-room my-auto space">
        <v-btn icon class="left pl-5" color="accent-4" text :to="'/'"
          ><v-icon class="pl-5 ml-5" large>mdi-filter-variant</v-icon></v-btn
        >
        <v-btn icon class="center" color="accent-4" text :to="'/'"
          ><v-icon large>mdi-filter-outline</v-icon></v-btn
        >
        <v-btn icon class="pr-5 right" color="accent-4" text :to="'/'"
          ><v-icon class="pr-5 mr-5" large>mdi-map-outline</v-icon></v-btn
        >
      </v-flex>
    </v-layout>
    <v-row class="mt-0">
      <v-col class="pt-0" cols="12" sm="6" v-for="room in rooms" :key="room.id">
        <v-card
          class="mx-auto my-3"
        >
          <router-link :to="{ name: 'DetailRoom', params: { id: room._id, date: date, district: district }}">
            <v-img 
              height="250" 
              :src="'http://localhost:8001/api/img/' + room.img"
            />
          </router-link>
          <v-card-title class="order"> {{room.name}}
            <v-btn
              icon
              
            ><!--@click="saveFavorite()"-->
              <v-icon
                :color="favorite? '#ff7dd8' : '#b5b5b5'"
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
                {{ room.address }}, {{ room.district }}.
              </p>
            </v-card-title>
            <div>
              <p>{{ room.description }}</p>
            </div>
          </v-card-text>
          <v-card-actions class="space action" block>
            <v-btn
              class="btn-call"
              color="white"
              text
              block
              id="room.id"
              @click="url(room._id)"
            >
              Reservar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../config.js";
export default {
  data() {
    return {
      date: this.$route.params?.date,
      district: this.$route.params?.district,
      favorite: null,
      rooms: [],
      baseUrl: API + '/rooms/district?district=' + this.$route.params?.district
    };
  },
  created() {
    this.getRooms();
    // this.favorite();
  },
  methods: {
    /*async checkFavorite () {
      const params = {
        roomid: this.roomid,
        userid: sessionStorage.id
      }
      this.baseUrl = API + '/favorites/check'
      const res = await this.axios.get( this.baseUrl, { params } )
        console.log(res.data)
      if (res.data !== null) {
        this.favorite = true
        this.favoriteid = res.data._id
      } else {
        this.favorite = false
        this.favoriteid = null
      }
    },*/
    async getRooms() {
      const res = await this.axios.get(this.baseUrl);
      this.rooms = res.data;
      // console.log(res.data);
    },
    url(idroom){
      console.log (idroom)
      sessionStorage.name ?  this.$router.push({name: 'BookingProcess', params: { id: idroom, date: this.date, district: this.district }}) : this.$router.push({name: 'Login'});
    },
    /*saveFavorite: function(){
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
      }*/

  },
};
</script>

<style scoped>
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
