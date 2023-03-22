<template>
<body>
	<div>
		<div class="firstPage">
			<img style="max-width:100%;overflow:hidden; box-shadow: 0px 30px 25px grey;" width="4100" height="900" src="../assets/background.jpg" alt="">
		</div>
		<div class="container">
			<div class="content">
				<div class="link">
					<p style="color: #FFFFFF; font-size: 23px;">
				<button class="lowkeyButton" style="color: #FFFFFF;">
					<router-link to="/about">
						Discord 
					</router-link>
				</button> | 				
				<button class="lowkeyButton" style="color: #FFFFFF;">
					<router-link to="/about">
						How to Paint 
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
				<div class="slogen" v-if="!connected">
					<h5>
						<p>Slogan: The first web 3.0 co-painting project which you can compete with others.</p>
						However, a great artwork is the basis of everything!
					</h5>
				</div>
				<div class="connect">
					<button class="BigRedButton" v-if="!connected" @click="connectWallet">Connect Wallet</button>
				</div>	

				<div class="pixelPick" v-if="connected">
					<h7 class="account_title" v-if="connected">Your Account</h7>
					<hr style="width: 855px; border-color: #3F3E3E; position: absolute; left: 39.75px; top: 60px;">
					<div class="container2">
						<p class="color_cube" v-if="connected" :style="{'width':'600px', 'height':'100px', 'overflow-x':'auto', 'display': 'flex', 'justify-content': 'center'}">
							<span v-for="n in own_coordinates.length" :key="n" style="margin-right: 23px;">
								<button :style="{'width':'86px', 'height':'80px', 'background-color': own_colors[n - 1]}" @click="chooseExchangeColor">{{ own_coordinates[n - 1] }}</button>
							</span>
						</p>
					</div>
					<h7 class="paint_mes_2" v-if="connected && (paint_right == 2)"><p id="pixel_to_paint" :style="{'width': '300px','height': '30px', 'background-color': paint_color, 'color': '#121212', 'font-family': 'Arial', 'font-size': '18px', 'width': '286px', 'height': '48.5px'}" >you have a pixel to paint</p></h7>
					<h7 class="paint_mes_0" v-if="connected && (paint_right == 0) && (own_colors == [])">You haven't enter our project!</h7>
					<h7 class="paint_mes_3" v-if="connected && (paint_right == 3)" style="color: #FF0000; font-size: 18px; font-family: Arial; line-height: 1.2; width: 337px; height: 56px;">Please transfer color to others, in order to gain a new undefined pixel!</h7>
					<p class="divide_btn"><button class="greenButtons" v-if="connected && can_divide" @click="divideForFinal">Divide</button></p>
					<p class="divide_btn"><button class="greyButtons" v-if="connected && !can_divide">Divide</button></p>
				</div>
							
				<div class="shade" v-if="!connected || (paint_right == 0)"></div>

				<div class="lock" v-if="(!connected) || (paint_right == 0)">
					<img  style="max-width:100%;overflow:hidden;" width="300"  src="../assets/lock.png" alt="">
					
				</div>
				<div class="fake_canvas" v-if="(!connected) || (paint_right == 0)">
					<ColorCanvas :colors="colors" :paint="paint" style="opacity: 0.2; margin-top: 950px; transform: scale(1.5);"/>
				</div>
				<div class="canvas" v-if="connected && (paint_right != 0)" >

					<ColorCanvas :colors="colors" :paint="paint" @select="select" />
					<div id="app">
						<div class="axis x-axis">
							<span v-for="n in 60" :style="{'color': (n === col_clicked ? 'black' : 'white')}">{{ n }} </span>
						</div>
						<div class="axis y-axis">
							<span v-for="n in 30" :style="{'color': (n === (31 - row_clicked) ? 'black' : 'white')}">{{ n }} </span>
						</div>
					</div>
				</div>
				<div class="pixelOption" v-if="connected && (paint_right != 0)">
					<div class="exchange">
						<h7><button class="color1" :style="{'width':'100px', 'height':'41px', 'background-color': '#E3E3E3', 'border-color': '#9D9D9D', 'border-width': '3px', 'border-style': 'solid', 'text-align': 'center', 'display': 'flex', 'align-items': 'center', 'font-size': '16px'}" @click="throwAwayColor1">{{ first_exchange_color }}</button></h7>
						<img class="exchange_sign" style="max-width:100%;overflow:hidden;" width="35" src="../assets/exchange.png" alt="">
						<h7><button class="color2" :style="{'width':'100px', 'height':'41px', 'background-color': '#E3E3E3', 'border-color': '#9D9D9D', 'border-width': '3px', 'border-style': 'solid', 'text-align': 'center', 'display': 'flex', 'align-items': 'center', 'font-size': '16px'}" @click="throwAwayColor2">{{ second_exchange_color }}</button></h7>
						<p class="exchange1"><button class="greyButtons" v-if="first_exchange != 2" style="width: 211px; height: 38px; display: flex; align-items: center; text-align: center; justify-content: center;">Exchange Color</button></p>
						<p class="exchange1"><button class="greenButtons" v-if="first_exchange == 2" style="width: 211px; height: 38px; display: flex; align-items: center; text-align: center; justify-content: center;" @click="exchangeColor">Exchange Color</button></p>
						<h7 ><input class="address" id="addr" type="text" name="fname" placeholder="    Address name" style="width: 305px;height: 41px; "/></h7>
						<p class="transfer"><button class="greenButtons" v-if="paint_right == 3" style="width: 211px; height: 38px; display: flex; align-items: center; text-align: center; justify-content: center;" @click="transferColor">Transfer Color</button></p>
						<p class="transfer"><button class="greyButtons" v-if="paint_right != 3" style="width: 211px; height: 38px; display: flex; align-items: center; text-align: center; justify-content: center;">Transfer Color</button></p>
						<h7 class="color3" v-if="have_click_canvas">({{col_clicked}}.{{31 - row_clicked}})</h7>
						<h7 class="color3" v-if="!have_click_canvas"></h7>
						<p class="paint"><button class="greenButtons" style="width: 124px; height: 38px;" v-if="paint_right == 2" @click="PaintColor">Paint</button></p>
						<p class="paint"><button class="greyButtons" style="width: 124px; height: 38px;" v-if="paint_right != 2">Paint</button></p>
						<h6 class="min_final" style="border-radius: 10px;">mint final</h6>
						<p class="vote_btn"><button class="greenButtons" style="width: 124px; height: 38px;" v-if="can_vote" @click="VoteForFinal">Vote</button></p>
						<p class="vote_btn"><button class="greyButtons" style="width: 124px; height: 38px;" v-if="!can_vote">Vote</button></p>
					</div>
				</div>
				<div class="questions">
					<div class="what"><img style="max-width:100%;overflow:hidden;" width="350" src="../assets/what.png" alt=""></div>
					<div class="And"><img style="max-width:100%;overflow:hidden;" width="350" src="../assets/And.png" alt=""></div>
					<div class="how"><img style="max-width:100%;overflow:hidden;" width="350" src="../assets/how.png" alt=""></div>
					<div class="whatText">
						<h5>What is the "painting together or not" ?</h5>
						<h6>It is a Web 3.0 co-painting project. The data of each operation from you will be recorded on the blockchain. In the stage 1, we will random 2 person to have the right of painting and transferring. And then, the people who are transferred by them will have the same right. In the stage 2, the transfer function will be closed. The rest of blank pixels will be public minted and their colors base on the proportion of stage 1 color. Owner can determine whether use the color or not. In the stage 3, the whole artwork will be sale on the Opensea. 
							In addition, co-operation is not your only choice,  you can ignore the collective goal to pursue your own benefit. Noticeably, a good artwork is the basis of whatever your own or group's benefits. </h6>
					</div>
					<div class="andText">
						<h5>How to paint ?  <router-link to="/about">Read More </router-link></h5>
						<h6>When you are transferred a color by some one(any one can be only transferred once), it means that you join this project.
							You will receive a color from someone and an undefined coordinate from smart contract. In this step, you can choose any blank pixel to paint. After that, the undefined coordinate will fix. You need transfer your current color to others to gain a new undefined coordinate, otherwise you aren't allowed to paint anymore. Additionally, when you transfer your current color, the smart contract will airdrop you a new color (the degree of saturation of current color - 20%). If the number of the pixels that you have is more than two, you can exchange the color of them. </h6>
					</div>
					<div class="howText">
						<h5>How to gain benefits</h5>
						<h6>When you paint a pixel, you will gain a fixed pixel (including color and coordinate) which you can sell on the opensea and no one can paint the same position again. It means that each coordinate is unique and their value has a strong relationship with their position.
							When you transfer the color, the rarity of the color will decrease, the pixel that you paint with this color is likely to come down. 
							You can sell your own fixed pixel (not color) on the second market whenever you want. 
							The final artwork will be also sale on the Opensea and the number of pixels that you have will determine you dividend.</h6>
					</div>
				</div>
				<div class="stage">
					<img style="max-width:88%;overflow:hidden;" width="2000" src="../assets/stage.jpg" alt="">
				</div>

				<div class="author">
					<div class="container_author" v-for="author in authors" :key="author.name">
						<img :src="author.avatar" alt="Avatar" />
						<h3>{{ author.name }}</h3>
						<p>{{ author.bio }}</p>
					</div>
				</div>				
				<!-- <div class="author">
					<div class="author1">
						<div class="pic1"></div>
						<div class="description1"><h6>NAME
							<p>Hong Kong of Chinese University</p>
							Artist </h6></div>
						
					</div>
					<div class="author2">
						<div class="pic2"></div>
						<div class="description2"><h6>NAME
							<p>Hong Kong of Chinese University</p>
							Artist </h6></div>
						
					</div>
					<div class="author3">
						<div class="pic3"></div>
						<div class="description3"><h6>NAME
							<p>Hong Kong of Chinese University</p>
							Artist </h6></div>
						
					</div>
				</div> -->

				<div class="end">
					<h6><p>Human-Cloud Systems Laboratory, The Chinses University of Hong Kong, Shenzhen</p>
					<p>E-mail: xxxxxxxxxxxxxx</p>
					<p>Tel:xxxxxxxxxxxx</p>
					xxxxxxxxxxxx</h6>
				</div>
			</div>
		</div>
	</div>
