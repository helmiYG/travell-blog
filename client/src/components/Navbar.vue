<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
       <div>
         <h1 style="color: white">Travell Blog</h1>
       </div>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link">
                 <router-link class="route-link" to="/">Home</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                 <router-link class="route-link" to="/myarticles" v-if="token">My Articles</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <router-link class="route-link" to="/login" v-if="!token">Login</router-link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                 <router-link class="route-link" to="/register" v-if="!token">Register</router-link>
              </a>
            </li>
             <li class="nav-item">
              <a class="nav-link" v-if="token" @click="logout">
               Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  props: ['isloginfromapp'],
  data () {
    return {
      token: false,
      isLogout: true
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      if (this.isLogout) {
        this.isLogout = false
      } else {
        this.isLogout = true
      }
    }
  },
  created () {
    let isToken = localStorage.getItem('token')
    if (isToken) {
      this.token = true
    }
  },
  watch: {
    isloginfromapp () {
      this.token = true
    },

    isLogout () {
      this.token = false
    }
  }
}
</script>

<style scoped>
.route-link{
  color: white;
  text-decoration: none
}
</style>
