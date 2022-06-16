<template>
    <header>        
        <nav>
            <div class="brand-logo-container">
                <div class="brand-logo" @click="this.$emit('openSidebar'), changeIcon()">
                    <img v-if="isOpen" src="../../assets/hamburger-menu.svg" alt="">
                    <img v-if="!isOpen" src="../../assets/close.svg" alt="">
                </div>
                <h1>Study-time Counter</h1> 
            </div>
            <div class="nav-buttons">
                <RouterLink to="/">
                    <div class="nav-item">
                        <img src="../../assets/clock-solid.svg" alt="">
                        <span> Counter </span>
                    </div>
                </RouterLink>
                <RouterLink to="/projects">
                    <div class="nav-item">
                        <img src="../../assets/clipboard-solid.svg" alt="">
                        <span>
                            Projects        
                        </span>    
                    </div>
                </RouterLink>
                <RouterLink to="/calendar">
                    <div class="nav-item">
                        <img src="../../assets/calendar-days-solid.svg" alt="">
                        <span>
                            Calendar
                        </span>
                    </div>
                </RouterLink>
            </div>
        </nav>        
    </header>
</template>

<script>
export default {
    data(){
        return {
            isOpen: true   
        }
    },
    methods: {
        changeIcon(){
            // console.log("changeIcon");
            this.isOpen ? this.isOpen = false : this.isOpen = true
        }
    }
}
</script>

<style scoped>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: grey;
        padding: 10px 0;
        height: 60px;
    }

    .nav-buttons {
        display: flex;
    }

    .nav-item {
        display: flex;
        align-self: center;
        justify-content: space-evenly;
        background: lightgrey;
        padding: 5px 10px;
        border-radius: 4px;
    }

    .nav-item:hover {
        background: white;
        box-shadow: 0px 10px 10px -10px black;
    }

    .brand-logo-container{
        display: flex;
        align-items: center;
    }

    .brand-logo-container h1{
        margin: 0 20px;
        font-size: 2.5rem;
    }

    .brand-logo a{
        display: flex;
        align-items: center;
    }

    .brand-logo img {
        height: 40px;
        width: 40px;
        margin-left: 20px;
    }

    .brand-logo img:hover {
        box-shadow: 0px 10px 10px -10px black;        
    }

    a{
        margin: 0px 10px;
        text-decoration: none;
        font-size: 20px;
        color: black;

    }

    a img{
        height: 30px;
        width: 30px;
    }

    a span {
        font-size: 18px;
        margin-left: 5px;
    }
</style>