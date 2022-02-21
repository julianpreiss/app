<!-- ESTE ARCHIVO HAY QUE BORRARLO CUANDO ROOMS.VUE ESTE CONFIGURADO -->
<template>
  <div class="container mt-2 py-5">
    <nav class="navbar navbar-expand navbar-light mb-0 border-top">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-arrow-down-up"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-funnel"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-map"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="mb-3 mt-3" v-for="room in rooms" :key="room._id">
      <div class="g-0 card mt-3 list-group-horizontal">
        <router-link
          class="text-decoration-none text-black row"
          to="/detallesala"
        >
          <div class="col-lg-4 col-md-5">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_960_720.jpg"
              class="img-fluid rounded-start"
              alt=""
            />
          </div>
          <div class="col-lg-8 col-md-7">
            <div class="card-body text-start">
              <div class="card-title row">
                <h5 class="col-10 h3 my-auto fw-bold">{{ room.name }}</h5>
                <a href="#" class="col-2 text-end">
                  <i class="bi bi-heart fs-3 black"></i>
                </a>
              </div>
              <div class="row card-text">
                <i class="bi bi-geo-alt fs-5 col-1"></i>
                <p class="col-10 my-auto p-0">{{ room.address }}</p>
              </div>
              <p class="card-text mt-3">{{ room.description }}</p>
              <div class="row">
                <p class="col-2 puntuacion text-center ms-2 mb-0">8,6</p>
                <p class="col-4 my-auto">
                  <small class="text-muted">6 comentarios</small>
                </p>
                <p class="col-5 card-text h2 bold text-end ms-4 fw-bold my-auto">$ {{ room.price }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!--<div class="mb-3 mt-3" v-for="user in users" :key="user._id">
            <div class="g-0 card mt-3 list-group-horizontal">
                <router-link class="text-decoration-none text-black row" to="/detallesala">
                    <div class="col-lg-4 col-md-5">
                        <img src="https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_960_720.jpg" class="img-fluid rounded-start" alt="">
                    </div>
                    <div class="col-lg-8 col-md-7">
                        <div class="card-body text-start">
                            <div class="card-title row">
                                <h5 class="col-10 h3 my-auto fw-bold">{{user.name}}</h5>
                                <a href="#" class="col-2 text-end"><i class="bi bi-heart fs-3 black"></i></a>
                            </div>
                            <div class="row card-text">
                                <i class="bi bi-geo-alt fs-5 col-1"></i>
                                <p class="col-10 my-auto p-0">{{user.last_name}}</p>
                                <p class="col-10 my-auto p-0">{{user.date_birth}}</p>
                                <p class="col-10 my-auto p-0">{{user.phone}}</p>
                                <p class="col-10 my-auto p-0">{{user.email}}</p>
                                <p class="col-10 my-auto p-0">{{user.user_name}}</p>
                                <p class="col-10 my-auto p-0">{{user.password}}</p>
                                <p class="col-10 my-auto p-0">{{user.kind}}</p>
                            </div>
                            <p class="card-text mt-3">Esto es una pequeña descripción de la sala para enganchar al posible cliente.</p>
                            <div class="row">
                                <p class="col-2 puntuacion text-center ms-2 mb-0">8,6</p>
                                <p class="col-4 my-auto"><small class="text-muted">6 comentarios</small></p>
                                <p class="col-5 card-text h2 bold text-end ms-4 fw-bold my-auto">$ 1.500</p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>-->
  </div>
</template>

<script>
export default {
  name: "Listado",
  props: {
    msg: String,
  },
  data() {
    return {
      rooms: [],
      baseUrl: "http://localhost:8001/api/rooms",
      //users: [],
      //baseUrl: 'http://localhost:8001/api/users'
    };
  },
  created() {
    this.getRooms();
    //this.getUsers();
  },
  methods: {
    async getRooms() {
      const res = await this.axios.get(this.baseUrl);
      this.rooms = res.data;
    },
    /*async getUsers(){
            const res = await this.axios.get( this.baseUrl )
            this.users = res.data
        }*/
  },
};
</script>
