<template>
    <div class="shop">
		<div class="points">
			<button class="blue button"><router-link to="/profile">My profile!</router-link></button>
		</div>
      <h2>Holy Relic NFT</h2>
      <h3>Congratulations! You win this game with more than 30 points and at least 1 
        Holy Relic Card, therefore you have the ability to by Holy Relic NFT! 
      </h3>
    </div>
    <div class="accountBalanceGems">
		<h3>Gem: {{this.gem}}</h3>
	</div>
  <!-- <div class="points">
    <h3>Points: {{this.points}}</h3>
  </div> -->
  <div  class="card">

    
  </div>
  <div class="price"><h3>Price: 100 Gems</h3></div>
  <div class="decision">
    <button class="large blue button" v-if="(!isBuy)" @click="buy">Buy it!</button>
    <button class="large blue button"><router-link to="/">No Thanks!</router-link></button>
    <!-- <button class="blue button" v-if="(!finish && isBegin)" @click="leave">Leave!</button>
    <p><button class="blue button" v-if="(!finish && isBegin)" @click="reveal">Reveal!</button></p> -->
  </div>
  </template>

<script>
import Web3 from 'web3'

// methods:{
//     handSend(){
//         this.$bus.$emit('自定义事件名','要发生的数据');
//     }
// }