</body>

</template>

<script>
import { placeholder } from '@babel/types';
import Web3 from 'web3'
import ColorCanvas from "./../components/ColorCanvas.vue";

export default {
  name: 'Home',
  components: {ColorCanvas},
  data() {
    return {
		// registerTime: 0,
		first_exchange: 0,
		first_exchange_color: " ",
		second_exchange_color: " ",
		connected: false,
		paint_right: 0,
		contractResult: '0',
		tokenid: '0', 
		exchange_color_1: 0,
		exchange_color_2: 0,
		row_clicked: 0,
		col_clicked: 0,
		clicked: 1900,
		status: '',
		colors: [],
		authors: [
			{
			name: "Author 1",
			avatar: "https://via.placeholder.com/150",
			bio: "This is a short bio for Author 1."
			},
			{
			name: "Author 2",
			avatar: "https://via.placeholder.com/150",
			bio: "This is a short bio for Author 2."
			},
			{
			name: "Author 3",
			avatar: "https://via.placeholder.com/150",
			bio: "This is a short bio for Author 3."
			},
			{
			name: "Author 4",
			avatar: "https://via.placeholder.com/150",
			bio: "This is a short bio for Author 4."
			}
      	],
		prepared_colors: [
			"#d24430",
			"#da6959",
			"#e58c84",
			"#ebb4ad",
			"#f5d9d6",
			"#4574e6",
			"#688fea",
			"#8da9f2",
			"#b3c3f4",
			"#d4ddfa",
			],
		paint: {},
		own_colors: [],
		own_coordinates: [],
		paint_color: "0",
		can_vote: false,
		can_divide: false,
		friend_addr: " ",
		have_click_canvas: false,
    }
  },



  methods: {
	select(payload){
		this.have_click_canvas = true;
		this.col_clicked = payload.col_index
		this.row_clicked = payload.row_index
		this.status = payload.status

		if (this.colors[(this.row_clicked - 1) * 60 + this.col_clicked - 1].localeCompare("#ffffff") == 0) {

			if (this.clicked != 1900) {
				this.colors[this.clicked] = "#ffffff";
				// this.paint = {color: "#ffffff", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
			}
			this.clicked = (this.row_clicked - 1) * 60 + this.col_clicked - 1;
			this.colors[this.clicked] = "#9E9E9E";
			// this.paint = {color: "#9E9E9E", row_index: this.row_clicked - 1, col_index: this.col_clicked - 1};
			
		}
	},
	set_color(color, row_index, col_index, status){
		if (status == 'available'){
			this.paint = {color, row_index, col_index}
		}
	},


    async connectWallet() {
		this.own_colors = [];
		this.own_coordinates = [];
      	let ethereum = window.ethereum;
      	if (ethereum) {
      	ethereum.request({ method: 'eth_requestAccounts' })
			.then((res) => {
					this.connected = true;
				console.log("当前钱包地址:" + res[0]);
				
				});

      	}
		let web3 = new Web3(window.ethereum);
		let contractAddress_painting = '0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A';
		let abi_painting = JSON.parse(`[
	{
		"inputs": [],
		"name": "approve_market",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeuri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividefinalart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId_first",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId_second",
				"type": "uint256"
			}
		],
		"name": "exchange_color",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalSVG",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "startpaint",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "color_state",
				"type": "uint256"
			}
		],
		"name": "initial_paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "market_",
				"type": "address"
			}
		],
		"name": "marketaddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint_uri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newpainter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpaint_right_",
				"type": "uint256"
			}
		],
		"name": "newpainter_condition",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "x",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "y",
				"type": "uint32"
			}
		],
		"name": "paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "painter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paint_right_",
				"type": "uint256"
			}
		],
		"name": "painter_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "coordinate_",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_blue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_red",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "token_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "token_uri",
				"type": "string"
			}
		],
		"name": "position_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "mes",
				"type": "string"
			}
		],
		"name": "print",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "sellbenefit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newpainter",
				"type": "address"
			}
		],
		"name": "transfer_painter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "votetomintfinal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "bluecolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chang_url",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_final_url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkapprove",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkcontractbalance",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checkCoodinatexy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkdividen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checklength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkmarketopen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checknftdividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkowner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkownerfirst",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkpositiondown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checksvg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checktokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkuri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "checkvote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkvoteresult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "color_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dividen_record",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "exchange_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mintsale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "first_vote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcolor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcoordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initial_painter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "market",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract NFT",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "own_nft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "position_done",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recentdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "redcolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkright",
				"type": "address"
			}
		],
		"name": "right",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subcontract_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "svg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "upload",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url_string",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "visualization",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vote_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`);
		
		let contractAddress_market = '0xff454A4eD8AC80F97F044422D8E1606d6Bb3441C';
		let abi_market = JSON.parse(`[
	{
		"inputs": [],
		"name": "benefit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyItem",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cancelListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "NotApprovedForMarketplace",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PriceMustBeAboveZero",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "PriceNotMet",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "history",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "copaint_Address",
				"type": "address"
			}
		],
		"name": "set_mainaddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftcontract_Address",
				"type": "address"
			}
		],
		"name": "set_nftAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "upload_price",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_approve_market",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkdividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkpreseller",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkprice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkrecentseller",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkstate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "earn",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mainAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "num_sell",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recent_price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recent_seller",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "state_sale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`);
		
      	let contract = new web3.eth.Contract(abi_painting, contractAddress_painting);

		let contract_market = new web3.eth.Contract(abi_market, contractAddress_market);

      	var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
		
		//   contract.methods.register().send({from: player_addr});
		const color_convert = new Map();
		color_convert.set("R100","#d24430");
		color_convert.set("R80","#da6959");
		color_convert.set("R60","#e58c84");
		color_convert.set("R40","#ebb4ad");
		color_convert.set("R20","#f5d9d6");
		color_convert.set("B100","#4574e6");
		color_convert.set("B80","#688fea");
		color_convert.set("B60","#8da9f2");
		color_convert.set("B40","#b3c3f4");
		color_convert.set("B20","#d4ddfa");
		for (var i = 0; i < 60; i++) {
			for (var j = 0; j < 30; j++) {
				this.colors.push("#ffffff");
			}
		}
		let result = await contract.methods.right(player_addr).call();
		this.paint_right = result;
		console.log("paint_right: ", this.paint_right);
		if (this.paint_right == 2) {
			result = await contract.methods.redcolor(player_addr).call();
			if (result != 0) {
				this.paint_color = color_convert.get("R" + result.toString());
			} else {
				result = await contract.methods.bluecolor(player_addr).call();
				this.paint_color = color_convert.get("B" + result.toString());
			}
			console.log("paint_color: ", this.paint_color);

		}
		result = await contract_market.methods.checkdividen().call();
		this.can_divide = result;
		console.log("can_divide: ", this.can_divide);
		result = await contract.methods.checkownerfirst().call();
		this.tokenid = result;
		console.log("tokenid: ", this.tokenid);
		result = await contract.methods.checkdividen().call();
		if (result >= 2) {   //1279
			this.can_vote = true;
			console.log("can_vote: ", this.can_vote);
		}
		for (var i = 2; i <= this.tokenid; i++) {
			console.log("tokenid in the loop: ", this.tokenid);
			result = await contract.methods.checkowner(i).call();
			console.log("owner: ", result);
			console.log("player_address: ", player_addr);
			let result_color = await contract.methods.getcolor(i).call();
			let result_coor = await contract.methods.getcoordinate(i).call();
			let mes = result_coor.split('_');			
			if (result_color.substr(2, 1).localeCompare("1") == 0) {
				this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] = (color_convert.get(result_color.substr(1, 4))); // R100 B100
			} else {
				this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] = (color_convert.get(result_color.substr(1, 3)));
			}
			console.log("colors: ",this.colors);
					
			if (result.toLowerCase().localeCompare(player_addr) == 0) {
				console.log("sds:",result);
				console.log("sse:",player_addr);
				if (result_color.substr(2, 1).localeCompare("1") == 0) {
					this.own_colors.push(color_convert.get(result_color.substr(1, 4))); // R100 B100
				} else {
					this.own_colors.push(color_convert.get(result_color.substr(1, 3)));
				}
				console.log("own_colors: ",this.own_colors);
				result = "(" + mes[0] + "." + mes[1] + ")";
				this.own_coordinates.push(result);
				console.log("own_coordinates: ", this.own_coordinates);	
			}

		}

    },
	async exchangeColor() {
		const color_convert = new Map();
		color_convert.set("R100","#d24430");
		color_convert.set("R80","#da6959");
		color_convert.set("R60","#e58c84");
		color_convert.set("R40","#ebb4ad");
		color_convert.set("R20","#f5d9d6");
		color_convert.set("B100","#4574e6");
		color_convert.set("B80","#688fea");
		color_convert.set("B60","#8da9f2");
		color_convert.set("B40","#b3c3f4");
		color_convert.set("B20","#d4ddfa");		
		let web3 = new Web3(window.ethereum);
      	let contractAddress_painting = '0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A';
      	let abi_painting = JSON.parse(`[
	{
		"inputs": [],
		"name": "approve_market",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeuri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividefinalart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId_first",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId_second",
				"type": "uint256"
			}
		],
		"name": "exchange_color",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalSVG",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "startpaint",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "color_state",
				"type": "uint256"
			}
		],
		"name": "initial_paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "market_",
				"type": "address"
			}
		],
		"name": "marketaddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint_uri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newpainter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpaint_right_",
				"type": "uint256"
			}
		],
		"name": "newpainter_condition",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "x",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "y",
				"type": "uint32"
			}
		],
		"name": "paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "painter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paint_right_",
				"type": "uint256"
			}
		],
		"name": "painter_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "coordinate_",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_blue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_red",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "token_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "token_uri",
				"type": "string"
			}
		],
		"name": "position_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "mes",
				"type": "string"
			}
		],
		"name": "print",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "sellbenefit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newpainter",
				"type": "address"
			}
		],
		"name": "transfer_painter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "votetomintfinal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "bluecolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chang_url",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_final_url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkapprove",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkcontractbalance",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checkCoodinatexy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkdividen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checklength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkmarketopen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checknftdividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkowner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkownerfirst",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkpositiondown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checksvg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checktokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkuri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "checkvote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkvoteresult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "color_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dividen_record",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "exchange_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mintsale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "first_vote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcolor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcoordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initial_painter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "market",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract NFT",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "own_nft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "position_done",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recentdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "redcolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkright",
				"type": "address"
			}
		],
		"name": "right",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subcontract_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "svg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "upload",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url_string",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "visualization",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vote_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`);
		// const chainId = await ethereum.request({ method: 'eth_chainId' });
		// console.log(chainId);
		
      	let contract = new web3.eth.Contract(abi_painting, contractAddress_painting);

	  	var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
		if (this.first_exchange_color.localeCompare(" ") != 0 && this.second_exchange_color.localeCompare(" ") != 0) {
			let result = await contract.methods.checktokenId(this.first_exchange_color).call();
			this.exchange_color_1 = result;	
			result = await contract.methods.checktokenId(this.second_exchange_color).call();
			this.exchange_color_2 = result;
				
			await contract.methods.exchange_color(this.exchange_color_1, this.exchange_color_2).send({from: player_addr});
			
			this.own_colors = [];
			this.own_coordinates = [];
			for (var i = 2; i <= this.tokenid; i++) {
				result = await contract.methods.checkowner(i).call();
				let result_color = await contract.methods.getcolor(i).call();
				let result_coor = await contract.methods.getcoordinate(i).call();
				let mes = result_coor.split('_');			
				if (result_color.substr(2, 1).localeCompare("1") == 0) {
					this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] = (color_convert.get(result_color.substr(1, 4))); // R100 B100
				} else {
					this.colors[(30 - parseInt(mes[1])) * 60 + parseInt(mes[0]) - 1] = (color_convert.get(result_color.substr(1, 3)));
				}
				console.log("colors: ",this.colors);
						
				if (result.toLowerCase().localeCompare(player_addr) == 0) {
					if (result_color.substr(2, 1).localeCompare("1") == 0) {
						this.own_colors.push(color_convert.get(result_color.substr(1, 4))); // R100 B100
					} else {
						this.own_colors.push(color_convert.get(result_color.substr(1, 3)));
					}
					console.log("own_colors: ",this.own_colors);
					result = "(" + mes[0] + "." + mes[1] + ")";
					this.own_coordinates.push(result);
					console.log("own_coordinates: ", this.own_coordinates);	
				}

			}								
		}	


	},

	async transferColor() {
	
		let web3 = new Web3(window.ethereum);
      	let contractAddress_painting = '0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A';
      	let abi_painting = JSON.parse(`[
	{
		"inputs": [],
		"name": "approve_market",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeuri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividefinalart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId_first",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId_second",
				"type": "uint256"
			}
		],
		"name": "exchange_color",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalSVG",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "startpaint",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "color_state",
				"type": "uint256"
			}
		],
		"name": "initial_paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "market_",
				"type": "address"
			}
		],
		"name": "marketaddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint_uri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newpainter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpaint_right_",
				"type": "uint256"
			}
		],
		"name": "newpainter_condition",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "x",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "y",
				"type": "uint32"
			}
		],
		"name": "paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "painter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paint_right_",
				"type": "uint256"
			}
		],
		"name": "painter_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "coordinate_",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_blue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_red",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "token_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "token_uri",
				"type": "string"
			}
		],
		"name": "position_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "mes",
				"type": "string"
			}
		],
		"name": "print",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "sellbenefit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newpainter",
				"type": "address"
			}
		],
		"name": "transfer_painter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "votetomintfinal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "bluecolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chang_url",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_final_url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkapprove",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkcontractbalance",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checkCoodinatexy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkdividen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checklength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkmarketopen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checknftdividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkowner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkownerfirst",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkpositiondown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checksvg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checktokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkuri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "checkvote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkvoteresult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "color_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dividen_record",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "exchange_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mintsale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "first_vote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcolor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcoordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initial_painter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "market",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract NFT",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "own_nft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "position_done",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recentdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "redcolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkright",
				"type": "address"
			}
		],
		"name": "right",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subcontract_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "svg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "upload",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url_string",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "visualization",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vote_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`);

		
      	let contract = new web3.eth.Contract(abi_painting, contractAddress_painting);
		this.friend_addr = document.getElementById('addr').value;
		console.log("addr: ", this.friend_addr);
		var player_addr = await web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
	  	console.log(player_addr);
		await contract.methods.transfer_painter(this.friend_addr).send({from: player_addr});
		this.connectWallet();
	},

	divideForFinal() {
		let web3 = new Web3(window.ethereum);
      let contractAddress_painting = '0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A';
      let abi_painting = JSON.parse(`[
	{
		"inputs": [],
		"name": "approve_market",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeuri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividefinalart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId_first",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId_second",
				"type": "uint256"
			}
		],
		"name": "exchange_color",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalSVG",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "startpaint",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "color_state",
				"type": "uint256"
			}
		],
		"name": "initial_paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "market_",
				"type": "address"
			}
		],
		"name": "marketaddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint_uri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newpainter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpaint_right_",
				"type": "uint256"
			}
		],
		"name": "newpainter_condition",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "x",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "y",
				"type": "uint32"
			}
		],
		"name": "paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "painter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paint_right_",
				"type": "uint256"
			}
		],
		"name": "painter_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "coordinate_",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_blue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_red",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "token_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "token_uri",
				"type": "string"
			}
		],
		"name": "position_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "mes",
				"type": "string"
			}
		],
		"name": "print",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "sellbenefit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newpainter",
				"type": "address"
			}
		],
		"name": "transfer_painter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "votetomintfinal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "bluecolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chang_url",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_final_url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkapprove",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkcontractbalance",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checkCoodinatexy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkdividen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checklength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkmarketopen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checknftdividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkowner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkownerfirst",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkpositiondown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checksvg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checktokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkuri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "checkvote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkvoteresult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "color_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dividen_record",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "exchange_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mintsale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "first_vote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcolor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcoordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initial_painter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "market",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract NFT",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "own_nft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "position_done",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recentdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "redcolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkright",
				"type": "address"
			}
		],
		"name": "right",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subcontract_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "svg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "upload",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url_string",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "visualization",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vote_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`);

		
      let contract = new web3.eth.Contract(abi_painting, contractAddress_painting);
	  var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
		contract.methods.dividefinalart().send({from: player_addr});
	},
	

	async PaintColor() {
	
		let web3 = new Web3(window.ethereum);
		let contractAddress_painting = '0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A';
		let abi_painting = JSON.parse(`[
		{
			"inputs": [],
			"name": "approve_market",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "changeuri_final",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "dividefinalart",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId_first",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "tokenId_second",
					"type": "uint256"
				}
			],
			"name": "exchange_color",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "finalSVG",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "startpaint",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "color_state",
					"type": "uint256"
				}
			],
			"name": "initial_paint",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "market_",
					"type": "address"
				}
			],
			"name": "marketaddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "mint_uri_final",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "newpainter_address",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newpainter_bluecolornow",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newpainter_redcolornow",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newpaint_right_",
					"type": "uint256"
				}
			],
			"name": "newpainter_condition",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint32",
					"name": "x",
					"type": "uint32"
				},
				{
					"internalType": "uint32",
					"name": "y",
					"type": "uint32"
				}
			],
			"name": "paint",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "painter_address",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "bluecolornow",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "redcolornow",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "paint_right_",
					"type": "uint256"
				}
			],
			"name": "painter_condition",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "coordinate_",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "color_blue",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "color_red",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "token_id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "token_uri",
					"type": "string"
				}
			],
			"name": "position_condition",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "mes",
					"type": "string"
				}
			],
			"name": "print",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "sellbenefit",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newpainter",
					"type": "address"
				}
			],
			"name": "transfer_painter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"inputs": [],
			"name": "votetomintfinal",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "checkpainter",
					"type": "address"
				}
			],
			"name": "bluecolor",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "chang_url",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "chech_final_url",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "checkapprove",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checkcontractbalance",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "coordinate",
					"type": "string"
				}
			],
			"name": "checkCoodinatexy",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checkdividen",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checklength",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "checknftdividen",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "checkowner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checkownerfirst",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checkpositiondown",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "coordinate",
					"type": "string"
				}
			],
			"name": "checktokenId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "checkuri",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "checkvote",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "color_map",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "coordinate",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "coordinate_map",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "dividen",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "dividen_num",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "dividen_record",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "exchange_map",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "final_mint",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "final_mintsale",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "first_vote",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "getcolor",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				}
			],
			"name": "getcoordinate",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "initial_painter",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "market",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nft",
			"outputs": [
				{
					"internalType": "contract NFT",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nftowner",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "own_nft",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "own_num",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "position_done",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "price",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "recentdividentime",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "checkpainter",
					"type": "address"
				}
			],
			"name": "redcolor",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "checkright",
					"type": "address"
				}
			],
			"name": "right",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "startdividentime",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "subcontract_address",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "svg",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "tokenId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "upload",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "url_string",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "users",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "visualization",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "vote_num",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "voters",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]`);

			
		let contract = new web3.eth.Contract(abi_painting, contractAddress_painting);
		var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
		await contract.methods.paint(this.col_clicked, 31 - this.row_clicked).send({from: player_addr});
		this.connectWallet();
	},

	async VoteForFinal() {
		let web3 = new Web3(window.ethereum);
		let contractAddress_painting = '0x1CE795F1abA316D51Bb09E10470186c7F52FCe2A';
		let abi_painting = JSON.parse(`[
	{
		"inputs": [],
		"name": "approve_market",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeuri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividefinalart",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId_first",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId_second",
				"type": "uint256"
			}
		],
		"name": "exchange_color",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalSVG",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "startpaint",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "color_state",
				"type": "uint256"
			}
		],
		"name": "initial_paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "market_",
				"type": "address"
			}
		],
		"name": "marketaddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint_uri_final",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newpainter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpainter_redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newpaint_right_",
				"type": "uint256"
			}
		],
		"name": "newpainter_condition",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "x",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "y",
				"type": "uint32"
			}
		],
		"name": "paint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "painter_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bluecolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "redcolornow",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paint_right_",
				"type": "uint256"
			}
		],
		"name": "painter_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "coordinate_",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_blue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "color_red",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "token_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "token_uri",
				"type": "string"
			}
		],
		"name": "position_condition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "mes",
				"type": "string"
			}
		],
		"name": "print",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "sellbenefit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newpainter",
				"type": "address"
			}
		],
		"name": "transfer_painter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "votetomintfinal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "bluecolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chang_url",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "check_final_url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkapprove",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkcontractbalance",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checkCoodinatexy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkdividen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checklength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkmarketopen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checknftdividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkowner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkownerfirst",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkpositiondown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checksvg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "coordinate",
				"type": "string"
			}
		],
		"name": "checktokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "checkuri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "checkvote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkvoteresult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "color_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "coordinate_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividen_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dividen_record",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "exchange_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "final_mintsale",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "first_vote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcolor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getcoordinate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initial_painter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "market",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract NFT",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "own_nft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "position_done",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recentdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkpainter",
				"type": "address"
			}
		],
		"name": "redcolor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "checkright",
				"type": "address"
			}
		],
		"name": "right",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startdividentime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subcontract_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "svg",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "upload",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url_string",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "visualization",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "vote_num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`);
			
		let contract = new web3.eth.Contract(abi_painting, contractAddress_painting);

		var player_addr = web3.currentProvider.selectedAddress; //目前网页链接的钱包地址，返回的是string
		// await contract.methods.votetomintfinal().send({from: player_addr});
		// await contract.methods.finalSVG().send({from: player_addr});
		// await contract.methods.mint_uri_final().send({from: player_addr});
		await contract.methods.approve_market().send({from: player_addr});
		let result = await contract.methods.checkowner(1).call();
		console.log("111:",result);
	},	

	chooseExchangeColor(event) {
		let buttonText = event.target.innerText;
		console.log("buttonText: ", buttonText);
		if (this.first_exchange == 0 && this.second_exchange_color != buttonText) {
			this.first_exchange_color = buttonText;
			if (this.second_exchange_color.localeCompare(" ") == 0) {
				this.first_exchange = 1;
			} else {
				this.first_exchange = 2;
			}
		} else if (this.first_exchange == 1 && this.first_exchange_color != buttonText) {
			this.second_exchange_color = buttonText;
			this.first_exchange = 2;
		}
	},

	throwAwayColor1() {
		this.first_exchange_color = " ";
		this.first_exchange = 0;
	},

	throwAwayColor2() {
		this.second_exchange_color = " ";
		if (this.first_exchange_color.localeCompare(" ") == 0) {
			this.first_exchange = 0;
		} else {
			this.first_exchange = 1;
		}
		
	}

  }
  
}
</script>
<style>
.author {
	border-radius: 25px;
	position: absolute;
  left:5%;
  top:400%;
  text-align:center;
  width: 1500px;
  height: 414px;
  background-color: #434343;	
  display: flex;
  justify-content:center;
  overflow-x:auto;
}
.container_author{
   width :25%;
   text-align:center;
}
.author img{
   width :80px;
   height :80px;
   border-radius :50%;
}


