<template>
    <ul>
        <li v-for="(item,index) in song" class="list-item1" :class="{'list-active1':active===index}" @click="changeSong(index,item)">{{index+1}}. {{item.title}}-{{item.singer}}</li>
    </ul>
</template>

<script>
  export default {
      name:"listview",
      props:["song","lIndex"],
      data(){
          return {
              active:"",
              bus:this.$parent.bus
          };
      },
      methods:{
          changeSong(index,item){
              this.bus.$emit("changeSong");
              this.active = index;
              this.bus.$emit("changePlayer",item);
              if(this.lIndex!=3){
                  this.bus.$emit("addList",item);
              }
          }
      },
      created(){
          var dad = this;
          this.bus.$on("changeSong",function(){
                if(dad.lIndex!=dad.$parent.activeList){
                    dad.active="";
                }
          });
          this.bus.$on("btnTool",function(mode,lr){
                if(dad.$parent.activeList==dad.lIndex){
                    if(mode){
                        if(lr=="next"){
                            dad.active++;
                        }else if(lr=="prev"){
                            dad.active--;
                        }
                       if(dad.active==dad.song.length){
                            dad.active=0;
                       }else if(dad.active==-1){
                            dad.active = dad.song.length-1;
                       }
                    }else{
                        dad.active = Math.floor(Math.random()*dad.song.length);
                    }
                    dad.bus.$emit("changeSong");
                    dad.bus.$emit("changePlayer",dad.song[dad.active]);
                    if(dad.lIndex!=3){
                        dad.bus.$emit("addList",dad.song[dad.active]);
                    }
                }
          });
      }
  }
</script>

<style>
.list-item1{
   list-style-type:none;
   color:#AAAAAA;
   margin-left:-20px;
   overflow:hidden;
   text-overflow: ellipsis;
   white-space:pre;
}
.list-active1{
   color:white;
   list-style-image:url("/static/images/player/playing.png");
   margin-left:-40px;
}
</style>
