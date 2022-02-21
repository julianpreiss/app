<template>
  <v-container>
    <v-alert type="success" v-if="session"><!--v-show="success"-->
     Has iniciado sesión {{this.nameSession}} {{this.idSession}}!!
    </v-alert>
    <Search />
    <CardsHome />
  </v-container>
</template>

<script>
  import Search from '../components/Search.vue'
  import CardsHome from '../components/CardsHome.vue'

  export default {
    data(){
      return{
        session: false,
        logout: false,
        nameSession: '',
      }
    },
    name: 'Home',
    mounted() {
      if(sessionStorage.login){
        this.session = true;
        sessionStorage.removeItem('login');
        this.nameSession = sessionStorage.name;
        this.idSession = sessionStorage.id;
        setTimeout(() => this.session = false, 6000);
      }
    },
    components: {
      Search,
      CardsHome
    },
  }
</script>