.lowkeyButton {
	background-color: transparent;
	font-family: Arial;
	font-size: 21px;
	font-weight: normal;
	color: #FFFFFF;	
}
.BigRedButton {
	background-color: #FB7575;
	border-radius: 50px;
	left: 960.5px;

	width: 370px;
	height: 92px;
	font-family: Arial;
	font-size: 34px;
	font-weight: normal;
	color: #FFFFFF;
	box-shadow: 3px 5px 5px rgba(0,0,0,1);
}

.greenButtons {
	border-radius: 25px;
	background-color: #48BA6D;
	font-family: Arial;
	font-size: 18px;
	font-weight: normal;
	color: #FFFFFF;
}

.greyButtons {
	border-radius: 25px;
	background-color: #979797;
	font-family: Arial;
	font-size: 18px;
	font-weight: normal;
	color: #FFFFFF;
}

.vote_btn {
	position: absolute;
	left:60px;
	margin-top:642px;		
}

.min_final {
	background-color: #E3E3E3;
	border-color: #9D9D9D;
	border-width: 3px;
	border-style: solid;
	position: absolute;
	left:55.5px;
	margin-top:576px;
	width: 100px;
	height: 41px;	
	display: flex;
	justify-content: center;
	align-items: center; 
	text-align: center;	
	font-family: Arial;
	font-size: 16px;
	font-weight: normal;
	color: #595959;
}
.paint {
	position: absolute;
	left:60px;
	top:482px;	
}
.color3 {
	background-color: #E3E3E3;
	border-color: #9D9D9D;
	border-radius: 10px;
	border-width: 3px;
	border-style: solid;
	height: 32px;
	width: 100px;
	position: absolute;
	left: 55.5px;
	top:416px;
	font-family: Arial;
	font-size: 16px;
	font-weight: normal;
	color: #000000;			
}

