<template>
  <div id="bgImg" :style="{ backgroundImage: `url(${photo})` }">
    <div id="footer">
      <h3>{{description}}</h3>
      <h4>by {{author}}</h4>
    </div>
  </div>
</template>

<script>

import unsplashApi from '../shared/services/unsplashAPI';

export default {
  name: 'Header',
  data()
  {
    return{
      //Default image
      photo:  "https://images.unsplash.com/photo-1613843873241-56cfd52ae4b3?crop=entropy&cs=srgb&fm=jpg&ixid=MXwyMTA3MTl8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=85",
      author: 'Some author',
      description: 'A placeholder photo'
    }
  },
  mounted()
  {
    // ENABLE THIS ON PRODUCTION
    this.getRandomPhoto(); 
  },
  methods:
  {
    //Get a random photo each time you get this page
    getRandomPhoto()
    {
      unsplashApi.photos.getRandom({ orientation: "portrait" })
        .then(res => {
          console.log(res);
          this.photo = "'" + res.response.urls.full + "'";
          this.author = res.response.user.name;
          this.description = res.response.alt_description
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    height: 120px;
    width: 100%;
    background: #06070d;
    border-bottom: 1px solid #ccc;
    border-top: 5px solid #09a330;
}

#footer
{
  color: white;

  text-align: center;
  margin-bottom: 5vh;

  background-color: #0b5e20b2;
  padding: 5px 50px 5px 50px;
  border-radius: 8px;
}

#bgImg
{
  width: 100%;
  height: 82vh;
  

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: flex-end;

}

</style>
