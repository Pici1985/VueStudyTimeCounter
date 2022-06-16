<template>
    <div class="project-list-wrapper">
        <div class="project-list-item" v-for="project in dataArray.data" :key="project.id">
            <div class="project-list-item-spans">
                <!-- <span>Date: {{ project.date }}</span> -->
                <span>{{ project.project }}</span>
                <span>{{ project.sessionLength }}s</span>
            </div>
            <div class="project-list-item-buttons">
                <button>
                    <img src="../../assets/play-solid.svg" alt="">
                </button>
                <button>
                    <img src="../../assets/stop-solid.svg" alt="">                    
                </button>
                <button>
                    <img src="../../assets/pen-to-square-solid.svg" alt="">                    
                </button>
                <button>
                    <img src="../../assets/trash-solid.svg" alt="">                    
                </button>                
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            dataArray: []
        }
    },
    // ha ez a hook itt hivodik le akkor a dataArraynek at kell csapatni a projectlist komponensbe 
    beforeCreate(){
        axios.get('http://localhost:3000/projects').then((response) => {
            this.dataArray = response
        })
    }, 
    props: ['sentItem'],
    methods: {
        updateDataArray(){
            console.log('update')
            this.dataArray = []
            axios.get('http://localhost:3000/projects').then((response) => {
                this.dataArray = response
            })                      
        }
    },
    watch: {
        sentItem: function(){
           this.updateDataArray();
        }
    },
}
</script>

<style scoped>
    .project-list-wrapper {
        /* border: 1px solid red; */
        margin: 5px 5px 0 5px;
    }
    .project-list-item {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0px;
        padding: 0 10px;
    }

    .project-list-item:nth-child(even){
        background: lightgrey;
    }

    .project-list-item-spans {
        width: 33vw;
        /* border: 1px solid green; */
        display: flex;
        justify-content: space-between;
    }
    .project-list-item-spans span:first-child {
        font-weight: 600;   
    }

    .project-list-item-buttons {
        display: flex;
        align-items: center;
    }

    .project-list-item-buttons button{
        /* border: none; */
        margin: 1px;
        background: white;
        border-radius: 4px;
    }

    .project-list-item-buttons button img {
        height: 20px;
        display: flex;
        align-items: center;
        padding: 2px;
    }
</style>