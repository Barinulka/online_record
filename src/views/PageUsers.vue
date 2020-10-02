<template>
<div class="main">
    <!-- Menu -->
    <header class="navbar">
        <router-link class="navbar-logo" to="/">Workers</router-link>
        <div class="navbar-menu">
            <ul class="menu-nav ">
                <li class="menu-list">
                    <router-link class="menu-link" to="/category">Главная</router-link>             
                </li> 
                <li class="menu-list">
                    <a class="menu-link" href="#" @click="logout">Выйти</a>        
                </li> 
            </ul>
        </div>
    </header>
    <!-- Content -->
    <main class="container">
        <div class="frame">
            <div v-if="loaded" class="row">
                <div class="photo col-sm-12 col-lg-4 ">
                    <img :src="photo_url" alt="user" class="img-circle">
                </div>
                <div class="profile col-sm-12 col-lg-8 " >
                    <div class="profile-info" v-if="!editing">
                        <div v-if="errored" class="alert alert-primary" role="alert">
                            Невозможно загрузить данные из-за неизвестной ошибки!
                        </div>
                        <h1 >{{ fullname }}</h1>
                        <p><strong>Почта: </strong> {{userDetail.email}} </p>
                        <p><strong>Телефон: </strong> {{userDetail.phone}} </p>
                        <p><strong>Город: </strong> {{ getCity }} </p>
                        <div>
                            <a href="#" class="edit" @click="editEnter(userDetail)">Редактировать</a>
                        </div>
                    </div>
                    <div class="profile-info" v-if="editing">
                        <input class="input" type="text" v-model="userDetail.firstname" required placeholder="Имя">
                        <input class="input" type="text" v-model="userDetail.lastname" required placeholder="Фамилия">
                        <input class="input" type="text" v-model="userDetail.city_id" required placeholder="id города">
                        <button class="save-In" @click="editSave(userDetail)">OK</button>
                        <button class="save-In" @click="editCancel(userDetail)">Отмена</button>
                    </div>
                </div>                                   
            </div>
        </div>
        <div class="record">
            <h1>Вы записаны:</h1>
        </div>  
        <div class="frame-1">
            <div class="table-responsive-lg">
                <table class="table table-hover" >
                    <thead>
                        <tr>
                            <th>Вид услуги</th>
                            <th>Специалист</th>
                            <th>Комментарий</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in order" :key="item.id" :id="item.id" >
                        <tr>
                            <td >{{ item.job_title }}</td>
                            <td >{{ item.firstname }} {{ item.lastname }}</td>
                            <td >{{ item.comment }}</td>
                            <td >{{ item.job_date }}</td>
                        </tr>                     
                    </tbody>
                    
                </table>
                <div v-if="orderError" class="alert alert-primary" role="alert">
                    Невозможно загрузить данные из-за неизвестной ошибки!
                </div>
            </div>
        </div>           
    </main>
    <!-- footer -->
    <footer class="footer">
        <ul class="footer-nav">
            <li class="footer-list">
                <a href="#" class="footer-link">О нас</a>
            </li>
            <li class="footer-list">
                <a href="#" class="footer-link">Контакты</a>
            </li>
            <li class="footer-list">
                <a href="#" class="footer-link">Все права защищены &copy;</a>
            </li>
        </ul>
    </footer>
</div>
</template>

<script>
import Axios from 'axios';
export default {
    data: () => ({
        // orderInfo: null,
        userDetail: null,
        orderDetail: null,
        loaded: false,
        editing: false,
        photo_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        city: [],
        order: [],
        urlAPIcity: '/api/citys',
        urlAPIorder: '/api/order',
        orderError: false,
        errored: false,
        oldFirstname: '',
        oldLastname: '',
        oldCity_id: null
    }),
    methods: {
        getJSON (url) {
            return fetch(url)
            .then(d => d.json())
        },
        logout: function() {
            return fetch('/api/logout')
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))
        }, 
        editEnter (userDetail) {
            this.oldFirstname = userDetail.firstname;
            this.oldLastname = userDetail.lastname;
            this.oldCity_id = userDetail.city_id;
            this.editing = true;
        },
        editCancel (userDetail) {
            userDetail.firstname = this.oldFirstname;
            userDetail.lastname = this.oldLastname; 
            userDetail.city_id = this.oldCity_id;
            this.editing = false;
        }, 
        editSave (userDetail) {
            let data = {
                firstname: userDetail.firstname,
                lastname: userDetail.lastname,
                city_id: userDetail.city_id
            }
            Axios
                .post('/api/profile/userupdate', data)
                .catch(err => console.log(err))
            this.editing = false;
        }
        
    },
    async mounted() {
        this.userDetail = await fetch("/api/profile")
            .then(d => d.json())
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        // console.log(this.userDetail.firstname)

        this.loaded = true;
                
        this.getJSON(this.urlAPIcity)
            .then(data => {
                // console.log(data)
                this.city = data
                // console.log(this.city)
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            });
        
        this.getJSON(this.urlAPIorder)
            .then(data => {
                console.log(data)
                this.order = data
            })
            .catch(error => {
                console.log(error)
                this.orderError = true
            });

       
    
    },
    computed:{
        fullname: {
            get: function () {
                return this.userDetail.firstname + ' ' + this.userDetail.lastname;
            },
            set: function (newValue) {
                var names = newValue.split(' ')
                this.userDetail.firstname = names[0]
                this.userDetail.lastname = names[names.length - 1]
            }
        },
        getCity: function () {
            for(let index = 0; index < this.city.length; index++) {
                for(let item = 0; item < index; item++) {
                    if(item == this.userDetail.city_id){
                        // console.log(this.city[item - 1].city);
                        return this.city[item - 1].city;
                    }
                }
            }
        },
    },
    
}
</script>
<style scoped>
.input {
    display: block;
      margin-top: 20px;
      padding-left: 10px;
      width: 300px;
      height: 40px;
      border: 1px solid #ABAFBF;
      box-sizing: border-box;
      border-radius: 10px;
      outline: none;
      
    }
    
    .save-In {
      display: block;
      text-decoration: none;
      margin-top: 15px;
      margin-left: 0px;
      /* padding-top: 10px; */
      width: 300px;
      height: 40px;
      background: #8D92C5;
      border-radius: 10px;
      color: #ffffff;
      align-items: center;
      justify-content: center;
    }
    .save-In:hover {
        color: #ffffff;
        background-color:  #6d72b1;
        text-decoration: none;
    }
    .save-In:active {
        background: #8D92C5;
    }
    .edit {
      display: block;
      text-decoration: none;
      margin-top: 15px;
      /* margin-left: 50px; */
      /* padding-top: 10px; */
      width: 300px;
      height: 40px;
      background: #8D92C5;
      border-radius: 10px;
      color: #ffffff;
    }
    .edit:hover {
        color: #ffffff;
        background-color:  #6d72b1;
        text-decoration: none;
    }
    .edit:active {
        background: #8D92C5;
    }
</style>