<template>
  <div class="page" id="foundMusic">
        <pagenav></pagenav>
        <router-view></router-view>
   </div>
</template>

<script>
    import Vue from 'vue'
    import pagenav from "./header/header"
    export default {
        name:"session",
        components:{
            pagenav
        },
        data(){
            return {bus:new Vue()}
        }
    }
</script>

<style>
    .page{
            position: relative;
            top: 50px;
            z-index: 1;
            min-height:100%;
        }
</style>
