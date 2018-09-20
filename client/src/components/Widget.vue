<template>
       <div class="col-md-4">
         <div class="main-widget">
            <!-- Search Widget -->
            <div class="card my-4" v-if="show">
              <h5 class="card-header">Search</h5>
              <div class="card-body">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for..." v-model="tosearch">
                  <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button" @click="search">Go!</button>
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
         </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['hidefromhome'],
  data () {
    return {
      articles: [],
      tosearch: '',
      changetoSearch: false,
      show: true
    }
  },
  methods: {
    getArticle () {
      this.token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: 'http://localhost:3000/articles'
      })
        .then(({ data }) => {
          this.articles = data.result
        })
        .catch((err) => {
          console.log(err)
        })
    },
    search () {
      if (this.changetoSearch) {
        this.changetoSearch = false
      } else {
        this.changetoSearch = true
      }
    }
  },
  created () {
    this.getArticle()
    this.show = true
  },
  watch: {
    getmyarticles () {
      this.getArticle()
    },
    '$route' (to, from) {
      if (to.fullPath === '/') {
        this.show = true
      }
    },
    '$route.params.id': function () {
      this.getArticle()
    },
    changetoSearch () {
      this.$emit('sendtosearch', this.tosearch)
      this.tosearch = ''
    },
    hidefromhome () {
      this.show = false
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
