<template>
    <div class="col-md-8">
        <div class="detail">
          <div class="card text-center">
            <img class="card-img-top" :src="article.image" alt="Card image cap">
            <div class="card-header">
              Featured
            </div>
            <div class="card-body">
              <h5 class="card-title">{{article.title}} </h5>
              <p class="card-text">{{article.content}}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
              2 days ago
            </div>
          </div>
            <div>
                <img :src="article.image" alt="article image">
                    <h1> {{article.title}} </h1>
                    <p> {{article.content}} </p>
                    <hr> 
                    <!-- <p>author {{article.userId.name}}</p> -->
                    <p>posted {{article.createdAt}} </p>
                    <button class="btn btn-success btn-xs" @click="edit(article._id)">EDIT</button> || <button class="btn btn-danger btn-xs" @click="deleteArticle(article._id)">DELETE</button>
            </div>
             <div v-if="article.comments.length > 0">
              <h3>All Comment</h3>
              <div class="row">
                <div class="col-md-12"  v-for="(comment, i) in article.comments" v-bind:key="i">
                          <div class="card">
                              <div class="card-header">
                              {{ comment.Date | moment("dddd, MMMM Do YYYY") }}
                              </div>
                              <div class="card-body">
                                <h5 class="card-title"> {{comment.comment}} </h5>
                                <p class="card-text"> by : {{comment.commenterName}} </p>
                                <a class="btn btn-danger" @click="deleteComment(comment._id)" v-if="comment.commenterId == userLogin && token || article.userId._id == userLogin && token">Delete</a>
                              </div>
                        </div>
                  </div>
              </div>
            </div>
          <div v-else>
              <h3>No Comments Available</h3>
            </div>
              <div style="margin-top : 10px" v-if="token">
                <label> Input Comment </label><br>
                <input type="text" style="height : 40px; width : 900px" v-model="comment">
                <button type="submit" class="btn btn-success" @click="addComment(article._id)" >  Comment </button>
            </div>
        </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      article: '',
      id: this.$route.params.id,
      userLogin: '',
      token: ''
    }
  },
  props: ['getidtoupdate'],
  methods: {
    getOneArticle () {
      this.id = this.$route.params.id
      axios({
        method: 'GET',
        url: `http://localhost:3000/articles/${this.id}/detailarticle`
      })
        .then((result) => {
          console.log(result)
          this.article = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    edit (id) {
      this.$router.push(`/myarticles/${id}/edit`)
    },
    deleteArticle(id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/articles/${this.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((result) => {
          console.log(result)
          this.$router.push('/myarticles')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getOneArticle()
    this.userLogin = localStorage.getItem('idLogin')
    this.token = localStorage.getItem('token')
  },
  watch: {
    '$route.params.id': function() {
      this.getOneArticle()
      this.userLogin = localStorage.getItem('idLogin')
      this.token = localStorage.getItem('token')
    }
  }
}
</script>

<style scoped>
.detail {
    margin-top: 100px
}
</style>
