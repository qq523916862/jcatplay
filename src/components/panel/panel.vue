<template>
      <div class="tab-panel" :class="{'tab-panel-active':active}">
          <ul class="list" >
              <li v-for="(item,index) in list" class="list-item" :class="{'list-active':index==activeList}" @click="changeList(index)" >{{item}}
                  <listview v-show="index==activeList" :song="songlist[index]" :lIndex="index"></listview>
              </li>
          </ul>
      </div>
</template>

<script>

    import Vue from 'vue'
    import listview from './listview'

    export default{
        name:"panel",
        components:{
            listview
        },
        data(){
            return {
                active:false,
                list:["当前播放","我喜欢的音乐","我的歌单","最近播放"],
                activeList:0,
                songlist:[
                      [{title:"你好毒",singer:"张学友",src:"张学友 - 你好毒.mp3"},
                       {title:"再度重遇你",singer:"张学友",src:"张学友 - 再度重遇你.mp3"},
                       {title:"夕阳醉了",singer:"张学友",src:"张学友 - 夕阳醉了.mp3"},
                       {title:"爱得比你深",singer:"张学友",src:"张学友 - 爱得比你深.mp3"},
                       {title:"秋意浓",singer:"张学友",src:"张学友 - 秋意浓.mp3"},
                       {title:"蜚蜚",singer:"陈僖仪",src:"陈僖仪 - 蜚蜚.mp3"},
                       {title:"爱情废材",singer:"陶心瑶",src:"陶心瑶 - 爱情废柴 (女声Cover周杰伦).mp3"}
                     ],
                    [{title:"命硬",singer:"侧田",src:"侧田 - 命硬.mp3"},
                     {title:"虹之间",singer:"金贵晟",src:"金贵晟 - 虹之间.mp3"}],
                    [{title:"暴风女神",singer:"谭咏麟",src:"谭咏麟 - 暴风女神lorelei.mp3"},
                     {title:"你瞒我瞒",singer:"陈柏宇",src:"陈柏宇 - 你瞒我瞒(2).mp3"},
                     {title:"落花流水",singer:"陈奕迅",src:"陈奕迅 - 落花流水.mp3"},
                     {title:"开心的马骝",singer:"刘德华",src:"刘德华 - 开心的马骝.mp3"}],
                    []
                ],
                listIndex:0,
                itemIndex:0,
                bus:this.$parent.bus
            };
        },
        methods:{
            changeList(index){
                this.activeList = index;
                this.bus.$emit("setList",(this.songlist[index]));
            }
        },
        watch:{


        },
        created(){
            var dad = this;
            this.bus.$on("panelOpen",function(){
                dad.active = !dad.active;
            });
            this.bus.$on("addList",function(item){
                if(dad.songlist[3].indexOf(item)==-1){
                    dad.songlist[3].unshift(item);
                }else{
                    var index =  dad.songlist[3].indexOf(item);
                    for(var i = index; i > 0 ; i--){
                        dad.$set(dad.songlist[3],i,dad.songlist[3][i-1]);
                    }
                    dad.$set(dad.songlist[3],0,item);
                }
            });
        }
    }

</script>

<style>
  .tab-panel{
      position:fixed;
      left:-210px;
      width:200px;
      top:50px;
      bottom:50px;
      padding-bottom:50px;
      background:#191919;
      z-index:3;
      transition:all .8s ease 0s;
  }
  .tab-panel-active{
      left:0px;
  }
  .list{
      color:#AAAAAA;
  }
  .list-item{
    list-style-type:none;
    margin-left:-40px;
    padding:3px 10px;
    background:#090909;
    cursor:pointer;
    border:1px transparent solid;
    border-top-color:#242424;
    transition:all 1s linear 0s;
  }
  .list-item:last-child{
    border-bottom-color:#242424;
  }
  .list-active{
    list-style-type:disc;
    list-style-position:inside;
    color:white;
  }
</style>