.axis {
  position: absolute;
	top:600px;
}

.axis span {
  display: inline-block;
  width: 20px;
}

.x-axis {
  bottom: 0px;
  left: 0px; /* 调整横轴的左边距 */
  
}

.y-axis {
  top: 288px;
  right: -310px;
  transform: rotate(-90deg);
}

.transfer {
	position: absolute;
	left:60px;
	top:319px;	
}
.address {
	background-color: #E3E3E3; 
	border-radius: 10px;
	border-color: #9D9D9D;
	border-width: 3px;
	border-style: solid;	
	position: absolute;
	left:55.5px;
	top:253px;	
}
.exchange1 {
	position: absolute;
	left:60px;
	top:153px;	
}
.color1 {
	border-radius: 10px;
	position: absolute;
	left:55.5px;
	top:87px;	
}
.color2 {
	border-radius: 10px;
	position: absolute;
	left:211.5px;
	top:87px;	
}
.divide_btn {
	position: absolute;
	left:680px;
	top:186px;	
}

.exchange_sign {
	position: absolute;
	left:159px;
	top:92px;	
}

.paint_mes_0 {
	display: block;
  	margin-left: auto;
  	margin-right: auto;
	  margin-top: 145px;
	
}



.paint_mes_2 {
	position: absolute;
	left:35%;
	top:65%;
	line-height:50px;
	
}
.paint_mes_3 {
	display: block;
  	margin-left: auto;
  	margin-right: auto;
	  margin-top: 145px;
	
}
#pixel_to_paint::placeholder{
	color:#FFFFFF
}	

