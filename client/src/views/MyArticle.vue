<template>
  <div class="about">
     <div class="container">
        <div class="row">
          <MyWidget :getmyarticles="newArt" @sentidupdate="getIdtoUpdate"></MyWidget>
          <router-view :getmyarticles="newArt" @sendarticle="getarticle" :getidtoupdate="idUpdate"></router-view>
        </div>
     </div>
  </div>
</template>

<script>
import MyWidget from '@/components/MyWidget'
import axios from 'axios'
export default {
  name: 'my-article',
  components: {
    MyWidget
  },
  data () {
    return {
      token: '',
      newArt: '',
      idUpdate: false
    }
  },
  methods: {
    getarticle (value) {
      this.newArt = value
    },
    getIdtoUpdate (value) {
      console.log(value, 'ini di myarticle parent')
      if (value) {
        if (this.idUpdate) {
          this.idUpdate = false
        } else {
          this.idUpdate = true
        }
      }
    }
  },
  created () {
    this.token = localStorage.getItem('token')
    axios({
      method: 'GET',
      url: 'https://server-traveller-blog.helmiyogantara.club/articles/userarticles',
      headers: {
        token: this.token
      }
    })
      .then((result) => {
        this.myarticles = result.data.result
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .about {
    min-height: 600px;
  }
</style>
