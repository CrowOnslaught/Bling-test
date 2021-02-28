<template>
  <div id="content">
    <div id="GalleryHeader">
      <h1> Random Gallery</h1>
      <button class="randomButton" @click="getRandomPhotos()">Randomize!</button>
    </div>
    <div id="body">
      <div class="photoItem" v-for="p of photos" :key="p.id">
        <img :src="p.urls.small" :alt="p.alt_description" v-on:click="openImage(p.id)">
      </div>
    </div>
    <ImageDetail v-if="isModalOpen" :photo='selectedPhoto' v-on:closeModal="closeImage"></ImageDetail>
    <div id="footer">
      <button class="randomButton" @click="getRandomPhotos()">Randomize!</button>
    </div>
  </div>
</template>

<script>

import unsplashApi from '../shared/services/unsplashAPI';
import ImageDetail from '../shared/components/modals/ImageDetail';

export default {
  name: 'Gallery',
  components: {ImageDetail},
  data()
  {
    return{
      headerComp: null,
      headerOffset: 0,
      isModalOpen: false,
      selectedPhoto: null,

      photos: []
    }
  },
  mounted()
  {
    //Init photo galery
    this.getRandomPhotos();
    this.headerComp = document.getElementById("GalleryHeader");
    this.headerOffset = this.headerComp.offsetTop
    window.onscroll  = () => {this.stickyHeader()};
  },
  methods:
  {
    getRandomPhotos()
    {
      unsplashApi.photos.getRandom({count: 20})
        .then(result =>
        {
          this.photos = result.response;
          console.log(this.photos);
        });
    },
    stickyHeader()
    {
      if (window.pageYOffset > this.headerOffset) {
          this.headerComp.classList.add("sticky");
        } else {
          this.headerComp.classList.remove("sticky");
        }
    },
    openImage(id)
    {
      this.selectedPhoto = this.photos.find(e => e.id == id);
      this.isModalOpen = true;
    },
    closeImage()
    {
      this.isModalOpen = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content
{
  width: 100%;

  background-color: #06070d;
  border: solid gray 1px;
}

#GalleryHeader
{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #054615;
  color:white;
}

h1
{
  text-align: start;
  margin:0;
  padding: 30px;
}

#body
{
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-between;
  align-items: flex-start;

  margin: 50px 15px 0 15px;
}

.photoItem
{
  height: 300px;
  width: auto;
  margin: 0 2px 0 2px;
}

.photoItem>img
{
  width: auto;
  height: 95%;
}

.photoItem>img:hover
{
  filter: drop-shadow(15px 15px  15px #09a330);  
  height: 93%;
}

#footer
{
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 5vh;
}

.randomButton
{
  background: rgb(23, 150, 19);
  color: white;
  padding: 10px 30px 10px 30px; 
  border-radius: 12px;
  font-weight: bold;
  font-size: 30px;
  margin-right: 20px;
  text-decoration: none;
  transition: 300ms all;
  border: none;
  cursor:pointer;
}

.sticky {
  position: fixed;
  top: 0;
  width: 96%;
  z-index: 1;

}
.sticky + #body {
  padding-top: 102px;
}

@media (max-width: 1600px)
{
  .sticky
   {
       width: 95vw;
   }
}

/* Movile device */
@media (max-width: 600px)
{
  h1
  {
    font-size: 20px;
    padding: 20px;
  }
  input
  {
    font-size: 10px;
  }

  #body
  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 50px 15px 0 15px;
  }

  .photoItem
  {
    height: auto;
    width: 90vw;
    margin: 5px 0 5px 0;
  }

  .photoItem>img
  {
    width: 95%;
    height: auto;
  }

  .photoItem>img:hover
  {
    filter: drop-shadow(15px 15px  15px #09a330);  
    width: 93%;
  }

  .randomButton
  {
      font-size: 15px;
  }

}


</style>
