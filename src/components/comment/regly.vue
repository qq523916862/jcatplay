<template>
  <div class="col-xs-12 comment-regly">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h5 class="panel-title">回复{{name}}:</h5>
      </div>
      <div class="panel-body text-right">
        <textarea name="newRegly" maxlength="140"></textarea>
        <button class="btn btn-info">发表</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "regly",
        props:["name"]
    }
</script>

<style scoped>

  .comment-regly{
    margin-top:10px;
  }
  .comment-regly::before{
    content: '';
    height:0px;
    width:0px;
    display: inline-block;
    border:7px solid transparent;
    border-bottom-color: #BCE8F1;
    position: absolute;
    right:20px;
    top:-13px;
  }
  .comment-regly textarea{
    width:100%;
    height:50px;
    resize: none;
  }
</style>
