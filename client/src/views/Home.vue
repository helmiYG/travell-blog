<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <Widget></Widget>
        <router-view></router-view>
        <h1>{{isloginfromapp}}</h1>
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
      isloginfromapptest: localStorage.getItem('token')
    }
  },
  props: ['isloginfromapp'],
  watch: {
    isloginfromapp (val) {
      console.log(val);
      console.log('kampret', val)
    },
    '$route'(to, from) {
      console.log('aaaaaaaß');
    }
  }
}
</script>
