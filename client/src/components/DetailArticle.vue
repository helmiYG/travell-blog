<template>
    <div class="col-md-8">
        <div>
         <!-- {{article}} -->
            <div class="row">
                <div class="col-md-12">
                    <div>
                        <img src="http://placehold.it/750x300" alt="article image">
                    </div>
                </div>
            </div>
            <div class="row">
                    <div class="col-md-12">
                            <div>
                                <h1>{{show[0].title}}</h1>
                                <p> {{show[0].content}}</p>
                                <br><br>
                                <router-link :to="`/myStory/${show.id}/edit`" v-if="token">
                                <button class="btn btn-success btn-xs">EDIT</button></router-link>||
                                <button class="btn btn-danger btn-xs" v-if="token">DELETE</button>
                            </div>
                    </div>
            </div>
        <div>
    </div>
        <br>
        <h3>All Comment</h3>
        <h1> {{this.$route.params.id}} </h1>
        <h1> {{getisloginfromhome}} </h1>
        <div class="row">
        </div>
        {{token}}
        <div style="margin-top : 10px" v-if="token">
            <label> Input Comment </label><br>
            <input type="text" style="height : 40px; width : 900px">
            <button type="submit" class="btn btn-success">  Comment </button>
        </div>
    </div>

    </div>
</template>

<script>
export default {
  props: ['getisloginfromhome'],
  data () {
    return {
      articles: [
        {
          id: '1',
          title: 'title 1',
          category: 'sport 1',
          content: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'
        },
        {
          id: '2',
          title: 'title 2',
          category: 'sport 2',
          content: '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'
        },
        {
          id: '3',
          title: 'title 3',
          category: 'sport 3',
          content: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!'
        }
      ],
      idArt: '',
      show: [],
      token: false
    }
  },
  methods: {
    showArticle () {
      this.articles.forEach(article => {
        if (article.id === this.$route.params.id) {
          console.log('masuk')
          console.log(article)
          console.log(this.$route.path,'oooooooo');
          
          this.show.push(article)
        }
      })
    }
  },
  created () {
    this.showArticle()
    this.idArt = this.$route.params.id
  },
  mounted () {
    this.idArt = this.$route.params.id
  },
  watch: {
    getisloginfromhome () {
      this.token = true
    },

    idArt () {
      this.showArticle()
    }
  }
}
</script>

<style>

</style>
