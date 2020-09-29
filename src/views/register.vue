<template>
  <div class="container-register">
    <div class="register">
      <form>
          <span class="register-title">Регистрация</span>
          <div class="register-role">
            <input type="radio" id="zero" value="0" v-model="role" required checked>
            <label for="zero" class="customer">Я клиент</label> |
            <input type="radio" id="one" value="1" v-model="role" required>
            <label for="one" class="spec">Я специалист</label>
          </div>
          <div>
            <input id="email" type="email" v-model="email" required autofocus placeholder="email">
          </div>
          <div>
            <input id="password" type="password" v-model="pwd" required placeholder="password">
          </div>
          <div id="register-lic">
            <input type="checkbox" name="lic" id="register-lic-check" required> Я соглашаюсь с <a href="#" id="register-lic-title">пользовательским соглашением</a>
          </div>
          <div>
            <a href="#" class="register-In" @click="register">Зарегистрироваться</a>
          </div>
      </form>
    </div>
    <div class="register-log">Уже зарегистрированы?<router-link to="/" id="title-log"> Войти</router-link></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
      return {
        role: '',
        email: '',
        pwd: ''
      }
    },
    methods: {
      register: function() {
        let data = {
          role: this.role,
          email: this.email,
          pwd: this.pwd
        }
        axios
          .post('/api/register', data)
          .then(() => this.$router.push('/login'))
          .catch(err => console.log(err))
      }
    }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');  
    .container-register {
        background-color: #E5E5E5;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .register {
        width: 400px;
        height: 400px;;
        background: #FFFFFF;
        box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    .register-title {
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
    .register-role {
      margin-top: 15px;
      display: flex;
      justify-content: space-evenly;
    }
    input[type="radio"] {
      display: none;
    }
    .customer {
      display: inline-block;
      font-family: Abel;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 22px;
      color: #ABAFBF;
    }
    .customer:hover {
      cursor: pointer;
    }
    #zero:checked + .customer {
      color: #5C63AB;
      border-bottom: 1px solid #5C63AB;
    }
    .spec {
      display: inline-block;
      font-family: Abel;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 22px;
      color: #ABAFBF;
    }
    .spec:hover {
      cursor: pointer;
    }
    #one:checked + .spec {
      color: #5C63AB;
      border-bottom: 1px solid #5C63AB;
    }

    #email {
      margin-top: 20px;
      padding-left: 10px;
      width: 300px;
      height: 40px;
      border: 1px solid #ABAFBF;
      box-sizing: border-box;
      border-radius: 10px;
      outline: none;
    }
    #password {
      margin-top: 20px;
      padding-left: 10px;
      width: 300px;
      height: 40px;
      border: 1px solid #ABAFBF;
      box-sizing: border-box;
      border-radius: 10px;
      outline: none;
    }
    #register-lic {
      width: 300px;
      margin-top: 20px;
      margin-left: 60px;
    }
    .register-In {
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
    .register-In:hover {
        color: #ffffff;
        background-color:  #6d72b1;
        text-decoration: none;
    }
    .register-In:active {
        background: #8D92C5;
    }

    .register-log {
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
    #title-log {
        color: #5C63AB;
    }
</style>