<template>
  <div id="content">
    <div id="GalleryHeader">
      <h1> Photo Gallery</h1>
      <input type="text" name="search" placeholder="SEARCH AND DISCOVER" v-model='searchString' @change="OnInputChange"/>
    </div>
    <div id="body">
      <div class="photoItem" v-for="p of photos" :key="p.id">
        <img :src="p.urls.small" :alt="p.alt_description" v-on:click="openImage(p.id)">
      </div>
    </div>
    <ImageDetail v-if="isModalOpen" :photo='selectedPhoto' v-on:closeModal="closeImage"></ImageDetail>
    <div id="footer">
      <button :disabled="currentPage<=2" class="pageButton" @click="firstPage()"><font-awesome-icon icon="angle-double-left" /></button>
      <button :disabled="currentPage<=1" class="pageButton" @click="backPage()"><font-awesome-icon icon="angle-left" /></button>
      <button :disabled="photos.length<20" class="pageButton" @click="nextPage()"><font-awesome-icon icon="angle-right" /></button>
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
      searchString:'',
      headerComp: null,
      headerOffset: 0,
      currentPage:1,
      isModalOpen: false,
      selectedPhoto: null,

      photos: []
    }
  },
  mounted()
  {
    //Init photo galery
    this.getPhotoList(this.currentPage);
    this.headerComp = document.getElementById("GalleryHeader");
    this.headerOffset = this.headerComp.offsetTop
    window.onscroll  = () => {this.stickyHeader()};
  },
  methods:
  {
    getPhotoList(page)
    {
      unsplashApi.photos.list({page: page, perPage: 20})
        .then(result =>
        {
          this.photos = result.response.results;
          console.log(result.response);
        });
    },
    searchPhotos(input, page)
    {
      if(input != '')
      {
        unsplashApi.search.getPhotos({query: input,page: page,perPage: 20})
          .then(result =>
          {
            this.photos = result.response.results;
            console.log(result.response);
          });
      }
      else 
      {
        this.currentPage = 1;
        this.getPhotoList(this.currentPage)
      }
    },
    stickyHeader()
    {
      if (window.pageYOffset > this.headerOffset) {
          this.headerComp.classList.add("sticky");
        } else {
          this.headerComp.classList.remove("sticky");
        }
    },
    firstPage()
    {
      this.currentPage =1;
      this.navigateToPage();
    },
    backPage()
    {
      if(this.currentPage <=1)
        return;
        
      this.currentPage--;
      this.navigateToPage();

    },
    nextPage()
    {
      this.currentPage++;

      this.navigateToPage();
    },
    navigateToPage()
    {
      if(this.searchString == '')
        this.getPhotoList(this.currentPage);
      else
        this.searchPhotos(this.searchString, this.currentPage);
    },
    openImage(id)
    {
      this.selectedPhoto = this.photos.find(e => e.id == id);
      this.isModalOpen = true;
    },
    closeImage()
    {
      this.isModalOpen = false;
    },
    OnInputChange()
    {
      this.currentPage = 1;
      this.searchPhotos(this.searchString, this.currentPage);
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


input[type="text"]{
    width: 30%;
    min-height: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 3px;
    margin-right: 30px;
    transition: 300ms all;
}

input[type="text"]:focus{
    box-shadow: 0px 0px 5px #eee inset;
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
  height: 94%;
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

.pageButton
{
  background: rgb(23, 150, 19);
  color: white;
  padding: 10px 30px 10px 30px; 
  font-weight: bold;
  text-transform: uppercase;
  font-size: 50px;
  margin-left: 20px;
  text-decoration: none;
  max-width: 120px;
  transition: 300ms all;
  border: none;
  cursor:pointer;
}
.pageButton:disabled
{
  background: rgb(10, 61, 8);
  color: gray;
}

.sticky {
  position: fixed;
  top: 0;
  width: 96%;
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


.pageButton
{
  padding: 5px 15px; 
  font-size: 30px;
}

}


</style>
