<template>
  <v-container>
    <v-row>
      <v-card class="profile" v-show="session">
        <v-card-title class="mt-1">
          <v-avatar size="56">
            <img class="photo" src="https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432_960_720.jpg" alt="Foto de usuario" />
          </v-avatar>
          <p class="ml-3 mt-4">{{ this.nameSession }}</p>
        </v-card-title>
      </v-card>
      <v-list class="profile">
        <v-list-item-group v-model="selectedItem" color="pink darken-1">
          <v-list-item
            links
            v-for="item in items"
            :key="item.title"
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="this.nameSession == ''"  :to="'/iniciar-sesion'">
            <v-list-item-icon>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Iniciar Sesión</v-list-item-title>
            </v-list-item-content> 
          </v-list-item>
          <v-list-item v-else v-on:click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item-content> 
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-row>
  </v-container>
</template>

<style scoped>
.profile {
  width: 100%;
}
</style>

<script>
export default {
  data: () => ({
    selectedItem: 0,
    items: [
      { title: "Editar Perfil", icon: "mdi-account-edit", path: "/editar-perfil" },
      { title: "Ofertas", icon: "mdi-sale", path: "/" },
      { title: "Atención a cliente", icon: "mdi-help-circle", path: "/" },
      { title: "¿Cómo funciona usala?", icon: "mdi-information", path: "/" },
      { title: "Preguntas Frecuentes", icon: "mdi-forum", path: "/" },
      { title: "Ajustes", icon: "mdi-cog", path: "/" },
      { title: "Valorar app usala", icon: "mdi-cellphone-check", path: "/" },
      { title: "Información legal", icon: "mdi-scale-balance", path: "/" },
      { title: "Registrar Sala", icon: "mdi-calendar-plus", path: "/registro-sala", },
      //{ title: "Cerrar Sesión", icon: "mdi-logout-variant", path: "/" },
    ],
    nameSession: '',
    session: false,
  }),
  mounted() {
    if (sessionStorage.name) {
      this.nameSession = sessionStorage.name;
      this.session =  true;
    }
  },
  methods:{
    logout(){
        sessionStorage.clear()
        sessionStorage.logout = true;
        this.$router.push({name: 'Login'})
      }
  }
};
</script>

<style scoped>
.photo{
  width: auto;
}
</style>
