<template>
    <div class="project-list-wrapper">
        <div class="project-list-item" v-for="project in dataArray.data" :key="project.id">
            <div class="project-list-item-spans">
                <span class="project-list-item-title">{{ project.project }}</span>
                <span>
                    <span v-if="project.sessionLength.hours < 10">0</span>{{ project.sessionLength.hours + " :"}}
                    <span v-if="project.sessionLength.minutes < 10">0</span>{{ project.sessionLength.minutes + " :"}}
                    <span v-if="project.sessionLength.seconds < 10">0</span>{{ project.sessionLength.seconds }} s
                </span>
            </div>
        
                <div v-if="project.id == this.clickedId"> 
                    <span v-if="hours < 10">0</span>{{ this.hours + " :"}}    
                    <span v-if="minutes < 10">0</span>{{ this.minutes + " :"}}    
                    <span v-if="seconds < 10">0</span>{{ this.seconds }} s    
                </div>
            
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
    beforeCreate(){
        axios.get('http://localhost:3000/projects').then((response) => {
            this.dataArray = response
        })
    }, 
    props: ['sentItem'],
    methods: {
        updateDataArray(){
            this.dataArray = []
            axios.get('http://localhost:3000/projects').then((response) => {
                this.dataArray = response
            })                      
        },
        startCount(){
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
        startCountOnProject(id, sessionLength ){
            if(this.isCounting === true){
                alert(" You're already working on a different project ")
            } else {
                this.hours = sessionLength.hours
                this.minutes = sessionLength.minutes
                this.seconds = sessionLength.seconds
                this.clickedId = id
                this.isCounting = true
                this.startCount()
            }
        },
        stopCountOnProject(id, sessionLength, date, project){
            this.clickedId = null
            this.isCounting = false
            this.stopCount()
            sessionLength = {
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds 
            }
            axios.put(`http://localhost:3000/projects/${id}`, {
                id: id,
                project:  project,
                sessionLength: sessionLength,
                date: date        
            })
            .then (
                this.updateDataArray
            )
        },
        deleteProject(id){
            axios.delete(`http://localhost:3000/projects/${id}`)
            .then(
                this.updateDataArray    
            )
        }
    },    
    watch: {
        sentItem: function(incomingPromise){
            if(incomingPromise != null){
                incomingPromise.then(
                    this.updateDataArray    
                )
            }
        }
    },
}
</script>

<style scoped>
    .project-list-wrapper {
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
        display: flex;
        justify-content: space-between;
    }
    .project-list-item-title {
        font-weight: 600;   
    }

    .project-list-item-buttons {
        display: flex;
        align-items: center;
    }

    .project-list-item-buttons button{
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