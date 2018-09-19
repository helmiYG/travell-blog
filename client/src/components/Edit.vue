<template>
    <div class="col-md-8">
    <div class="add-Story">
            <div class="story-title">
                <h2>Share your stories</h2>
            </div>
            <div>
                <table class="table">
                    <tr>
                        <th>Title</th>
                        <td><input type="text" name="title" id="title" v-model="title" class="form-control"></td>
                    </tr>
                     <tr>
                        <th>Category</th>
                        <td><input type="text" name="category" id="category" v-model="category" class="form-control"></td>
                    </tr>
                     <tr>
                        <th>Content</th>
                        <td> <textarea name="content" id="content" cols="100" rows="10" v-model="content" class="form-control"></textarea> <br>
                              <button type="submit" class="btn btn-success" @click="edit">Submit</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: '',
      category: '',
      content: '',
      image: '',
      newArt: '',
      idArt: ''
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
          this.title = result.data.title
          this.content = result.data.content
          this.category = result.data.category
          this.idArt = result.data._id
        })
        .catch((err) => {
          console.log(err)
        })
    },
    edit () {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/articles/${this.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          content: this.content,
          category: this.category
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
  }
}
</script>

<style scoped>
.add-Story{
  margin-top: 100px
}
.btn{
  justify-content: flex-end
}
</style>