#addr::placeholder{
	font-size: 16px;
	color: #6E6E6E;
}
.account_title {
	display: block;
  margin-left: auto;
  margin-right: auto;
	/* position: absolute; */
	/* left:42%; */
	margin-top: 22px;	
}

.container2 {
	position: relative;
  left: 50%;
  top:28px;
}

.color_cube {
	position:absolute;
	top:0px;
	transform: translateX(-50%);		
}
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}


.stage {
	position: absolute;
  left:-1%;
  top:320%;
  text-align:center;
}
.howText {
	position: absolute;
  left:34.7%;
  top:280.2%;
  text-align:center;
  width: 1000px;
  height: 275px;
  background-color: #575958;		
}
.andText {
	position: absolute;
  left:34.7%;
  top:250.1%;
  text-align:center;
  width: 1000px;
  height: 275px;
  background-color: #575958;	
}

.whatText {
	position: absolute;
  left:34.7%;
  top:220%;
  text-align:center;
  width: 1000px;
  height: 275px;
  background-color: #575958;
}
.what {
  position: absolute;
  left:5%;
  top:220%;
  text-align:center;
  width: 501px;
  height: 275px;
  background-color: #3A3A3A;
}

.And {
	position: absolute;
  left:5%;
  top:250.1%;
  text-align:center;
  width: 501px;
  height: 275px;
  background-color: #3A3A3A;	
}

