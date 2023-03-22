<template>
    <div class="about">
      
      <h1>
            My Holy Relic NFT
          </h1>
      <div class="credit">

      <h3>
        <p><button class="large blue button"><router-link to="/">Return</router-link></button></p>
      </h3>
    </div>
    <div  class="card">

        <h4><p>URI:http://k51qzi5uqu5dihy0dyuf2u7t2yexixfcy9ulwqxm8r7hj4flm51hixdob46msk.ipns.localhost:8080/</p>
        <p>CID:QmRWyWz1Pekv4rYPitgRDMtypky3h3BwH1R8Hq4XNcRJEz</p></h4>
    
</div>
<div class="info">    </div>
    </div>
  </template>
  <script>
  </script>
  <style>

  .info {
    position: absolute;
    top:40%;
  left:25%;
  }
  .card {
    width:100px;
  height: 150px;
  background-color: #70B9E8;
  position: absolute;
  left:6%;
  top:28%;
  animation:cardShowUp 1s;
  animation-fill-mode: forwards;
  }

  @keyframes cardShowUp {
  from{
transform: scale(0.3);  /*开始为原始大小*/
} to {transform: scale(0.8);}
}
  .credit {
      position: absolute;
    top:80%;
  left:45%;
  
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