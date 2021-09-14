<template>
  <div class="container">
    <img alt="Stairway logo" src="../assets/logo.png">
    <div id="nav">
      <router-link to="/">Diárias</router-link>
      <router-link to="/annual">Anuais</router-link>
    </div>
  </div>
</template>

<style>
div.container{
  height: 50px;
}

img {
  width: 12%;
  float: left;
}

#nav {
  padding: 20px 13%;
}

#nav a {
  display: inline-flex;
  float: left;
  font-size: 1.1em;
  color: #3b2323;
  padding: 0 15px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  text-decoration-line: underline;
  text-decoration-color: #F05226;
  text-decoration-thickness: 15%;
}
</style>
