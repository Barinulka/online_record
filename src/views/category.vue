<template>
  <div class="container" id="container">
    <header class="navbar" id="navbar">
      <router-link class="navbar-logo" to="/">Workers</router-link>
        <div class="navbar-menu">
            <ul class="menu-nav ">
            <li class="menu-list">
                <router-link class="menu-link" to="/category">Главная</router-link>     
            </li> 
            <li class="menu-list">
                <router-link class="menu-link" to="/page-users">Кабинет пользователя</router-link>      
            </li> 
            <li class="menu-list">
                <router-link class="menu-link" to="/page-masters">Кабинет мастера</router-link>      
            </li> 
            <li class="menu-list">
                <a class="menu-link" href="#" @click="logout">Выйти</a>        
            </li>  
            </ul>
        </div>
    </header>
    <div class="main d-flex">
        <div class="list">
            <details v-for="item in category" class="category-list">
                <summary class="btn btn-primary btn-lg" id="category-title"> {{ item.title }} </summary>
                <a class="badge badge-primary submit-record" id="category-text">{{ item.jobs[i].title }}</a>
            </details>
        </div>
        <div class="specialists">
            <div class="specialists-card d-flex justify-content-between" v-for="item in master" :id="item.id" @click="details">
                <div class="image">
                    <span id="master_info">{{ item.info }}</span> <span id="master_price">{{ item.price }}</span>
                    <div id="card">
                        <figure class="d-flex">
                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="photo_master" id="photo_master">
                            <figcaption id="master">
                                <span id="master_name">{{ item.firstname }} {{ item.lastname }}</span>
                                <p id="master_old">{{ item.age }} лет</p><p id="master_city">{{ item.city }}</p>
                                <p id="master_exp">Опыт работы {{ item.experience }} лет</p>
                            </figcaption>
                        </figure>
                    </div>
                </div>
                <div class="education">
                    <span id="title_exp">Образование:</span> <br>
                    <span id="item_exp">{{ item.education }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            i: 0,
            testFor: 5,
            category: [],
            master: [],
            urlAPIcategory: '/api/search',
            urlAPImaster: '/api/master'
        } 
    },
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
        details: function() {
            let id = document.querySelector(".specialists-card").getAttribute("id");
            console.log(id)
        }
    },
    mounted() {
        this.getJSON(this.urlAPIcategory)
            .then(data => {
                console.log(data[0])
                this.category = data
            })
        this.getJSON(this.urlAPImaster)
            .then(data => {
                console.log(data)
                this.master = data
            })
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
    #container {
        padding: 15px;
        min-height: 100vh;
    }
    /* navbar */
    #navbar {
        box-shadow: 0px 1px 3px #DBD9E0;
        position: static;
    }
    /* Категории */
    .list {
        min-width: 20%;
        text-align: left;
        background: #FFFFFF;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    }
    .category-list {
        text-align: center;
        outline: none;
        padding: 10px;
    }
    .category-list ::-webkit-details-marker {
        display: none;
    }
    #category-title {
        width: 100%;
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 25px;
        background: #FFFFFF;
        color: black;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #8D92C5;
    }
    #category-title:hover {
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 5.1);
    }
    #category-title:active {
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    }
    #category-text:hover {
        cursor: pointer;
    }
    /* Содержание категорий */
    .specialists {
        background-color: #E5E5E5;
        min-width: 80%;
    }
    .specialists-card {
        margin: 15px;
        max-width: 100%;
        min-height: 160px;
        background-color: #FFFFFF;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    .specialists-card:hover {
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 5.1);
        cursor: pointer;
    }
    .specialists-card:active {
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
    .image {
        margin-top: 25px;
        margin-left: 15px;
    }
    #master {
        text-align: left;
        margin: 0 0 0 10px;
    }
    #master_info {
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 17px;
        line-height: 22px;
        color: #8D92C5;
        margin: 0px 20px 0 0;
    }
    #master_info:after {
        content: '';
        border: 1px solid #ABAFBF;
        border-radius: 50%;
        margin: 0 0 0 15px;
        background: #ABAFBF;
    }
    #master_price {
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #28313A;
    }
    #photo_master {
        width: 64px;
        height: 64px;
        border-radius: 5px;
    }
    #master_name {
        display: block;
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 17px;
        line-height: 22px;
        color: #28313A;
    }
    #master_old {
        display: inline;
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #28313A;
    }
    #master_old:after {
        content: '';
        border: 1px solid #ABAFBF;
        border-radius: 50%;
        margin: 0 0 0 5px;
        background: #ABAFBF;
    }
    #master_city {
        margin: 0 0 0 5px;
        display: inline;
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #28313A;
    }
    #master_exp {
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #28313A;
    }
    .education {
        margin-right: 290px;
        margin-top: 25px;
    }
    #title_exp {
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        color: rgba(40, 49, 58, 0.5);
    }
    #item_exp {
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #28313A;
    }
</style>