<template>
    <div class="container">
        <div class="login">
            <Login @istoken="gettoken"></Login>
        </div>
    </div>
</template>

<script>
import Login from '@/components/LoginCp.vue'
export default {
  name: 'login',
  components: {
    Login
  },
  methods: {
    gettoken (value) {
      if (value) {
        console.log('ini token di login', value)
        this.$emit('senttokenfromlogin', value)
      }
    }
  }
}
</script>

<style scoped>
    .login{
        min-height: 700px;
    }
</style>
