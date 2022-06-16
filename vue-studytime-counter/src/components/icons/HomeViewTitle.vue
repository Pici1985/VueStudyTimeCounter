<template>
    <div class="title-line">
      <h1>Today's Projects: <span> {{ currentDate() }} </span></h1>
      <!-- <h2> {{ $store.state.dataFromMutations }} </h2> -->
    </div>
</template>

<script>

export default {
    data(){
        return {
            today: "anyad"
        }
    },
    methods: {
        currentDate() {
            const current = new Date();
            const date = current.getDate()+'/'+( current.getMonth() + 1) +'/'+ current.getFullYear();
            // console.log($store.state.storedata)
            return date;
        }
    }
}
</script>

<style scoped>
    .title-line {
        margin: 10px 0px 0 0px;
    }

    .title-line h1 {
        margin-right: 10px;
        font-weight: 900;
        font-family: 'Poppins';
        text-align: center;
        margin: 0px auto 10px;
        width: 40vw;
        background: lightgrey;
        padding: 10px;
    }

    .title-line span {
        font-family: 'Caveat', sans-serif;
        font-size: 40px;
        font-weight: 700;   
    }
</style>