<template>
<div class="main">
    <!-- Menu -->
    <header class="navbar">
        <router-link class="navbar-logo" to="/">Workers</router-link>
        <div class="navbar-menu">
            <ul class="menu-nav ">
                <li class="menu-list">
                    <router-link class="menu-link" to="/">Главная</router-link>         
                </li> 
                <li class="menu-list">
                    <a class="menu-link" href="#">Выход</a>  
                    <!-- 
                        пример ссылки
                        <router-link to="/category" exact>Катеории</router-link>       
                    -->
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
                    <div class="profile-info">
                        <div v-if="errored" class="alert alert-primary" role="alert">
                            Невозможно загрузить данные из-за неизвестной ошибки!
                        </div>
                        <h1 >{{ fullname }}</h1>
                        <p><strong>Почта: </strong> {{userDetail.email}} </p>
                        <p><strong>Телефон: </strong> {{userDetail.phone}} </p>
                        <p><strong>Город: </strong> {{ getCity }} </p>
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
                    <tbody v-for="item in order" :key="item.id">
                        <tr>
                            <td >{{ item.job_title }}</td>
                            <td>{{ item.firstname }} {{ item.lastname }}</td>
                            <td>{{ item.comment }}</td>
                            <td>{{ item.job_date }}</td>
                        </tr>         
                    </tbody>
                </table>
                <div v-if="orderError" class="alert alert-primary" role="alert">
                    Невозможно загрузить данные из-за неизвестной ошибки!
                </div>
                <input type="data" v-model="data"> 
                <button @click="dataLog"></button>
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
export default {
    data: () => ({
        // orderInfo: null,
        userDetail: null,
        orderDetail: null,
        loaded: false,
        photo_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        city: [],
        order: [],
        data: [],
        urlAPIcity: '/api/citys',
        urlAPIorder: '/api/order',
        orderError: false,
        errored: false
    }),
    methods: {
        getJSON (url) {
            return fetch(url)
            .then(d => d.json())
        },
    },
    async mounted() {
        this.userDetail = await fetch("/api/profile")
            .then(d => d.json())
            .catch(error => {
                console.log(error)
                this.errored = true
            });
        // console.log(this.userDetail.firstname)

        // this.orderDetail = await fetch("/api/order/2")
        //     .then(d => d.json())
        //     console.log(this.orderDetail)

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
                // console.log(data)
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