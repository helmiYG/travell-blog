<template>
    <div class="col-md-8">
          <h1 class="my-4">Articles
            <small>Traveller</small>
          </h1>
          <!-- Blog Post -->
          <div class="card mb-4" v-for="(article, idx) in show" :key="idx">
            <img class="card-img-top" :src="article.image" alt="Card image cap">
            <div class="card-body">
              <h2 class="card-title"> {{article.title}} </h2>
              <p class="card-text"> {{article.category}} </p>
              <router-link :to="`/articles/${article._id}`"> <button class="btn btn-primary"> Read More &rarr; </button> </router-link>
            </div>
            <div class="card-footer text-muted">
              Posted
              {{ article.createdAt | moment("dddd, MMMM Do YYYY") }} <br>
              Author: {{article.userId.name}}
            </div>
          </div>
          <!-- Pagination -->
          <ul class="pagination justify-content-center mb-4">
            <li class="page-item">
              <a class="page-link" v-if="counter > 0" @click="chCountermin">&larr; </a>
            </li>
            <li class="page-item">
              <a class="page-link" v-if="articles.length-2 > counter" @click="chCounterplus"> &rarr;</a>
            </li>
          </ul>

        </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['searchfromhome'],
  data () {
    return {
      articles: [],
      temp: [],
      counter: 0,
      show: []
    }
  },
  methods: {
    getAllArticle () {
      axios({
        method: 'GET',
        url: 'https://server-traveller-blog.helmiyogantara.club/articles'
      })
        .then((result) => {
          this.articles = result.data.result
          this.temp = result.data.result
          this.show = []
          this.articles.forEach((page, index) => {
            if (index < this.counter + 2 && index >= this.counter) {
              this.show.push(page)
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    chCounterplus () {
      this.counter += 2
    },
    chCountermin () {
      this.counter -= 2
    }
  },
  created () {
    this.getAllArticle()
  },
  watch: {
    searchfromhome () {
      this.show = []
      this.temp.forEach(article => {
        if (article.title.toLowerCase().indexOf(this.searchfromhome.toLowerCase()) > -1) {
          this.show.push(article)
        }
      })
    },
    counter () {
      this.getAllArticle()
    }
  }
}
</script>

<style>

</style>
