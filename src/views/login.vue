<template>
  <div class="container-login">
      <div class="login">
        <form action="#">
            <span class="login-title">Авторизация</span>
            <label>
                <input required type="text" v-model="email" placeholder="Email" class="login-log">
            </label>
            <label>
                <input required type="password" v-model="pwd" placeholder="Пароль" class="login-password">
            </label>
            <a href="#" class="login-In" @click="login">Войти</a>
        </form>
      </div>
      <div class="login-reg">Ещё не зарегистрированы?<router-link to="/register" id="title-reg"> Регистрация</router-link></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
      return {
        email: '',
        pwd: ''
      }
    },
    methods: {
      login: function () {
        let data = {
            email: this.email,
            pwd: this.pwd
        }
        axios
            .post('/api/login', data)
            .then(() => this.$router.push('/category'))
            .catch(err => console.log(err))
      }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');  
    .container-login {
        background-color: #E5E5E5;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .login {
        width: 400px;
        height: 318px;
        background: #FFFFFF;
        box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    .login-title {
        display: block;
        margin-top: 50px;
        width: 300px;
        height: 28px;
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 28px;
        color: #28313A;
    }
    .login-log {
        outline: none;
        margin-top: 30px;
        padding-left: 15px;
        width: 300px;
        height: 40px;
        border: 1px solid #ABAFBF;
        box-sizing: border-box;
        border-radius: 10px;
    }
    .login-password {
        outline: none;
        margin-top: 30px;
        padding-left: 15px;
        width: 300px;
        height: 40px;
        border: 1px solid #ABAFBF;
        box-sizing: border-box;
        border-radius: 10px;
    }
    .login-In {
        display: block;
        text-decoration: none;
        margin-top: 15px;
        margin-left: 50px;
        padding-top: 10px;
        width: 300px;
        height: 40px;
        background: #8D92C5;
        border-radius: 10px;
        color: #ffffff;
    }
    .login-In:hover {
        color: #ffffff;
        background-color:  #6d72b1;
        text-decoration: none;
    }
    .login-In:active {
        background: #8D92C5;
    }
    .login-reg {
        width: 400px;
        height: 50px;
        background: #FFFFFF;
        box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        margin-top: 30px;
        padding: 15px;
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #28313A;
    }
    #title-reg {
        color: #5C63AB;
    }
</style>