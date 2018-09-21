<template>
       <div class="col-md-4">
          <!-- Search Widget -->
          <router-link to="/myarticles/insert">  <button type="button" class="btn btn-secondary button-add">Add New Article</button> </router-link>
          <!-- Categories Widget -->
          <div class="card my-4">
              <h5 class="card-header">Article</h5>
              <div class="card-body">
                <div class="row">
                  <div class="list-article">
                    <ul class="list-unstyled mb-0">
                      <li v-for="(article, idx) in myarticle" :key="idx">
                        <router-link :to="{name: 'detail-my-article', params: {id : article._id}}"> {{article.title}}</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
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
      myarticle: [],
      send: true
    }
  },
  methods: {
    getArticle () {
      this.token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: 'https://server-traveller-blog.helmiyogantara.club/articles/userarticles',
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.myarticle = data.result
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
    '$route.params.id': function () {
      console.log('---- ada perubahan id')
      this.getArticle()
    }
  }
}
</script>

<style scoped>
.button-add{
    margin-top: 100px;
}
</style>
