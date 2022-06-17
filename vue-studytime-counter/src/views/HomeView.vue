<template>
  <main>
    <HomeViewTitle />
    <CounterLine @sendData="sentData"/>
    <ProjectList :sentItem="sentItem"/>
  </main> 
</template>

<script>
  import CounterLine from '../components/icons/CounterLine.vue'
  import HomeViewTitle from '../components/icons/HomeViewTitle.vue'
  import ProjectList from '../components/icons/ProjectList.vue'

  export default {
    components: { 
      CounterLine,
      HomeViewTitle,
      ProjectList
    },
    data(){
      return {
        sentItem: null 
      }
    },
    methods: {
      sentData(data){
        this.sentItem = data;
      }
    }
  }  
</script>

<style scoped>
  
  * {
    font-family: 'Poppins';
  }

  main {
    width: 100%;
    height: calc( 100vh - 80px );

  }
</style>