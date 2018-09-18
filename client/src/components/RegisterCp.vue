<template>
     <div class="container">
         <div class="register">
            <h2>Register</h2>
            <div v-if="msgSc">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong> {{msgSc}} </strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
             <div v-if="shMsErr && msgErr.length > 0">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong v-for="(msg, index) in msgErr" :key="index"> {{msg}} <br></strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="shMsErrFalse">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <form>
                <div class="form-group">
                    <label for="name">Name</label><br>
                    <input type="text" class="form-control" placeholder="Input Your Name" name="name" id="name" v-model="name">
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
                <button type="button" class="btn btn-success" @click="register">Submit</button>
            </form>

         </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      msgSc: '',
      msgErr: [],
      shMsErr: false,
      shMsSc: false
    }
  },
  methods: {
    register () {
      this.msgSc = ''
      this.msgErr = []
      if (!this.name) {
        this.msgErr.push('name is required')
      }
      if (!this.email) {
        this.msgErr.push('email is required')
      }
      if (!this.password) {
        this.msgErr.push('password is required')
      }
      if (this.msgErr.length < 1) {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/users/register',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
          .then(result => {
            this.msgSc = 'registration succes, please login now'
            this.name = ''
            this.email = ''
            this.password = ''
          })
          .catch(() => {
            this.msgErr.push('email is already inuse')
          })
      }
    },
    shMsErrFalse () {
      this.shMsErr = false
    },
    shMsScFalse () {
      this.shMsSc = false
    }
  },
  watch: {
    msgErr () {
      this.shMsErr = true
    },
    msgSc () {
      this.shMsSc = true
    }
  }
}
</script>

<style scoped>
.register {
  margin-top: 100px;
}
</style>
