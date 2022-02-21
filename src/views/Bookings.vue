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
      <h2 class="my-2 titulos text-center mx-auto">Mis reservas</h2>
      <v-flex
        xs12 
        md6
        v-for="room in rooms"
        :key="room.id"
      >
          <v-card
            class="mx-auto my-3"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="room.name"
                ></v-card-title>

                <v-card-subtitle>
                  <p class="mb-2">
                    <v-icon>mdi-map-marker-outline</v-icon>
                    {{room.address}}
                  </p>
                  <p class="price mb-2">
                    03/12/2021
                  </p>
                  <p class="price mb-2">
                    21:00
                  </p>
                </v-card-subtitle>
              </div>

              <v-avatar
                class="ma-3"
                size="140"
                tile
              >
                <v-img :src="room.img"></v-img>
              </v-avatar>
            </div>
            <div>
              <v-card-actions
                class="space action" 
                block
              >
                <div
                  color="accent-4" 
                  text 
                  block
                >
                  <v-rating 
                      :value="room.stars" 
                      background-color="white lighten-3"
                      color="white"
                      half-increments 
                      hover
                      size="25"
                  ></v-rating>
                </div>
              </v-card-actions>
            </div>
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
        rooms: [
          { name: 'Domus Artis', address: 'Triunvirato 4321, Villa Urquiza', img: 'https://i.pinimg.com/originals/4e/01/07/4e01070802b337ea8dbb35ca12d51e36.jpg', stars: 0, }
        ],
        baseUrl: API + '/rooms', // 'http://localhost:8001/api/rooms' //llamara a la api en un archivo js
      };
    },
   /* created(){
      this.getRooms();
    },
    methods:{
      async getRooms(){
        const res = await this.axios.get( this.baseUrl ) //Repasar el tallar para ver si podemos cambiar axios por otra conexión
        this.rooms = res.data
      }
    }*/
  }
</script>

<style>
  .space{
    justify-content: space-around;
  }
  .back{
    position: absolute;
    margin-top: 0.5rem;
    justify-content: flex-start;
  }

  .action{
    background-color: #EA1F54;
    color: white;
  }
  
  .price{
    font-size: larger;
    font-weight: bolder;
    color: #051A26;
  }

</style>
