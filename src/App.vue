<template>
  <div id="app">
   
    <router-view :key="$route.fullPath"></router-view>
    

    
      
      <p></p>
    

  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  
  }
}
</script>

<style>

</style>
