<template>
  <div id="app">
    <Navbar :isloginfromapp="islogin" @sendislogout="getislogout"></Navbar>
      <router-view @sendtokenfromhome="gettokenfromhome" :islogoutfromapp="isLogout"></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
// let base_url = 'http://localhost:3000'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'home',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      islogin: false,
      isLogout: true
    }
  },
  methods: {
    gettokenfromhome (value) {
      if (value) {
        if (this.islogin) {
          this.islogin = false
        } else {
          this.islogin = true
        }
      }
    },
    getislogout (value) {
      console.log('nasuk app')
      if (!value) {
        if (this.isLogout) {
          this.isLogout = false
        } else {
          this.isLogout = true
        }
      }
    }
  }
}
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding-top: 54px;
}

@media (min-width: 992px) {
  body {
    padding-top: 56px;
  }
}
</style>
