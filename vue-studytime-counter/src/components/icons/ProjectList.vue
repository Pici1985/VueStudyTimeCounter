<template>
    <div class="project-list-wrapper">
        <div class="project-list-item" v-for="project in dataArray.data" :key="project.id">
            <div class="project-list-item-spans">
                <!-- <span>Date: {{ project.date }}</span> -->
                <span>{{ project.project }}</span>
                <span>{{ project.sessionLength }}s</span>
                <!-- <span>{{ project.id }}</span> -->
            </div>
                <span v-if="project.id == this.clickedId">  {{ hours }}:{{ minutes }}:{{ seconds }}s </span>
            <div class="project-list-item-buttons">
                <button
                    v-if="project.id != this.clickedId" 
                    style="background: green"
                    @click="startCountOnProject(project.id, project.sessionLength, project.date, project.project)"
                    >
                    <img src="../../assets/play-solid.svg" alt="">
                </button>
                <button
                    v-if="project.id == this.clickedId"
                    style="background: red" 
                    @click="stopCountOnProject(project.id, project.sessionLength, project.date, project.project)"
                    >
                    <img src="../../assets/stop-solid.svg" alt="">                    
                </button>
                <!-- <button>
                    <img src="../../assets/pen-to-square-solid.svg" alt="">                    
                </button> -->
                <button
                    style="background: orange" 
                    @click="deleteProject(project.id, project.sessionLength)"
                    >
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
            dataArray: [],
            clickedId: null,
            isCounting: false,
            hours: 0,
            minutes: 0,
            seconds: 0,
            timer: null
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
            console.log('updated')
            this.dataArray = []
            axios.get('http://localhost:3000/projects').then((response) => {
                this.dataArray = response
            })                      
        },
        startCount(){
            console.log("started local count")
            this.isCounting = true
            this.timer = setInterval(() => {
                this.seconds++;
                if( this.seconds > 59 ){
                this.seconds = 0;
                this.minutes += 1;
                }
                if( this.minutes > 59 ){
                this.minutes = 0;
                this.hours += 1;
                }            
            }, 1000)
        },
        stopCount(){
            this.isCounting = false
            clearInterval(this.timer);
        },
        // innen folytatjuk :)
        startCountOnProject(id){
            if(this.isCounting === true){
                alert(" You're already working on a different project ")
            } else {
                this.clickedId = id
                this.isCounting = true
                this.startCount()
            }
        },
        stopCountOnProject(id, sessionLength, date, project){
            this.clickedId = null
            this.isCounting = false
            this.stopCount()
            sessionLength = `${this.hours}:${this.minutes}:${this.seconds}`
            axios.put(`http://localhost:3000/projects/${id}`, {
                id: id,
                project:  project,
                sessionLength: sessionLength,
                date: date        
            },
                setTimeout ( 
                    this.updateDataArray, 500
                )
            )
        },
        deleteProject(id, sessionLength){
            console.log(id, sessionLength)
        }
    },    
    watch: {
        sentItem: function(){
            console.log(this.sentItem)
            setTimeout(
                this.updateDataArray, 500 
            )
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