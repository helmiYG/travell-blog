<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <Widget @sendtosearch="gettosearch" :hidefromhome="hide"></Widget>
        <router-view :gettoken="token" :islogoutfromhome="islogoutfromapp" :searchfromhome="toSearch" @hidefromdetail="gethide"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Widget from '@/components/Widget'
export default {
  props: ['islogoutfromapp'],
  name: 'home',
  components: {
    Widget
  },
  data () {
    return {
      login: this.isloginfromapp,
      token: '',
      toSearch: '',
      hide: true
    }
  },
  methods: {
    gettosearch (value) {
      this.toSearch = value
    },
    gethide () {
      if (this.hide) {
        this.hide = false
      } else {
        this.hide = true
      }
    }
  },
  watch: {
    islogoutfromapp () {
      console.log('masuk watch home')
    }
  },
  created () {
    const isToken = localStorage.getItem('token')
    this.token = isToken
    this.$emit('sendtokenfromhome', this.token)
  }
}
</script>