export default {
  name: 'Home',

  data() {
    return {
      // registerTime: 0,
      revealResult: 2,
      isBuy: false,
      finish: false,
      points: 0,
      gem: 110,
      // connected: false,
      hashResult: 0,
      round: 0,
      turn: 0,
      card: 0,
      cardText: 'Wait For Revealing...',
	  player_address:"0"
    }
  },

  methods: {
    buy: function () {
      // method for calling the contract method
      this.isBuy = true;
	  this.gem -= 100;
      this.revealResult = 0;
      // console.log(this.revealResult);
      let web3 = new Web3(window.ethereum);
      let contractAddress = '0x98fe9D74E4241Cc9fC4090E17AB012aFfD44eD31';
      let abi = JSON.parse(`[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "appove",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_commit",
				"type": "uint256"
			}
		],
		"name": "commit",
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
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "exchange",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameBegin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "player",
				"type": "address[]"
			}
		],
		"name": "gameBegins",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "winner",
				"type": "address[]"
			}
		],
		"name": "gameOverEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "hash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			}
		],
		"name": "newRound",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "cardEvent",
				"type": "uint256"
			}
		],
		"name": "pickCard",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "playerRegistered",
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
		"name": "printMessage",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_reveal",
				"type": "uint256"
			}
		],
		"name": "reveal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allow",
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
		"name": "cardsOnField",
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
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "checkDe",
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
		"name": "checkWallet",
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
				"name": "players",
				"type": "address"
			}
		],
		"name": "getAbilityToBuyNFT",
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
		"name": "getCardPicked",
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
		"name": "getGameStatus",
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
		"name": "getPlayerNumber",
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
				"name": "players",
				"type": "address"
			}
		],
		"name": "getPoint",
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
		"name": "getRound",
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
		"name": "getTurn",
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
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
		"name": "player",
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
		"name": "reward",
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
		"name": "symbol",
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
		"name": "winner",
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

      let contract = new web3.eth.Contract(abi, contractAddress);
      this.player_address = web3.currentProvider.selectedAddress //目前网页链接的钱包地址，返回的是string      
      contract.methods.register().send(); 
	//   console.log(this.player_address);
    //   contract.events.pickCard(() => {}).on("connected", () =>{
	// 	let cardT = 'Wait For Revealing...';
    //     console.log(this.player_address)
    //     contract.methods.getPoint(this.player_address).call({from: this.player_address}).then(result => {this.points = result;});
    //     contract.methods.getTurn().call().then(result => {this.turn = result;});
    //     contract.methods.getRound().call().then(result => {this.round = result;});
    //     contract.methods.getCardPicked().call().then(result => {
	// 		this.card = result;
	// 		console.log('result' + result);
	// 		console.log(typeof(this.card));
	// 		this.card = parseInt(this.card);
	// 		if (this.card < 100) {
    //       this.cardText = 'Gem Card: ' + this.card;

    //     } else if (this.card < 999) {
    //       switch (this.card) {
    //         case 100:
    //           this.cardText = 'Zombies Attack!';
    //           break;
    //         case 200:
    //           this.cardText = 'Snake Attack!';
	// 		  console.log(this.cardText);
    //           break;
    //         case 300:
    //           this.cardText = 'Cave Collapse!';
    //           break;
    //         case 400:
    //           this.cardText = 'Magmatic Exhalation!';
    //           break;
    //         case 500:
    //           this.cardText = 'Get Lost!';
    //           break;
    //       }
    //     } else {
    //       switch (this.card) {
    //         case 1000:
    //           this.cardText = 'Holy Craft Worth 5 points!';
    //           break;
    //         case 1001:
    //           this.cardText = 'Holy Craft Worth 7 points!';
    //           break;
    //         case 1002:
    //           this.cardText = 'Holy Craft Worth 8 points!';
    //           break;
    //         case 1003:
    //           this.cardText = 'Holy Craft Worth 10 points!';
    //           break;     
    //         case 1004:
    //           this.cardText = 'Holy Craft Worth 12 points!';
    //           break;                                 
    //       }
    //     }
	// 	cardT = this.cardText;
	// 	console.log(this.cardText);
	// 	console.log(cardT);
	// 	});
	// 	this.cardText = cardT;
		

    //     console.log('分数是' + this.points);
    //   })
	window.alert('Buy NFT Successfully!');
// 	      contract.getPastEvents(
//   'AllEvents', // 过滤事件参数，这里获取全部事件
//   {
//     fromBlock: 0, // 起始块
//     toBlock: 'latest' // 终止块
//   },
//   (err, events) => { console.log(events) } // 回调函数
// )
    },

    // connect: function () {
    //   let ethereum = window.ethereum;
    //   if (ethereum) {
    //   ethereum.request({ method: 'eth_requestAccounts' })
    //    .then(() => {
    //         this.connected = true;
    //       });
    //   }
    // },
    // handSend(){
    //     this.$bus.$emit('Event','data');
    // },
    notBuy: function () {
        // method for calling the contract method
//       this.revealResult = 0;
//       // console.log(this.revealResult);
//       let web3 = new Web3(window.ethereum);
//       let contractAddress = '0xb517d17f12507492db9aaa7a51c468f1ca43cb1e';
//       let abi = JSON.parse(`[
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "_amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "appove",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_commit",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "commit",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "exchange",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "gameBegin",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address[]",
// 				"name": "player",
// 				"type": "address[]"
// 			}
// 		],
// 		"name": "gameBegins",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address[]",
// 				"name": "winner",
// 				"type": "address[]"
// 			}
// 		],
// 		"name": "gameOverEvent",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_num",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "hash",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "round",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "newRound",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "cardEvent",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "pickCard",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "address",
// 				"name": "player",
// 				"type": "address"
// 			}
// 		],
// 		"name": "playerRegistered",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "string",
// 				"name": "mes",
// 				"type": "string"
// 			}
// 		],
// 		"name": "printMessage",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "register",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_reveal",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "reveal",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "_spender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "allow",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "cardsOnField",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_num",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "checkDe",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "checkWallet",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "players",
// 				"type": "address"
// 			}
// 		],
// 		"name": "getAbilityToBuyNFT",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getCardPicked",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getGameStatus",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getPlayerNumber",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "players",
// 				"type": "address"
// 			}
// 		],
// 		"name": "getPoint",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getRound",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getTurn",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getWinner",
// 		"outputs": [
// 			{
// 				"internalType": "address[]",
// 				"name": "",
// 				"type": "address[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "player",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "reward",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "winner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]`);

//       let contract = new web3.eth.Contract(abi, contractAddress);


//       var player_addr = web3.currentProvider.selectedAddress //目前网页链接的钱包地址，返回的是string
//       contract.methods.hash(0).call().then(result=> {
//         contract.methods.commit(result).send({from: player_addr}); 
//       });
      
      

      // contract.events.playerRegistered(() => {}).on("connected", function(playerAddress){
      //   this.registerTime = this.registerTime + 1;
      //   console.log(playerAddress);
      // })

      // contract.events.printMessage(() => {}).on("connected", function(playerAddress){
      //   this.registerTime = this.registerTime + 1;
      //   console.log(playerAddress);
      // })

  //   contract.getPastEvents(
  // 'AllEvents', // 过滤事件参数，这里获取全部事件
  // {
  //   fromBlock: 0, // 起始块
  //   toBlock: 'latest' // 终止块
  // },
  // (err, events) => { console.log(events) } // 回调函数
// )

    },
    leave: function () {
      this.revealResult = 1;
      let web3 = new Web3(window.ethereum);
      let contractAddress = '0x0B4a0ce14E4efe231d4CbC61c3c7f1adcC4a29c0';
      let abi = JSON.parse(`[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "appove",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_commit",
				"type": "uint256"
			}
		],
		"name": "commit",
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
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "exchange",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameBegin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "player",
				"type": "address[]"
			}
		],
		"name": "gameBegins",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "winner",
				"type": "address[]"
			}
		],
		"name": "gameOverEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "hash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			}
		],
		"name": "newRound",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "cardEvent",
				"type": "uint256"
			}
		],
		"name": "pickCard",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "playerRegistered",
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
		"name": "printMessage",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_reveal",
				"type": "uint256"
			}
		],
		"name": "reveal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allow",
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
		"name": "cardsOnField",
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
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "checkDe",
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
		"name": "checkWallet",
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
				"name": "players",
				"type": "address"
			}
		],
		"name": "getAbilityToBuyNFT",
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
		"name": "getCardPicked",
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
		"name": "getGameStatus",
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
		"name": "getPlayerNumber",
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
				"name": "players",
				"type": "address"
			}
		],
		"name": "getPoint",
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
		"name": "getRound",
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
		"name": "getTurn",
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
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
		"name": "player",
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
		"name": "reward",
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
		"name": "symbol",
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
		"name": "winner",
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

      let contract = new web3.eth.Contract(abi, contractAddress);


      var player_addr = web3.currentProvider.selectedAddress //目前网页链接的钱包地址，返回的是string
      contract.methods.hash(1).call().then(result=> {
		console.log(result);
        contract.methods.commit(result).send({from: player_addr}); 
      });

      // contract.events.playerRegistered(() => {}).on("connected", function(playerAddress){
      //   this.registerTime = this.registerTime + 1;
      //   console.log(playerAddress);
      // })

      // contract.events.printMessage(() => {}).on("connected", function(playerAddress){
      //   this.registerTime = this.registerTime + 1;
      //   console.log(playerAddress);
      // })

    contract.getPastEvents(
  'AllEvents', // 过滤事件参数，这里获取全部事件
  {
    fromBlock: 0, // 起始块
    toBlock: 'latest' // 终止块
  },
  (err, events) => { console.log(events) } // 回调函数
)

    },
    reveal: function () {
        // method for calling the contract method
        console.log(this.revealResult);
      // console.log(this.revealResult);
      let web3 = new Web3(window.ethereum);
      let contractAddress = '0xb517d17f12507492db9aaa7a51c468f1ca43cb1e';
      let abi = JSON.parse(`[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "appove",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_commit",
				"type": "uint256"
			}
		],
		"name": "commit",
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
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "exchange",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gameBegin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "player",
				"type": "address[]"
			}
		],
		"name": "gameBegins",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "winner",
				"type": "address[]"
			}
		],
		"name": "gameOverEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "hash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			}
		],
		"name": "newRound",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "cardEvent",
				"type": "uint256"
			}
		],
		"name": "pickCard",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "playerRegistered",
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
		"name": "printMessage",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_reveal",
				"type": "uint256"
			}
		],
		"name": "reveal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allow",
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
		"name": "cardsOnField",
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
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "checkDe",
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
		"name": "checkWallet",
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
				"name": "players",
				"type": "address"
			}
		],
		"name": "getAbilityToBuyNFT",
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
		"name": "getCardPicked",
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
		"name": "getGameStatus",
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
		"name": "getPlayerNumber",
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
				"name": "players",
				"type": "address"
			}
		],
		"name": "getPoint",
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
		"name": "getRound",
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
		"name": "getTurn",
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
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
		"name": "player",
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
		"name": "reward",
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
		"name": "symbol",
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
		"name": "winner",
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

      let contract = new web3.eth.Contract(abi, contractAddress);


      var player_addr = web3.currentProvider.selectedAddress //目前网页链接的钱包地址，返回的是string

      contract.methods.reveal(this.revealResult).send({from: player_addr});
      

      
      

      contract.events.pickCard(() => {}).on("connected", () =>{
		let cardT = 'Wait For Revealing...';
        console.log(this.player_address)
        contract.methods.getPoint(this.player_address).call({from: this.player_address}).then(result => {this.points = result;});
        contract.methods.getTurn().call().then(result => {this.turn = result;});
        contract.methods.getRound().call().then(result => {this.round = result;});
        contract.methods.getCardPicked().call().then(result => {
			this.card = result;
			console.log('result' + result);
			console.log(typeof(this.card));
			this.card = parseInt(this.card);
			if (this.card < 100) {
          this.cardText = 'Gem Card: ' + this.card;

        } else if (this.card < 999) {
          switch (this.card) {
            case 100:
              this.cardText = 'Zombies Attack!';
              break;
            case 200:
              this.cardText = 'Snake Attack!';
			  console.log(this.cardText);
              break;
            case 300:
              this.cardText = 'Cave Collapse!';
              break;
            case 400:
              this.cardText = 'Magmatic Exhalation!';
              break;
            case 500:
              this.cardText = 'Get Lost!';
              break;
          }
        } else {
          switch (this.card) {
            case 1000:
              this.cardText = 'Holy Craft Worth 5 points!';
              break;
            case 1001:
              this.cardText = 'Holy Craft Worth 7 points!';
              break;
            case 1002:
              this.cardText = 'Holy Craft Worth 8 points!';
              break;
            case 1003:
              this.cardText = 'Holy Craft Worth 10 points!';
              break;     
            case 1004:
              this.cardText = 'Holy Craft Worth 12 points!';
              break;                                 
          }
        }
		cardT = this.cardText;
		console.log(this.cardText);
		console.log(cardT);
		});
		this.cardText = cardT;
		

        console.log('分数是' + this.points);
      })

	  contract.events.gameOverEvent(() => {}).on("connected", subscriptionId =>{
		this.finish = true;
	  });

      // contract.events.printMessage(() => {}).on("connected", function(playerAddress){
      //   this.registerTime = this.registerTime + 1;
      //   console.log(playerAddress);
      // })

  //   contract.getPastEvents(
  // 'AllEvents', // 过滤事件参数，这里获取全部事件
  // {
  //   fromBlock: 0, // 起始块
  //   toBlock: 'latest' // 终止块
  // },
  // (err, events) => { console.log(events) } // 回调函数
// )

    },
  }
}
</script>
<style>

.price {
  position: absolute;
  left:43%;
  top:70%;
  animation:cardShowUp 1s;
  animation-fill-mode: forwards; 
}
.points {
  position: absolute;
  left:5%;
  top:3%;
  text-align:center;
}
.decision {
  position: absolute;
  top:85%;
  left:50%;
  transform: translate(-50%,-50%);
}
.card {
  width:100px;
  height: 150px;
  background-color: #70B9E8;
  position: absolute;
  left:36%;
  top:28%;
  animation:cardShowUp 1s;
  animation-fill-mode: forwards;
}
@keyframes cardShowUp {
  from{
transform: scale(0.3);  /*开始为原始大小*/
} to {transform: scale(0.8);}
}
.accountBalanceGems {
	position: absolute;
  left:90%;
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