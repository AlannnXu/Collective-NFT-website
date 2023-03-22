<template>
  <body>
    <div class="title1">
      <h4>
        How to Join
      </h4>
    </div>
    <div class="about">
      <div class="background">
        <img style="  width:1920px; height:2309px; overflow:hidden;" src="../assets/about.png" alt="">
      </div>
      <div class="link">
        <p style="color: #FFFFFF; font-size: 23px;">
				<button class="lowkeyButton" style="color: #FFFFFF;">
					<router-link to="/">
						Discord 
					</router-link>
				</button> | 				
				<button class="lowkeyButton" style="color: #FFFFFF;">
					<router-link to="/">
						Home 
					</router-link>
				</button> | 
				<button class="lowkeyButton" style="color: #FFFFFF;">
					<router-link to="/game">
						Auction 
					</router-link>
				</button> | 
				<button class="lowkeyButton" style="color: #FFFFFF;">
					<router-link to="/game">
						About Us 
					</router-link>
				</button>
			</p>
      </div>
      <div class="title2">
        <h4>
          Operation Interface
        </h4>
      </div>
      <div class="tutorial">
        <img style="max-width:90%;overflow:hidden;" src="../assets/tutorial.png" alt="">
      </div>
    </div>
  </body>
</template>

<script>
</script>
<style>

.link {
	margin-top: 0px;
	margin-left: -80px;
}
.title1 {
  position: absolute;
  top:15%;
  left:5%;
}
.background {
  margin-left: -110px;
  margin-top: -400px;
}
.title2 {
  position: absolute;
  top:250%;
  left:4%;
}

.tutorial {
  position: absolute;
  top:260%;
  left:-30px;
}
.credit {
	position: absolute;
  top:30%;
left:15%;

}
.accountBalanceGems {
	position: absolute;
  left:90%;
  top:0%;
  text-align:center;
}
.accountPlayerNum {
	position: absolute;
  right:90%;
  top:10%;
  text-align:center;
}
.payMessage {
  position: absolute;
  left:3%;
  top:0%;
  text-align:center;

}
.centered {
  margin:50px auto;
  text-align:center;
  position: absolute;
  top:80%;
left:50%;
transform: translate(-50%,-50%);
}

body {
  background-image: url("../assets/pureHead.jpg");
  background-size:cover;
  background-repeat:no-repeat;

}



</style>