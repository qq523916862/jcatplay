<template>
  <div>
      <span class="once-tool-play once-music-tool">
          <span class="glyphicon bsicon-play1" title="播放"> 播放</span><span class="glyphicon glyphicon-plus" title="添加到播放列表"></span>
      </span>
  <span class="once-music-tool once-tool-hold">
          <span class="glyphicon bsicon-hold" title="收藏"> 收藏</span>
    </span>
  <span class="once-music-tool once-tool-hold">
          <span class="glyphicon bsicon-message3" title="评论"> 评论({{count}})</span>
    </span>
  </div>
</template>

<script>
    export default {
        name: "play-tool",
        props:["count"],
        mounted(){
          console.log(this.count)
        }
    }
</script>

<style scoped>
  .once-tool-play{
    background: linear-gradient(to bottom,#5EA3E3 0%, #2E7ECB 50%,#1D6EBE 100%);
    color: white;
    border:1px solid #5FA8E3;
    box-shadow: 0px 0px 3px #5EA3E3;
  }
  .once-tool-play span{
    padding-left:10px;
    padding:7px;
    margin-top:-2px;
  }
  .once-tool-play span:first-child{
    border-right:1px solid #2a6da6;
    padding-right:5px;
    margin-bottom:1px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .once-tool-play span:last-child{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .once-tool-play span:hover{
    background:rgba(255,255,255,0.1);
  }
  .once-tool-hold{
    box-shadow:0px 0px 2px #E5E5E5;
    margin-left:10px;
    color: #000;
    background: linear-gradient(to bottom, #fafafa 0%, #e0e0e0 100%);
    border:1px #cbcbcb solid;
    padding:5px 7px;
  }
  .once-tool-hold:hover{
    background: rgba(103, 103, 103, 0.1);
  }
  .once-music-tool{
    display: inline-block;
    border-radius: 5px;
    font-size:13px;
    cursor: pointer;
  }
</style>
