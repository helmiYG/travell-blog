<template>
    <div class="col-md-8">
        <div class="detail">
          <div class="card text-center">
            <br>
             <h1 class="card-title">{{article.title}} </h1>
            <img class="card-img-top" :src="article.image" alt="Card image cap">
            <div class="card-header">
               {{ article.createdAt | moment("dddd, MMMM Do YYYY") }}
               <br>
               Author: {{article.userId.name}}
            </div>
            <div class="card-body">
              <p v-html="article.content" class="card-text"></p>
              <button class="btn btn-success btn-sm" @click="edit(article._id)"><i class="fas fa-edit"></i></button>
              <button class="btn btn-danger btn-sm" @click="deleteArticle(article._id)"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="card-footer text-muted">
              <br>
            </div>
          </div>
          <div v-if="article.comments.length > 0">
              <br>
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
                                <a class="btn btn-danger btn-sm" @click="deleteComment(comment._id)" v-if="comment.commenterId == userLogin && token || article.userId._id == userLogin && token"><i class="fas fa-trash-alt"></i></a>
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
                <input type="text" class="form-control" v-model="comment">
                <button type="submit" class="btn btn-success" @click="addComment(article._id)">Comment </button>
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
      token: '',
      readAgain: '',
      idArt: '',
      current: ''
    }
  },
  props: ['getidtoupdate'],
  methods: {
    getOneArticle () {
      this.id = this.$route.params.id
      axios({
        method: 'GET',
        url: `https://server-traveller-blog.helmiyogantara.club/articles/${this.id}/detailarticle`
      })
        .then((result) => {
          console.log(result)
          this.article = result.data
          this.idArt = result.data._id
        })
        .catch((err) => {
          console.log(err)
        })
    },
    edit (id) {
      this.$router.push(`/myarticles/${id}/edit`)
    },
    deleteArticle (id) {
      axios({
        method: 'DELETE',
        url: `https://server-traveller-blog.helmiyogantara.club/articles/${this.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((result) => {
          this.$router.push('/myarticles')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addComment (id) {
      if (this.comment) {
        axios({
          method: 'PUT',
          url: `https://server-traveller-blog.helmiyogantara.club/articles/${id}/comment`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            comment: this.comment
          }
        })
          .then((result) => {
            this.readAgain = result
            this.comment = ''
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    deleteComment (idcomment) {
      axios({
        method: 'PUT',
        url: `https://server-traveller-blog.helmiyogantara.club/articles/${this.idArt}/comment/${idcomment}/delete`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((result) => {
          this.readAgain = result
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
    '$route.params.id': function () {
      this.getOneArticle()
      this.userLogin = localStorage.getItem('idLogin')
      this.token = localStorage.getItem('token')
    },
    readAgain () {
      this.getOneArticle()
    }
  }
}
</script>

<style scoped>
.detail {
    margin-top: 100px
}
</style>
