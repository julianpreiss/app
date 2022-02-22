<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-layout>
        <v-flex>
          <v-list dark v-show="session">
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432_960_720.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">{{ this.nameSession }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list nav dense dark>
            <v-list-item-group v-model="selectedItem" color="pink darken-1">
              <v-list-item links v-for="item in items" :key="item.title" :to="item.path">
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
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="logoUsala">
        <v-img src="../src/assets/logo-usala.png"></v-img>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation
      class="sticky"
      :value="value"
      color="#EA1F54"
      horizontal
    >
      <v-btn color="accent-4" :to="{name: 'Home', params: { sesion: session}}">
        <v-icon large>mdi-home</v-icon>
      </v-btn>
      <v-btn color="accent-4" :to="'/favoritos'">
        <v-icon large>mdi-heart</v-icon>
      </v-btn>
      <v-btn :to="'/mis-reservas'">
        <v-icon large>mdi-calendar</v-icon>
      </v-btn>
      <v-btn color="accent-4" @click="url()">
        <v-icon large>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
  import API from './config.js'

  export default {
    data: () => ({ 
      items: [
        { title: 'Inicio', icon: 'mdi-home', path: '/' },
        { title: 'Favoritos', icon: 'mdi-heart', path: '/favoritos' },
        { title: 'Mis Reservas', icon: 'mdi-calendar', path: '/mis-reservas' },
        { title: 'Mi Perfil', icon: 'mdi-account', path: '/perfil' },
        { title: 'Splash', icon: 'mdi-account-plus', path: '/splash' },
      ],
      drawer: null, 
      selectedItem: 0,
      value: 1,
      nameSession: '',
      session: false,
      user: [],
      id: 0,
      baseUrl: API + '/users/',
    }),
    mounted() {
      if (sessionStorage.name) {
        this.nameSession = sessionStorage.name;
        this.session = true;
      }
    },
    methods:{
      url(){
        sessionStorage.name ?  this.$router.push({name: 'Profile'}) : this.$router.push({name: 'Login'});
      },

      reload(){
        location.reload();
      },

      logout(){
        sessionStorage.clear()
        sessionStorage.logout = true;
        this.$router.push({name: 'Login'})
        //this.$forceUpdate(); --Recargar el menú para ver cambios
      }
    },
}
</script>

<style scoped> 
  .logoUsala{
    width: 100px;
    height: 50px;
    margin-top: 0;
    margin-left: 0;
  }
  .theme--light.v-app-bar.v-toolbar.v-sheet{
    background: #051A26 !important;
  }
  .theme--light.v-navigation-drawer{
    background: #051A26;
    color: white;
  }
  .sticky{
    position: sticky;
    position: -webkit-sticky;
  }

</style>