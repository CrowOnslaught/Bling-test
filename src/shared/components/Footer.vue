<template>
    <footer id="footer">
      <p>
          bling-test: An app for the test to get hired in Bling by Jaume Garcia
      </p>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer{
  position: fixed;
  bottom:0;

  background: #054615;
  
  width: 95vw;

  height: 5vh;
  color: ivory;

    border-top: 1px solid gray;
    border-bottom: 5px solid #09a330;
}

#footer p {
    margin: 0px;
    padding-top: 1.5vh;
    font-size: 20px;
}

@media (max-width: 600px)
{
  #footer{
    position: fixed;
    bottom:0;
    height: 6vh;
    
    width: 100%;
  }

  #footer p
  {
    height: 100%;
    padding: 10px 10px 0 10px;
    font-size: 12px;
  }


}

</style>