.how {
  position: absolute;
  left:5%;
  top:280.2%;
  text-align:center;
  width: 501px;
  height: 275px;
  background-color: #3A3A3A;
}

.shade {
  position: absolute;
  left:0%;
  top:100%;
  text-align:center;
  width: 1690px;
  height: 900px;
  background: rgba(0,0,0,0.6);
}

.link {
  position: absolute;
  left:65%;
  top:0%;
  text-align:center;
}

.title {
  position: absolute;
  left:0%;
  top:20%;
  text-align:center;	
}

.background {
  position: absolute;
  left:0%;
  top:30%;
}

.connect {
  margin:50px auto;
  text-align:center;
  position: absolute;
  top:540px;
left:50%;
transform: translate(-50%,-50%);
}

.pixelPick {
	background-color: #FFFFFF;
	border-color: #71FFA0;
	border-width: 10px;
	border-style: solid;
	border-radius: 50px;
	height: 280px;
	width: 940px;
	position: absolute;
	top: 77%;
	left: 50%;
	transform: translate(-50%,-50%);
}

.slogen {
  position: absolute;
  left:25%;
  top:70%;
  text-align:center;	
}

.firstPage {
  position: absolute;
  left:0%;
  top:0%;
  text-align:center;	
}

.lock {
  position: absolute;
  left:40%;
  top:140%;
  text-align:center;

}
.pixelOption {
	background-color: #000000;

	border-style: solid;
	border-radius: 20px;
	height: 773px;
	width: 430px;
	margin:50px auto;
  text-align:center;
  position: absolute;
  top:150%;
left:87%;
transform: translate(-50%,-50%);
}

