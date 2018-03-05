<template>
    <div class="comment-box">
        <item-title :title="'评论专区'" :list="[]"></item-title>
        <div class="new-comment text-right">
            <div class="text-left">发表评论:</div>
            <textarea name="newComment" id="" maxlength="140"></textarea>
            <button class="btn btn-info">评论</button>
        </div>
        <div class="comment-list">
            <div class="wf-comment">
                <div class="comment-title">精彩评论</div>
                <div v-for="(item,index) in wlComment">
                    <comment-item :data="item"></comment-item>
                </div>
            </div>
            <div class="all-comment">
                <div class="comment-title">全部评论</div>
              <div v-for="(item,index) in allComment">
                <comment-item :data="item"></comment-item>
              </div>
            </div>
        </div>
      <div class=" text-center">
        <ul class="pagination pagination-sm">
          <li :class="{'disable':count==1}"><a href="#" aria-label="Previous" @click="prev($event)" ><span class="glyphicon glyphicon-arrow-left"></span></a></li>
          <li v-show="count-2>0"><a href="" @click="turnPage($event,count-2)">{{count-2}}</a></li>
          <li v-show="count-1>0"><a href="#" @click="turnPage($event,count-1)">{{count-1}}</a></li>
          <li class="active"><a href="#" @click="preventD($event)">{{count}}</a></li>
          <li v-show="count+1<=maxCount" @click="turnPage($event,count+1)"><a href="#">{{count+1}}</a></li>
          <li v-show="count+2<=maxCount" @click="turnPage($event,count+2)"><a href="#">{{count+2}}</a></li>
          <li :class="{'disable':count==maxCount}"><a href="#" aria-label="next" @click="next($event)"><span class="glyphicon glyphicon-arrow-right"></span></a></li>
        </ul>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import itemTitle from '../foundMusic-session/header/title'
    import commentItem from './comment-item'
    export default {
        name: "comment",
        components:{
          itemTitle,
          commentItem
        },
        data(){
          return {
            wlComment:[
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:{anthor:"ngwingah",content:"呵呵哈哈哈"},
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk2.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk3.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk4.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              }
            ],
            allComment:[
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk2.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk3.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk4.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk2.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk3.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk4.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk2.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk3.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk4.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk2.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk3.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk4.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk2.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk3.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk4.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk2.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk3.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/disk4.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              },
              {
                anthor:"leungboasing",
                content:"号犀利啊",
                reply:[],
                pic:"/static/images/index/user.jpg",
                zan:10
              }
            ],
            bus:new Vue(),
            replyOpen:null,
            count:2,
            now:1,
            maxCount:10
          }
        },
        mounted(){
        }
    }
</script>

<style scoped>
.comment-box{
  padding-top:20px;
  margin-top:15px;
  margin-bottom: 50px;
  position: relative;
}
.comment-list{
  position: relative;
  top: 20px;
}
.new-comment{
  margin-top:20px;
  background: #eeecfe;
  padding:10px;
  border-radius: 3px;
  box-shadow: 0px 0px 5px #e4e4e4;
  border: 1px solid #D3D3D3;
}
.new-comment div{
  font-size: 15px;
  font-family: STKAITI;
  font-weight: bold;
}
.new-comment textarea{
  resize: none;
  width:100%;
  height:80px;
}
.comment-title{
  padding-bottom: 5px;
}

.all-comment{
  margin-top:50px;
}
</style>
