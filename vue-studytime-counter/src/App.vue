<template>
  <div>
    <Navbar @openSidebar="openSidebar"/>
    <div class="main-wrapper">
      <Sidebar ref="sidebar"/>
      <RouterView />
    </div>

  </div>
</template>

<script module>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/icons/Navbar.vue'
import Sidebar from './components/icons/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  data(){
    return {
      sidebarOpen: false
    }
  },
  methods: {
      openSidebar(){
        if(this.sidebarOpen === false){
          this.$refs.sidebar.open()
          this.sidebarOpen = true;
          // console.log(this.sidebarOpen);
          return;
        } 
        if(this.sidebarOpen === true){
          this.$refs.sidebar.close()
          this.sidebarOpen = false;
          // console.log(this.sidebarOpen);
          return;
        } 
      }
  },
}
</script>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Orbitron:wght@400;500;900&family=Poppins:wght@100;200;400;600;900&display=swap');

  h1 {
    font-family: 'Caveat', sans-serif;
    /* font-family: 'Poppins', sans-serif; */
    /* font-family: 'Orbitron', sans-serif; */
  }

  a {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* background: lightgrey; */
  }

  .main-wrapper{
    display: flex;
  } 
</style>