.canvas {
  position: absolute;
  left:1%;
  top:120%;
  text-align:center;

}

.App {
  background: linear-gradient(217deg, rgba(209, 230, 248, 1), rgba(255,0,0,0) 60%),
            linear-gradient(127deg, rgba(241, 248, 254, 1), rgba(0,255,0,0) 60%),
            linear-gradient(336deg, rgba(202, 195, 223, 1), rgba(0,0,255,0) 60%);

  }

.Board {
  padding: 10px;
  margin: 0;
}

.card {
  width: 90%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  padding: 40px;
  border: none;
  box-shadow: 6px 8px 10px 2px rgba(0,0,0,.2);
  border-radius: 16px;
  background-color: rgba(255,255,255,.8);
  
}

.title-btn {
  float: right;
  background-color: #5F5AF1;
  border-radius: 20px;
  font-weight: bold;
}
.title-row {
  margin: 30px 60px 10px 60px;
}

h1 {
  font-size: 28px;
  width: 300px;
}
.can-col {
  padding: 0;
  width: 28px;
  height: 28px
}

.can-row {
  /* height: 26px; */
  /* width: 630px; */
  /* background-color: black; */
  display: flex;
  width: 100%;
  max-width: 60%;
  margin: 0 auto;
  justify-content: center;
}

