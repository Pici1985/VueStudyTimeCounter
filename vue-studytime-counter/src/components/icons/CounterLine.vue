<template>
    <article>
        <div class="counter-line">
        <div>
            <input type="text" placeholder="What are you working on?" v-model="title">
        </div>
        <div class="counter-wrapper">
            <div class="counter">
            <span>
                Current: 
            </span>
            <span class="count">
                <span v-if="this.hours < 10">0</span>{{ hours }} :
                <span v-if="this.minutes < 10">0</span>{{ minutes }} :
                <span v-if="this.seconds < 10">0</span>{{ seconds }}s
            </span>
            </div>
                <button v-if="!isCounting" style="background: green;" @click="startCounting()">Start</button>
                <button v-if="isCounting" style="background: red" @click="stopCounting(), $emit('sendData', this.dataSent)">Stop</button>
            </div>
        </div>
    </article>
</template>

<script>
import axios from 'axios'

export default {
    data(){
      return {
        isCounting: false,
        seconds: 0,
        minutes: 0,
        hours: 0,
        timer: null,
        title: null,
        count: {
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        listItem: null,
        date: null,
        id: null,
        dataArray: null,
        dataSent: null
      }
    },
    methods: {
      startCounting(){
        console.log("started count")
        if(this.title == null){
            alert(" Please tell us what you are working on! ")
        } else {
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
        }
      },       
      stopCounting(){
        this.isCounting = false
        clearInterval(this.timer);
        this.currentDate();
        this.createListItem();
        this.resetCounter();
        this.pushDataToDb();
      },
      resetCounter(){
          this.title = ""
          this.hours = 0
          this.minutes = 0
          this.seconds = 0
      },
      currentDate() {
            const current = new Date();
            const date = current.getDate()+'/'+( current.getMonth() + 1) +'/'+ current.getFullYear();
            this.date = date;
      },
      createListItem(){
          this.count.hours = this.hours
          this.count.minutes = this.minutes
          this.count.seconds = this.seconds
          this.id = Math.floor(Math.random() * 100000);
          this.listItem = {
              id: this.id,
              project: this.title,
              sessionLength: this.count,
              date: this.date
          }
      },
      pushDataToDb(){
        this.dataSent = 
        axios.post('http://localhost:3000/projects', {
            id: this.listItem.id,
            project: this.listItem.project,
            sessionLength: this.listItem.sessionLength,
            date: this.listItem.date,
        })         
      },
      sendData(){
        return this.dataSent;          
      }
    }
  }
</script>

<style>
    * {
        font-family: 'Poppins';
    }

    article {
        width: 100%;
    }

    h1 {
        text-align: left;
        margin-left: 10px;
    }

    .counter-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: auto;
        height: 70px;
        background: lightgrey;
        margin: 0 5px 0 5px;
        padding: 10px;
    }

    .counter-line input {
        height: 40px;
        width: 33vw;
        padding: 0 5px 0 5px;
        margin: 0;
        border: 0;
    }

    .counter-line button {
        font-weight: 900;
        height: 40px;
        width: 135px;
        border: 0px;
        border-radius: 4px;
    }

    .counter-wrapper {
        display: flex;
    }

    .counter {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 300px;
        margin: 0 10px;
    }

    .count{
        padding: 0px 10px;
        min-width: 100px;
        text-align: center;
    }
</style>