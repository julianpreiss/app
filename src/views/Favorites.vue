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
      <!--<v-flex
        xs12 
        md6
        v-for="room in rooms"
        :key="room.id"
      >
        
        <v-card
          class="mx-auto my-3"
          :to="{ name: 'DetailRoom', params: { id: room._id } }"
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
                    ${{room.price}}
                  </p>
                </v-card-subtitle>
                
                <v-card-text>
                  <v-rating
                    :value="room.stars"
                    color="pink"
                    dense
                    half-increments
                    size="14"
                  >
                  </v-rating>
                </v-card-text>
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
              <v-btn
                class="btn-call"
                color="white" 
                text 
                block
                id="room.id"
                :to="{ name: 'BookingProcess', params: { id: room._id} }"
              >Reservar</v-btn>
              </v-card-actions>
            </div>
          </v-card>
      </v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
  import API from '../config.js'
  export default {
    data() {
      return {
        rooms: [],
        baseUrl: API + '/rooms', // 'http://localhost:8001/api/rooms' //llamara a la api en un archivo js
      };
    },
    created(){
      this.getRooms();
    },
    methods:{
      async getRooms(){
        const res = await this.axios.get( this.baseUrl ) //Repasar el tallar para ver si podemos cambiar axios por otra conexión
        this.rooms = res.data
      }
    }
  }
</script>

<style>
  .sb{
      margin-bottom: -1rem;
  }
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
</style>