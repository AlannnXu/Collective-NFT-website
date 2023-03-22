<template>
  <div>
  <RouterView></RouterView>
  </div>
</template>


<style>
h1 {
    font-size: 7rem;
    line-height: 1;
    position:relative;
    color: hsla(65, 66%, 76%, 0.457);
    top: 15%;
    width: 100%;
    text-align: center;

    font: bold arial, helvetica, sans-serif;
  }
  
  h2 {
    font-size: 2.5rem;
    line-height: 2.25rem;
    color: hsl(65, 74%, 49%);
    
  }
  
  h3 {
    /* background: hsla(112, 95%, 83%, 0.217); */
    font-size: 2rem;
    line-height: 3rem;
    color: hsl(185, 56%, 56%);
    font: bold arial, helvetica, sans-serif;
  }
  
  h4 {
    font-size: 1.5rem;
    line-height: 1.75rem;
    color: hsl(0, 0%, 0%);
  }
  
  h5 {
    font-size: 1.5rem;
    line-height: 1.75rem;
    color: hsl(0, 0%, 100%);
  }
  h6 {
    font-size: 1rem;
    line-height: 1.75rem;
    color: hsl(0, 0%, 100%);    
  }
  h7 {
    font-size: 2rem;
    line-height: 1.75rem;
    color: hsl(0, 0%, 0%);
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
