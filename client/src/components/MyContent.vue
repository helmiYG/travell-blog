<template>
     <div class="col-md-8">
          <h1 class="my-4">Articles
            <small>Traveller</small>
          </h1>
        <!-- {{getmyarticles}} -->
          <!-- Blog Post -->
          <div class="card mb-4" v-for="(article, index) in myarticles" :key="index">
            <img class="card-img-top" :src='article.image' alt="Card image cap">
            <div class="card-body">
              <h2 class="card-title"> {{article.title}} </h2>
              <p class="card-text"> {{article.category}} </p>
              <!-- <a href="#" class="btn btn-primary">  Read More &rarr;</a> -->
              <router-link :to="`/myarticles/${article._id}`"> <button class="btn btn-primary"> Read More &rarr; </button> </router-link>
            </div>
            <div class="card-footer text-muted">
              Posted on  {{article.createdAt}}, by {{article.userId.name}}
            </div>
          </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['getmyarticles'],
  data () {
    return {
      myarticles: [],
      token: ''
    }
  },
  methods: {
    getArticle () {
      this.token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: 'http://localhost:3000/articles/userarticles',
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
  },
  created () {
    this.getArticle()
  },
  watch: {
    getmyarticles () {
      this.getArticle()
    },
    searchfromhome () {
      console.log(this.searchfromhome)
    }
  }
}
</script>
