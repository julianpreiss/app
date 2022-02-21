<template>
  <vue-splash
    :show="true"
    :logo="logo"
    color="#051A26"
    :size="200"
  />
</template>
 
<script>
import YourLogo from '../assets/logo-usala.png'
 
export default {
  name: "YourMagnificentVueComponent",
  computed: {
    logo() {
      return YourLogo;
    }
  }
}
</script>