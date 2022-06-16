<template>
    <div class="sidebar-main">
        <div v-if="isOpen" class="sidebar-wrapper-open">
            <div class="sidebar-container">
                <RouterLink to="/">
                    <div class="sidebar-item">
                        <img src="../../assets/clock-solid.svg" alt="">
                        <span>Counter</span>
                    </div>
                </RouterLink>
                <RouterLink to="/projects">
                    <div class="sidebar-item">
                        <img src="../../assets/clipboard-solid.svg" alt="">
                        <span>Projects</span>
                    </div>
                </RouterLink>
                <RouterLink to="/calendar">
                    <div class="sidebar-item">
                        <img src="../../assets/calendar-days-solid.svg" alt="">
                        <span>Calendar</span>
                    </div>
                </RouterLink>
            </div>
        </div>
        <div v-if="!isOpen" class="sidebar-wrapper-closed">
            <div class="sidebar-container">
                <RouterLink to="/">
                    <div class="sidebar-item">
                        <img src="../../assets/clock-solid.svg" alt="">
                    </div>
                </RouterLink>
                <RouterLink to="/projects">
                <div class="sidebar-item">
                    <img src="../../assets/clipboard-solid.svg" alt="">
                </div>
                </RouterLink>
                <RouterLink to="/calendar">
                <div class="sidebar-item">
                    <img src="../../assets/calendar-days-solid.svg" alt="">
                </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isOpen: false
        }
    },
    methods: {
        open(){
            this.isOpen = true;
        },
        close(){
            this.isOpen = false;
        }
    }

}
</script>

<style scoped>
    .sidebar-wrapper-open {
        display: grid;
        width: 150px;
        height: 100%;
        background: lightgrey;
        justify-content: left;
        padding-left: 20px;
    }

    .sidebar-wrapper-closed {
        display: grid;
        width: 70px;
        height: 100%;
        background: lightgrey;
        text-align: center;  
    }

    .sidebar-container a {
        text-decoration: none;
        color: black;
        font-size: 18px;
    }

    .sidebar-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }

    .sidebar-item:hover {
        box-shadow: 0px 10px 10px -10px black;
    }

    .sidebar-item img{
        height: auto;
        width: 30px;
    }

    .sidebar-item span{
        height: auto;
        width: 90px;
        margin-left: 15px;
    }
</style>