<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <Widget></Widget>
        <router-view :gettoken="token"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Widget from '@/components/Widget'
import MainContent from '@/components/MainContent.vue'
export default {
  name: 'home',
  components: {
    Widget,
    MainContent
  },
  data () {
    return {
      login: this.isloginfromapp,
      token: ''
    }
  },
  watch: {
    
  },
  created() {
    const isToken = localStorage.getItem('token')
    this.token = isToken
    this.$emit('sendtokenfromhome', this.token)
  }
}
</script>
