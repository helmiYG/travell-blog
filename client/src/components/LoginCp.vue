<template>
     <div class="login">
        <h1>Login</h1>
        <form>
        <div v-if="shMsErr && msgErr.length > 0">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong v-for="(msg, index) in msgErr" :key="index"> {{msg}} <br></strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="shMsErrFalse">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
        </div>
        <button type="button" class="btn btn-success" @click="login" >LOGIN</button>
        </form>
    </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      msgErr: '',
      shMsErr: false,
      token: '',
      isLogin: true
    }
  },
  methods: {
    login () {
      this.msgErr = []
      if (!this.email) {
        this.msgErr.push('email is required')
      }
      if (!this.password) {
        this.msgErr.push('password is required')
      }
      if (this.msgErr.length < 1) {
        axios({
          method: 'POST',
          url: 'https://server-traveller-blog.helmiyogantara.club/users/login',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then((result) => {
            localStorage.setItem('token', result.data.token)
            localStorage.setItem('idLogin', result.data.id)
            this.$router.push('/')
          })
          .catch((err) => {
            this.msgErr.push(err.response.data.msg)
          })
      }
    },
    shMsErrFalse () {
      this.shMsErr = false
    }
  },
  watch: {
    msgErr () {
      this.shMsErr = true
    },
    token () {
      console.log('ini token di login cp', this.token)
      this.$emit('istoken', this.token)
    }
  }
}
</script>

<style scoped>
    .login{
        margin-top: 100px;
    }
</style>
