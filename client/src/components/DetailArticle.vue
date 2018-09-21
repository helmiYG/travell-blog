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
            </div>
            <div class="card-footer text-muted">
              Share
            <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small" data-mobile-iframe="true">
            <a target="_blank" :href="urltwitter+twitterText+currenttwitter"><i class="fab fa-twitter" style="font-size:20px;"></i></a>
            <a target="_blank" :href="url+current+t" class="fb-xfbml-parse-ignore"><i class="fab fa-facebook-square" style="font-size: 20px"></i></a></div>
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
            <br>
              <h3>No Comments Available</h3>
            </div>
              <div style="margin-top : 10px" v-if="token">
                <label> Input Comment </label><br>
                <input type="text" class="form-control" v-model="comment">
                <button type="submit" class="btn btn-success" @click="addComment(article._id)" >  Comment </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['gettoken', 'islogoutfromhome'],
  data () {
    return {
      article: '',
      comment: '',
      readAgain: '',
      userLogin: '',
      token: '',
      idArt: '',
      current: '',
      twitterText: '',
      currenttwitter: '',
      urltwitter: 'http://twitter.com/share?text=',
      url: `https://www.facebook.com/sharer/sharer.php?u=`
    }
  },
  methods: {
    getOneArticle () {
      this.id = this.$route.params.id
      axios({
        method: 'GET',
        url: `http://localhost:3000/articles/${this.id}/detailarticle`
      })
        .then((result) => {
          this.article = result.data
          this.idArt = result.data._id
          this.twitterText = result.data.title
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addComment (id) {
      if (this.comment) {
        axios({
          method: 'PUT',
          url: `http://localhost:3000/articles/${id}/comment`,
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
        url: `http://localhost:3000/articles/${this.idArt}/comment/${idcomment}/delete`,
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
    this.token = localStorage.getItem('token')
    this.userLogin = localStorage.getItem('idLogin')
    this.current = 'https://traveller-blog.helmiyogantara.club' + window.location.pathname
    this.currenttwitter = '&url=https://traveller-blog.helmiyogantara.club' + window.location.pathname
    this.$emit('hidefromdetail')
  },
  watch: {
    getisloginfromhome () {
      this.token = true
    },
    '$route.params.id': function () {
      this.getOneArticle()
      this.userLogin = localStorage.getItem('idLogin')
      this.token = localStorage.getItem('token')
      this.currenttwitter = '&url=https://traveller-blog.helmiyogantara.club' + window.location.pathname
      this.current = 'https://traveller-blog.helmiyogantara.club' + window.location.pathname
      console.log('masuk article detail wt')
    },
    readAgain () {
      this.getOneArticle()
    },
    islogoutfromhome () {
      this.token = false
    }
  }
}
</script>

<style>
 .detail{
   margin-top: 50px;
   margin-bottom: 20px
 }
</style>