.can-col > .btn {
  margin: 0;
  border-radius: 0;
  background-color: white;
  border: grey solid 0.5px;
  width: 28px;
  height: 28px
}

.palette-group {
  border: none;
  border-radius: 10;
  width: 36px;
  height: 32px;
  margin: 5px;
}

.palette-div {
  width: 36px;
  margin-left: auto; 
  margin-right: 0;
}
.palette-col {
  width: 60px;
  margin-top: 60px;
  padding: 60px;
}

/* .button {
        position: absolute;
        left: 38%;
        top: 60%;
        text-align: center;
        font-size: 3.75rem;
        --font-display: baloo, var(--font-body);
        font-weight: bold;
        color: hsl(67, 82%, 2%);;
        background-color:hsl(204, 83%, 48%);;
      } */
      .button::-moz-focus-inner{
  border: 0;
  padding: 0;
}

.button{
  
  display: inline-block;
  *display: inline;
  zoom: 1.7;
  padding: 6px 20px;
  margin: 0;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  font: bold 13px arial, helvetica, sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #555;
  
  border-radius: 25px;
  background-color: #ddd;
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  
  -webkit-transition: background-color .2s ease-out;
  -moz-transition: background-color .2s ease-out;
  -ms-transition: background-color .2s ease-out;
  -o-transition: background-color .2s ease-out;
  transition: background-color .2s ease-out;
  background-clip: padding-box; /* Fix bleeding */
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  text-shadow: 0 1px 0 rgba(255,255,255, .9);
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button:hover{
  background-color: #eee;
  color: #555;
}

.button:active{
  background: #e9e9e9;
  position: relative;
  top: 1px;
  text-shadow: none;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}

.button[disabled], .button[disabled]:hover, .button[disabled]:active{
	border-radius: 25px;
  border-color: #eaeaea;
  background: #fafafa;
  cursor: default;
  position: static;
  color: #999;
  /* Usually, !important should be avoided but here it's really needed :) */
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

/* Smaller buttons styles */

.button.small{
  padding: 4px 12px;
}

/* Larger buttons styles */

.button.large{
  padding: 12px 30px;
  text-transform: uppercase;
}

.button.large:active{
  top: 2px;
}

/* Colored buttons styles */

.button.green, .button.red, .button.blue {
	border-radius: 25px;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0,0,0,.2);
  
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
}

/* */

.button.green{
  background-color: #57a957;
  border-color: #57a957;
}

.button.green:hover{
  background-color: #62c462;
}

.button.green:active{
  background: #57a957;
}

/* */

.button.red{
  background-color: #ca3535;
  border-color: #c43c35;
}

.button.red:hover{
  background-color: #ee5f5b;
}

.button.red:active{
  background: #c43c35;
}

/* */

.button.blue{
  background-color: #269CE9;
  border-color: #269CE9;
}

.button.blue:hover{
  background-color: #70B9E8;
}

.button.blue:active{
  background: #269CE9;
}

/* */

.green[disabled], .green[disabled]:hover, .green[disabled]:active{
  border-color: #57A957;
  background: #57A957;
  color: #D2FFD2;
}

.red[disabled], .red[disabled]:hover, .red[disabled]:active{
  border-color: #C43C35;
  background: #C43C35;
  color: #FFD3D3;
}

.blue[disabled], .blue[disabled]:hover, .blue[disabled]:active{
  border-color: #269CE9;
  background: #269CE9;
  color: #93D5FF;
}

/* Group buttons */

.button-group,
.button-group li{
  display: inline-block;
  *display: inline;
  zoom: 1;
}

.button-group{
  font-size: 0; /* Inline block elements gap - fix */
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: 7px;
  -moz-border-radius: 7px;
  -webkit-border-radius: 7px;
  border-radius: 7px;
}

.button-group li{
  margin-right: -1px; /* Overlap each right button border */
}

.button-group .button{
  font-size: 13px; /* Set the font size, different from inherited 0 */
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
}

.button-group .button:active{
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
}

.button-group li:first-child .button{
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;
}

.button-group li:first-child .button:active{
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, -5px 0 5px -3px rgba(0, 0, 0, .2) inset;
}

.button-group li:last-child .button{
  -moz-border-radius: 0 3px 3px 0;
  -webkit-border-radius: 0 3px 3px 0;
  border-radius: 0 3px 3px 0;
}

.button-group li:last-child .button:active{
  -moz-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;
  box-shadow: 0 0 1px rgba(0, 0, 0, .2) inset, 5px 0 5px -3px rgba(0, 0, 0, .2) inset;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

  
  .container {
    min-height: inherit;
  }
  
  .container,
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  
  h1 {
    margin: 0;
    text-shadow: 0 3px 0 rgba(163, 112, 112, 0.75);
    text-align: center;
    line-height: 0.5;
  }
  
  h1 span {
    display: block;
    font-size: 4.5rem;
    line-height: 1;
    text-transform: uppercase;
    text-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.5), 0 5px 0
        rgba(0, 0, 0, 0.75);
  }
  
  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
    font-family: var(--font-display);
    font-size: 1.125rem;
    line-height: 1;
  }
  
  nav ul a:hover {
    text-decoration-style: wavy;
    text-decoration-thickness: 1px;
  }
  
  @media print, (min-width: 640px) {
    h1 span {
      font-size: 6rem;
    }
  
    nav ul {
      font-size: 1.25rem;
      gap: 1.5rem;
    }
  }
  
  @media screen and (min-width: 1024px) {
    h1 span {
      font-size: 8rem;
    }
  }
</style>
