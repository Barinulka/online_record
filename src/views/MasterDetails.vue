<template>
  <div>
    <header class="navbar">
      <a class="navbar-logo" href="#">Workers</a>
      <div class="navbar-menu">
        <ul class="menu-nav ">
          <li class="menu-list">
            <router-link class="menu-link" to="/">Главная</router-link>        
          </li> 
          <li class="menu-list">
            <a class="menu-link" href="#">Выход</a>        
          </li>  
        </ul>
      </div>
    </header>
    <main class="container">
      <div class="frame">
        <div v-if="loaded" class="row">
          <div class="photo col-sm-12 col-lg-4 ">
              <img :src="photo_url" alt="user" class="img-circle">
          </div>
          <div class="profile col-sm-12 col-lg-8 ">
            <div class="profile-info">
              <h1>{{masterDetail.firstname}}</h1>
              <p><strong>Обо мне: </strong>{{masterDetail.info}}</p>
              <p><strong>Телефон: </strong>{{masterDetail.phone}}</p>
              <p><strong>Почта: </strong>{{masterDetail.email}}</p>
            </div>
          </div>                                  
        </div>
      </div>
      <form class="d-flex justify-content-center p-5">
        <input type="datetime-local" class="mr-5" id="data-log">
        <button type="submit" class="btn btn-primary btn-lg">Записаться</button>
      </form>
    </main>
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
    masterDetail: null,
    loaded: false,
    photo_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
    data: []
  }),
  async mounted() {
    const id = this.$route.params.id;
    this.masterDetail = await fetch("/api/master/" + id).then(d => d.json());
    this.loaded = true;
  }
}
</script>