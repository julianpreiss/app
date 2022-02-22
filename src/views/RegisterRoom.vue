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
          <h2 class="my-2 titulos text-center">Registrar Sala</h2>
        <v-form method="post" action="#" enctype="multipart/form-data">
          <v-card ref="form" class="my-1">
            <v-card-text>
              <v-text-field 
                ref="name" 
                v-model="room.name"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Nombre de la Sala *"
                required
              ></v-text-field>
              <v-autocomplete
                ref="type"
                v-model="room.type"
                :rules="[rules.required]"
                :items="types"
                label="Tipo de Sala *"
                placeholder="Selecionar..."
                required
              ></v-autocomplete>
              <v-textarea
                ref="description"
                v-model="room.description"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                label="Descripción de la Sala *"
                ></v-textarea>
              <v-text-field
                ref="address"
                v-model="room.address"
                :rules="[rules.required, addressCheck]"
                label="Dirección *"
                placeholder="Av. Belgrano 2186"
                required
              ></v-text-field>
              <v-autocomplete
                ref="district"
                v-model="room.district"
                :rules="[rules.required]"
                :items="districts"
                item-text="name"
                label="Barrio *"
                placeholder="Balvanera"
                required
              ></v-autocomplete>
              <v-text-field
                ref="city"
                v-model="room.city"
                :rules="[rules.required]"
                label="Ciudad *"
                placeholder="Ciudad Autónoma de Buenos Aires"
                required
              ></v-text-field>
              <v-file-input
                  ref="file"
                  v-model="room.file"
                  accept="img/png, img/jpeg, img/bmp"
                  prepend-icon="mdi-camera"
                  label="Imagen de la Sala"
                  type="file"
                  @change="onFileSelected"
              ></v-file-input>
              <v-text-field
                ref="price"
                v-model="room.price"
                :rules="[rules.required]"
                label="Precio/hora *"
                type="number"
                required
                placeholder="$"
              ></v-text-field>
              <v-text-field
                ref="meters"
                v-model="room.meters"
                :rules="[rules.required]"
                label="Mts² de la Sala *"
                type="number"
                required
                placeholder="35m²"
              ></v-text-field>
              <v-combobox
                v-model="room.select"
                :items="services"
                label="Servicios"
                multiple
                chips
              ></v-combobox>
              <v-row>
                <v-col cols="11" sm="5">
                  <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-.sync="room.opening"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="room.opening"
                          label="Horario de Apertura"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="room.opening"
                      full-width
                      color="#EA1F54"
                     @click:minute="$refs.menu.save(room.opening)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="11" sm="5">
                  <v-dialog
                      ref="dialog"
                      v-model="modal2"
                      :return-.sync="room.closing"
                      persistent
                      width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="room.closing"
                          label="Horario de Cierre"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="modal2"
                      v-model="room.closing"
                      full-width
                      color="#EA1F54"
                      @click:minute="$refs.menu.save(room.closing)"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(room.closing)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                  <p class="mt-2 mb-0">(*) Campos obligatorios</p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-alert type="error" class="error" v-if="errorRegister">Completa los campos obligatorios.</v-alert>
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
                @click="saveRoom()"
                >Registrar sala</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>  
  import API from "../config.js";
  import axios from 'axios'

  export default {
    data (){
      return {
        room: {
          name: "",
          description: "",
          address: "",
          district:"",
          city: "",
          type: "",
          file: null,
          price: "",
          meters: "",
          opening: "",
          closing: "",
          services: ""
        },
        districts: [],
        types: [
          'Sala de Ensayo',
          'Estudio de Grabación'
        ],
        services: [
          'Wifi',
          'Aire Acondicionado',
          'Alquiler de Instrumentos',
          'Adaptadores para Instrumentos'
        ],
        rules: {
          required: value => !!value || 'Campo obligatorio.',
          min: v => v.length >= 8 || 'Mínimo 8 caracteres.',
        },
        errorMessages: "",
        formHasErrors: false,
        modal2: false,
        menu2: false,
        errorRegister: false,
        baseUrl: API + "/districts",
      }
    },
    created() {
      this.getDistrict();
    },
    computed: {
      form () {
        return {
          name: this.name,
          description: this.description,
          address: this.address,
          district: this.district,
          city: this.city,
          file: this.file,
          price: this.price,
          meters: this.meters,
          type: this.type,
        }
      },
    },
    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
       /* Revisar esto */
        this.errorMessages = this.room.address && !this.room.name
          ? `Campo obligatorio`
          : ''
        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      onFileSelected(event){
        console.log(event)
        this.file = event
      },
      async getDistrict() {
        const res = await this.axios.get(this.baseUrl);
        this.districts = res.data;
        console.log(this.districts);
      },
      saveRoom () {
          if(this.room.name != "" &&
            this.room.description != "" &&
            this.room.address != "" &&
            this.room.district != "" &&
            this.room.city != "" &&
            this.room.price != "" &&
            this.room.meters != "" &&
            this.room.type != "" &&
            this.room.opening != "" &&
            this.room.closing != "" ){
              this.room.img = this.file.lastModified + '.jpg'
              const formData = new FormData();
              formData.append('file', this.file, this.room.img);

              axios.post('http://localhost:8001/upload', formData)
                .then(res =>{
                  console.log(res)
              });

              axios.post('http://localhost:8001/registro/room', this.room)
              .then(data => {
                console.log(data)
                this.$router.push({name: 'Home'})
              })
              .catch(error => {
                console.log({error : error, msg: 'Error al registrar la sala'});
                this.errorRegister = true
              });
            }else{
              this.errorRegister = true
            }
      },
    },
  }
</script>

<style scoped>
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
</style>