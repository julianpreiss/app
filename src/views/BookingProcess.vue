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
        <h2 class="my-2 titulos text-center">Reservar salar</h2>
        <v-card>
          <v-img 
            height="250" 
            :src="room.img"
          />
          <v-card-title> {{room.name}}</v-card-title>
        </v-card>

        <v-form 
          class="my-3"
          method="post"
          action="#" 
          enctype="multipart/form-data"
        >
          <v-card 
            ref="form"
            class="my-1"
          >
            <v-app-bar
              dark
              color="#051A26"
            >
              <v-toolbar-title>Detallar reserva</v-toolbar-title>
            </v-app-bar>
            <v-card-text>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="booking.date"
                    label="Fecha de reserva"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="booking.date"
                  :active-picker.sync="activePicker"
                  :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                  max="2022-12-31"
                  color="#EA1F54"
                  locale="es"
                  @change="save"
                />
              </v-menu>
            </v-card-text>
            <v-card-text v-if="(booking.date != null)">
              <p>Horarios disponibles en la fecha</p>
              <v-chip-group
                v-model="booking.time"
                active-class="action accent-4 white--text"
                column
              >
                <v-chip>11:00</v-chip>

                <v-chip>17:00</v-chip>

                <v-chip>20:00</v-chip>

                <v-chip>21:00</v-chip>
              </v-chip-group>
            </v-card-text>
            <!--<v-card-text v-if="(booking.date != null)">
              <p>Cantidad de horas</p>

            </v-card-text>-->
            <v-divider class="mt-2"></v-divider>
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
                @click="process()"
                >Pagar reserva</v-btn>
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
        booking: {
          date : this.$route.params?.date,
          time: null,
        },
        activePicker: null,
        formHasErrors: false,
        baseUrl: API + '/rooms/'
      }
    },
    created(){
      this.id = this.$route.params.id;
      this.getOne();
    },
    methods:{
      save (date) {
        this.$refs.menu.save(date)
    },
      async getOne(){
        this.baseUrl = API + '/rooms/id?id=' + this.id
        const res = await this.axios.get( this.baseUrl )
        this.room = res.data
      },
      process(){
        this.$router.push({ name: 'PaymentProcess', params: { id: this.room._id, date: this.booking.date, time: this.booking.time } })
        console.log("id: " + this.room._id + ", date: " + this.booking.date + ", time: " + this.booking.time)
      }

    }
  }
</script>

<style scoped>
  .action{
    background-color: #EA1F54;
    color: white;
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
</style>
