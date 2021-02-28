<template>
  <header id=header>
    <h1> BLING Exercice: A photo Gallery by Jaume Garcia</h1>
    <nav id="menu">
      <ul>
        <li>
            <router-link to="/home" active-class="active">Home</router-link>
        </li>
        <li>
            <router-link to="/gallery" active-class="active">Gallery</router-link>
        </li>          
        <li>
            <router-link to="/random" active-class="active">Random</router-link>
        </li>                           
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style >
#header {
    height: 12vh;
    width: 100%;
    background: #06070d;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-top: 5px solid #09a330;

}

h1
{
  text-align: start;
  padding-left: 50px;
}

#menu{
    width: 70%;
    font-size: 18px;
    text-align: start;
}

#menu ul{
    width: 100%;
}

#menu ul li{
    display: inline-block;
    list-style: none;
    margin-left: 15px;
    margin-right: 15px;
}

#menu a{
    text-decoration: none;
    color: rgb(187, 187, 177);
    transition: 300ms all;
}

#menu a:hover, #menu .active{
    color: #078025;
}
@media (max-width: 1000px)
{
  h1
  {
    font-size: 20px;
  }
}
@media (max-width: 400px)
{
  h1
  {
  padding: 0 25px;
  text-align: center;

  }

  #header {
    height: 18vh;
    
  }

  #menu
  {
    padding-bottom: 10px;
  }

  #menu ul li
  {
    font-size: 15px;
    margin-left: 5px;
    margin-right: 5px;
  }
}

</style>
