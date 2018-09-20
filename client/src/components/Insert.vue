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
                        <!-- <td> <textarea name="content" id="content" cols="100" rows="10" v-model="content" class="form-control"></textarea> </td> -->
                        <wysiwyg v-model="myHTML" />
                    </tr>
                    <tr>
                        <th>Image</th>
                        <td><input type="file" v-on:change="getImage($event)" class="form-control"></td>
                    </tr>
                    <button type="submit" class="btn btn-success" @click="insertArtikel" >Submit</button>
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
      myHTML: ''
    }
  },
  methods: {
    getImage (photo) {
      this.image = photo.target.files[0]
    },
    insertArtikel () {
      let formData = new FormData()
      let token = localStorage.getItem('token')
      formData.append('image', this.image)
      axios.post('http://localhost:3000/upload', formData)
        .then((result) => {
          console.log(result)
          axios({
            method: 'POST',
            url: 'http://localhost:3000/articles',
            headers: {
              token: token
            },
            data: {
              title: this.title,
              category: this.category,
              content: this.myHTML,
              image: result.data.link
            }
          })
            .then((result) => {
              console.log(result)
              this.title = ''
              this.myHTML = ''
              this.category = ''
              this.newArt = result.data.link
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  watch: {
    newArt () {
      this.$emit('sendarticle', this.newArt)
    }
  }
}
</script>

<style>
.add-Story{
  margin-top: 100px

}
</style>
