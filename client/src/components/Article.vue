<template>
    <div class="col-md-8">
          <h1 class="my-4">Articles
            <small>Traveller</small>
          </h1>
          <!-- Blog Post -->
          <div class="card mb-4" v-for="(article, idx) in articles" :key="idx">
            <img class="card-img-top" :src="article.image" alt="Card image cap">
            <div class="card-body">
              <h2 class="card-title"> {{article.title}} </h2>
              <p class="card-text"> {{article.category}} </p>
              <router-link :to="`/articles/${article._id}`"> <button class="btn btn-primary"> Read More &rarr; </button> </router-link>
            </div>
            <div class="card-footer text-muted">
              Posted
              {{ article.createdAt | moment("dddd, MMMM Do YYYY") }} <br>
              Author: 
              <a href="#">{{article.userId.name}}</a>
            </div>
          </div>
          <!-- Pagination -->
          <ul class="pagination justify-content-center mb-4">
            <li class="page-item">
              <a class="page-link" href="#">&larr; Older</a>
            </li>
            <li class="page-item disabled">
              <a class="page-link" href="#">Newer &rarr;</a>
            </li>
          </ul>

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
    getAllArticle () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/articles'
      })
        .then((result) => {
          this.articles = result.data.result
        })
        .catch((err) => {
          console.log(err)
        });
    }
  },
  created() {
    this.getAllArticle()
  }
}
</script>

<style>

</style>
