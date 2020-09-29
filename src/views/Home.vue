<template>
  <div id="nav">
      <router-link to="/category">Category</router-link> |
      <router-link to="/details/1">Master's details</router-link> |
      <router-link to="/page-users">Page Users</router-link> |
      <router-link to="/page-masters"> Page Masters</router-link> |
      <router-link to="/login"> Login </router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span> 
    </div>
</template>

<script>
export default {
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    }
}
</script>

<style scoped>
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>