<template>
  <div class="diskShelves-box">
      <div class="container diskShelves-contain">
          <div class="before-disk">
            <div class="diskShelves-item" >
              <div class="diskShelves-title h3">
                新碟上架
              </div>
            </div>
            <div class="diskShelves-centent">
              <div class="diskShelves-centent-item" v-for="item in beforeList" @click="onceDisk">
                <disk-item :item="item"></disk-item>
              </div>
            </div>
          </div>
          <div class="after-disk">
            <div class="diskShelves-item" >
              <div class="diskShelves-title h3">
                热门碟片
              </div>
            </div>
            <div class="diskShelves-centent">
              <div class="diskShelves-centent-item" v-for="item in afterList" @click="onceDisk">
                <disk-item :item="item"></disk-item>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import diskItem from './newdisk/disk-item'
export default {
  name:"diskShelves",
  data(){
      return {
          beforeList:[],
          afterList:[],
          page:1
      }
  },
  components:{
    diskItem
  },
  methods:{
      init(){
        this.$http.get("api/disk/new").then(result=>{
          this.beforeList = result.body;
        },err=>{
          console.log(err);
        })
      },
      getData(page){
          this.$http.get("api/disk/getPage?count="+page).then(result=>{
              this.afterList = result.body;
          },err=>{
              console.log(err);
          })
      },
      onceDisk(){
        this.$router.push("/detailedDisk");
      }

  },
  mounted(){
    this.init();
    this.getData(1);
  }
}

</script>

<style>
.diskShelves-box{
  position: relative;
  top:-20px;
  background:#F5F5F5;
  background: #F1F1F1;
}
.diskShelves-contain{
  padding-top:20px;
  border-left:1px #CBCBCB solid;
  border-right:1px #CBCBCB solid;
  background: white;
}
.diskShelves-title{
  padding:20px;
  border-bottom:3px #C20C0B solid;

}
.diskShelves-centent{
  padding-top:30px;
  display: flex;
  flex-flow: wrap;
  width:100%;
  padding-bottom:50px;
}
.diskShelves-centent-item{
  width:20%;
  cursor: pointer;
}


</style>
