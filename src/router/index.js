import Vue from 'vue'
import VueRouter from 'vue-router'
//import VueSplash from 'vue-splash'

Vue.use(VueRouter)
//Vue.use(VueSplash)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/iniciar-sesion',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/registro-usuario',
    name: 'RegisterUser',
    component: () => import('../views/auth/RegisterUser.vue')
  },
  {
    path: '/registro-sala',
    name: 'RegisterRoom',
    component: () => import('../views/RegisterRoom.vue')
  },
  {
    path: '/salas',
    name: 'Rooms',
    component: () => import('../views/Rooms.vue')
  },
  {
    path: '/detalle-sala',
    name: 'DetailRoom',
    component: () => import('../views/DetailRoom.vue')
  },
  {
    path: '/favoritos',
    name: 'Favorites',
    component: () => import('../views/Favorites.vue')
  },
  {
    path: '/mis-reservas',
    name: 'Bookings',
    component: () => import('../views/Bookings.vue')
  },
  {
    path: '/proceso-de-reserva',
    name: 'BookingProcess',
    component: () => import('../views/BookingProcess.vue')
  },
  {
    path: '/pago-de-reserva',
    name: 'PaymentProcess',
    component: () => import('../views/PaymentProcess.vue')
  },
  {
    path: '/reserva-confirmada',
    name: 'DetailBooking',
    component: () => import('../views/DetailBooking.vue')
  },
  {
    path: '/perfil',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/editar-perfil',
    name: 'EditProfile',
    component: () => import('../views/EditProfile.vue')
  },
  /*{
    path: '/splash',
    name: 'Splash',
    component: () => import('../views/Splash.vue')
  },*/
]

const router = new VueRouter({
  routes
})

export default router

