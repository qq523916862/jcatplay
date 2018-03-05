<template>
    <footer>
				<div class="footer-box">
					<ul class="footer-nav">
						<li class="footer-nav-item" v-for="item in list">
							<a href="#">{{item}}</a>
						</li>
					</ul>
					<div>
						版权所有：@1995-2017 | leungboasing
				</div>
				</div>
		</footer>
</template>

<script>

  export default {
      name:"myfoot",
      data(){
          return {list:["关于Jcar Player","客户服务","服务条款","意见反馈"]};
      }
  }

</script>

<style>
	footer{
		text-align: center;
		position: relative;
		z-index: 1;
	}
	footer .footer-box{
		padding-top:30px;
		padding-bottom:80px;
		background: #E8EAEB;
	}

</style>
