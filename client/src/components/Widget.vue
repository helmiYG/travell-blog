<template>
       <div class="col-md-4">
         <div class="main-widget">
            <!-- Search Widget -->
            <div class="card my-4">
              <h5 class="card-header">Search</h5>
              <div class="card-body">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for...">
                  <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Go!</button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Categories Widget -->
            <div class="card my-4">
              <h5 class="card-header">Article List</h5>
              <div class="card-body">
                <div class="row">
                  <div class="list-article">
                    <ul class="list-unstyled mb-0">
                      <li v-for="(article, idx) in articles" :key="idx">
                        <router-link :to="`/articles/${article._id}`">{{article.title}}</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Side Widget -->
            <div class="card my-4">
              <h5 class="card-header">Side Widget</h5>
              <div class="card-body">
                You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
              </div>
            </div>
         </div>

        </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getArticle () {
      this.token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: 'http://localhost:3000/articles',
      })
        .then(({data}) => {
          this.articles = data.result
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
    '$route.params.id': function() {
      this.getArticle()
    }
  }
}
</script>

<style>
.main-widget{
  margin-top: 50px;
}
.list-article{
  margin-left:auto;
  margin-right:auto;
}
</style>
