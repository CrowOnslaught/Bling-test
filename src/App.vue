<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './shared/components/Header.vue'
import Footer from './shared/components/Footer.vue'

export default {
  name: 'App',
  components: { Header, Footer}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: ivory;
  margin-top: 60px;

  max-width: 95vw;
  min-width: 300px;
  background-color: white;

  margin: auto;
}

body
{
  background-color: #06070d;
}

@media (max-width: 1600px)
{
  #app {


  padding-left: -10px;
  padding: -10px;
}

body
{
  background-color: #010f04;
}
}

</style>
